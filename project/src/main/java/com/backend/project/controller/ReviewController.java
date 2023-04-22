package com.backend.project.controller;


import com.backend.project.model.Media;
import com.backend.project.model.Review;
import com.backend.project.model.User;
import com.backend.project.repository.MediaRepository;
import com.backend.project.repository.ReviewRepository;
import com.backend.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "${FRONTEND_URL}")
@RestController
@RequestMapping("/api")
public class ReviewController {
  @Autowired
  ReviewRepository reviewRepository;
  @Autowired
  MediaRepository mediaRepository;
  @Autowired
  UserRepository userRepository;
  @PostMapping("/review/{media}")
  public ResponseEntity<Review> addMediaReview(@PathVariable("media") int media, @RequestBody Review review) {
    Optional<Media> mediaData = mediaRepository.findById(media);
    if (mediaData.isPresent()) {
      Optional<Review> reviewData = reviewRepository.findReviewByMidAndUid(review.getMid(),review.getUid());
      if (reviewData.isPresent()){
        Review _review = reviewData.get();
        System.out.println("Modify");
        _review.setContent(review.getContent());
        _review.setLike(0);
        _review.setDislike(0);
        _review.setRate(review.getRate());
        _review.setIsAudited(false);
        _review.setIsRecommend(review.getIsRecommend());
        Review __review = reviewRepository.save(_review);
        return new ResponseEntity<>(HttpStatus.OK);
      }else {
        review.setMid(mediaData.get());
        Review _review = reviewRepository.save(review);
        return new ResponseEntity<>(HttpStatus.CREATED);
      }
    }
    else {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

  @GetMapping("/review/{media}")
  public ResponseEntity<Page<Review>> getMediaReviews(
      @PathVariable("media") int media,
      @RequestParam(required = false) String pageSize,
      @RequestParam(required = false) String page,
      @RequestParam(required = false) String orderBy,
      @RequestParam(required = false) String type
      ) {
    int size = pageSize == null ? 20 : Integer.parseInt(pageSize);
    int pageNumber = page == null ? 0 : Integer.parseInt(page);
    int reviewType = type == null ? 0 : Integer.parseInt(type);
    String orderByString = orderBy == null ? "like" : orderBy;
    Pageable pageable = PageRequest.of(pageNumber, size, Sort.by(orderByString).descending());

    Optional<Media> mediaData = mediaRepository.findById(media);
    if (mediaData.isPresent()) {
      Page<Review> reviewList = reviewRepository.getReviewsByMidAndUidType(mediaData.get(), reviewType, pageable);
      for (Review r:reviewList) {
        Media tmpMedia = r.getMid();
        tmpMedia.setReviews(null);
        tmpMedia.setFavourites(null);
        tmpMedia.setHistories(null);
        r.setMid(tmpMedia);
        User tmpUser = r.getUid();
        tmpUser.setReviews(null);
        tmpUser.setFavourites(null);
        tmpUser.setHistories(null);
        r.setUid(tmpUser);
      }
      return new ResponseEntity<>(reviewList, HttpStatus.OK);
    }
    else {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

  // get review by user id and media id
  @GetMapping("/review/{mediaId}/{userId}")
  public ResponseEntity<Review> getMediaUserReview(
      @PathVariable("mediaId") int media,
      @PathVariable("userId") int user
      ) {
    Optional<Media> mediaData = mediaRepository.findById(media);
    Optional<User> userData = userRepository.findById(user);
    if (mediaData.isPresent() && userData.isPresent()) {
      Optional<Review> reviewData = reviewRepository.findReviewByMidAndUid(mediaData.get(), userData.get());
      if (reviewData.isPresent()){
        Review review = reviewData.get();
        Media tmpMedia = review.getMid();
        tmpMedia.setReviews(null);
        tmpMedia.setFavourites(null);
        tmpMedia.setHistories(null);
        review.setMid(tmpMedia);
        User tmpUser = review.getUid();
        tmpUser.setReviews(null);
        tmpUser.setFavourites(null);
        tmpUser.setHistories(null);
        review.setUid(tmpUser);
        return new ResponseEntity<>(review, HttpStatus.OK);
      }else {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      }
    }
    else {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

  @GetMapping("/review/user/{user}")
  public ResponseEntity<List<Review>> getUserReviews(
      @PathVariable("user") int user
      ) {
    Optional<User> userData = userRepository.findById(user);
    if (userData.isPresent()) {
      List<Review> reviewList = reviewRepository.findByUidOrderByTimeDesc(userData.get());
      for (Review r:reviewList) {
        Media tmpMedia = r.getMid();
        tmpMedia.setReviews(null);
        r.setMid(tmpMedia);
        User tmpUser = r.getUid();
        tmpUser.setReviews(null);
        tmpUser.setFavourites(null);
        tmpUser.setHistories(null);
        r.setUid(tmpUser);
      }
      return new ResponseEntity<>(reviewList, HttpStatus.OK);
    }
    else {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }
}
