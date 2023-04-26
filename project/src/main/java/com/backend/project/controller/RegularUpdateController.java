package com.backend.project.controller;

import com.backend.project.model.Media;
import com.backend.project.model.Movie;
import com.backend.project.model.Review;
import com.backend.project.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import spark.Route;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins = "${FRONTEND_URL}")
@RestController
@RequestMapping("/api")
public class RegularUpdateController {
  @Value("${TMDB_KEY}")
  private String myTmdbKey;
  @Autowired
  MediaRepository mediaRepository;
  @Autowired
  ReviewRepository reviewRepository;
  @Autowired
  HistoryRepository historyRepository;
  @Autowired
  CompanyRepository companyRepository;
  @Autowired
  MovieRepository movieRepository;

  @Scheduled(cron = "0 0 4 * * ?")
  public void dailyUpdateTask() throws IOException {
    updateAllMediaFinalRate();
    updateAllMediaPopularity();
    updateDailyMovie();
  }
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

  @PostMapping("/update/finalRateAll")
  public ResponseEntity<Double> updateAllMediaFinalRate() {
    List<Media> mediaList = mediaRepository.findAll();
    for (Media media:mediaList) {
      double[] compute_result = finalRateComputer(media);
      media.setFinalVoteCount((int) compute_result[1]);
      media.setFinalRate(compute_result[0]);
    }
    mediaRepository.saveAll(mediaList);
    return new ResponseEntity<>(null, HttpStatus.OK);
  }

  @PostMapping("/update/popularityAll")
  public ResponseEntity<Double> updateAllMediaPopularity() {
    List<Media> mediaList = mediaRepository.findAll();
    for (Media media:mediaList) {
      double historyCount = historyRepository.countByMid(media);
      double reviewCount = reviewRepository.countByMid(media);
      media.setFinalPopularity(media.getPopularity() + historyCount + reviewCount * 10);
    }
    mediaRepository.saveAll(mediaList);
    return new ResponseEntity<>(null, HttpStatus.OK);
  }

//  @PostMapping("/update/mediaAll/daily")
//  public ResponseEntity<List<Integer>> updateDailyMedia() throws IOException {
//    TMDBController tmdbController = new TMDBController();
//    List<Integer> updateTMDBIdList = tmdbController.getDailyUpdateIdsFromTMDB(myTmdbKey);
//    int modifyCount = 0;
//    int addCount = 0;
//    for (Integer id:updateTMDBIdList) {
//      Media newMedia = tmdbController.getMediaDataFromTMDB(id, myTmdbKey, companyRepository);
//      if (newMedia != null) {
//        if (newMedia.getPopularity() > 1) {
//          Optional<Media> mediaData = mediaRepository.findByMovieTmdbId(id);
//          if (mediaData.isPresent()) {
//            Media media = mediaData.get();
//            media.setRate(newMedia.getRate());
//            media.setVoteCount(newMedia.getVoteCount());
//            media.setPopularity(newMedia.getPopularity());
//            mediaRepository.save(media);
//            System.out.println("modify media: " + id);
//            modifyCount++;
//          } else {
//            mediaRepository.save(newMedia);
//            System.out.println("add media: " + id);
//            addCount++;
//          }
//        }
//      }
//    }
//    System.out.println("modify media count: " + modifyCount);
//    System.out.println("add media count: " + addCount);
//    return new ResponseEntity<>(updateTMDBIdList, HttpStatus.OK);
//  }

  @PostMapping("/update/movieAll/daily")
  public ResponseEntity<List<Integer>> updateDailyMovie() throws IOException {
    TMDBController tmdbController = new TMDBController();
    List<Integer> updateTMDBIdList = tmdbController.getDailyUpdateIdsFromTMDB(myTmdbKey);
    int modifyCount = 0;
    int addCount = 0;
    for (Integer id:updateTMDBIdList) {
      Movie newMovie = tmdbController.getMovieDataFromTMDB(id, myTmdbKey, companyRepository);
      if (newMovie != null) {
        if (newMovie.getMedia().getPopularity() > 1 && newMovie.getMedia().getVoteCount() > 0 && !newMovie.getAdult()) {
          Optional<Movie> movieData = movieRepository.findByTmdbId(id);
          if (movieData.isPresent()) {
            Movie movie = movieData.get();
            movie.getMedia().setRate(newMovie.getMedia().getRate());
            movie.getMedia().setVoteCount(newMovie.getMedia().getVoteCount());
            movie.getMedia().setPopularity(newMovie.getMedia().getPopularity());
            movieRepository.save(movie);
            System.out.println("modify movie: " + id);
            modifyCount++;
          } else {
            movieRepository.save(newMovie);
            System.out.println("add movie: " + id);
            addCount++;
          }
        }
      }
    }
    System.out.println("modify media count: " + modifyCount);
    System.out.println("add media count: " + addCount);
    return new ResponseEntity<>(updateTMDBIdList, HttpStatus.OK);
  }

  @PostMapping("/update/movie/{movieTMDBId}")
  public ResponseEntity<Integer> updateDailyMovieById(@PathVariable int movieTMDBId) throws IOException {
    TMDBController tmdbController = new TMDBController();
    Movie newMovie = tmdbController.getMovieDataFromTMDB(movieTMDBId, myTmdbKey, companyRepository);
    if (newMovie != null) {
      Optional<Movie> movieData = movieRepository.findByTmdbId(movieTMDBId);
      if (movieData.isPresent()) {
        Movie movie = movieData.get();
        movie.getMedia().setRate(newMovie.getMedia().getRate());
        movie.getMedia().setVoteCount(newMovie.getMedia().getVoteCount());
        movie.getMedia().setPopularity(newMovie.getMedia().getPopularity());
        movieRepository.save(movie);
        System.out.println("modify movie: " + movieTMDBId);
      } else {
        movieRepository.save(newMovie);
        System.out.println("add movie: " + movieTMDBId);
      }
    }
    return new ResponseEntity<>(movieTMDBId, HttpStatus.OK);
  }

  @PostMapping("/rate/average")
  public Double getAverageRate() {
    return mediaRepository.findRateAverage();
  }

  @PostMapping("/voteCount/average")
  public Double getVoteCountAverage() {
    return mediaRepository.findVoteCountAverage();
  }

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
