package com.backend.project.controller;

import com.backend.project.model.Media;
import com.backend.project.model.Review;
import com.backend.project.repository.MediaRepository;
import com.backend.project.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spark.Route;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins = "http://127.0.0.1:8081")
@RestController
@RequestMapping("/api")
public class RegularUpdateController {

  @Autowired
  MediaRepository mediaRepository;
  @Autowired
  ReviewRepository reviewRepository;
  @PostMapping("/update/finalRate/{media}")
  public ResponseEntity<Double> updateMediaFinalRate(@PathVariable("media") Integer media_id) {
    Optional<Media> mediaData = mediaRepository.findById(media_id);
    if (mediaData.isPresent()) {
      Media media = mediaData.get();
      double[] compute_result = finalRateComputer(media);
      media.setFinalVoteCount((int) compute_result[1]);
      media.setFinalRate(compute_result[0]);
      Media _media = mediaRepository.save(media);
      return new  ResponseEntity<>(compute_result[0], HttpStatus.CREATED);
    }
    else {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/rate/average")
  public Double getAverageRate() {
    return mediaRepository.findRateAverage();
  }

  @PostMapping("/voteCount/average")
  public Double getVoteCountAverage() {
    return mediaRepository.findVoteCountAverage();
  }

//  @GetMapping("/voteCount/median")
//  public Double getMedianVoteCount() {
//    return reviewRepository.findMedian();
//  }

  public double[] finalRateComputer(Media media) {
    // weights of different types of users
    final double WEIGHT_GENERAL_USER = 1.0;
    final double WEIGHT_PRO_USER = 5.0;
    final double WEIGHT_INIT_RATE = 10.0;

    // Record the Initial values
    double init_rate = media.getRate();
    List<Review> reviews_pro = reviewRepository.getReviewsByMidAndUidType(media,1);
    List<Review> reviews_general = reviewRepository.getReviewsByMidAndUidType(media,0);
    int init_vote_count = media.getVoteCount();
    int general_vote_count = reviews_general.size();
    int pro_vote_count = reviews_pro.size();

    int ili_vote_count = general_vote_count + pro_vote_count;
    int total_vote_count = ili_vote_count + init_vote_count;
    double weight_sum = WEIGHT_INIT_RATE + WEIGHT_PRO_USER * pro_vote_count + WEIGHT_GENERAL_USER * general_vote_count;

    // Compute base rate
    double base_rate = init_rate * WEIGHT_INIT_RATE / weight_sum;
    for (Review review:reviews_general) {
      base_rate += review.getRate() * WEIGHT_GENERAL_USER / weight_sum;
    }
    for (Review review:reviews_pro) {
      base_rate += review.getRate() * WEIGHT_PRO_USER / weight_sum;
    }

    final double CONSTANT_A = mediaRepository.findVoteCountAverage(); //A value shows how many media whose vote_count is bigger than n(has not decided, IMDB is 25000). Here is the average of vote_count
    final double CONSTANT_X = mediaRepository.findRateAverage(); //A value shows the average value of the media (same as above, IMDB is 7.0)

    //Compute final rate
    double final_rate = (base_rate * total_vote_count + CONSTANT_X * CONSTANT_A) / (total_vote_count + CONSTANT_A);
    return new double[]{final_rate, total_vote_count};
  }
}
