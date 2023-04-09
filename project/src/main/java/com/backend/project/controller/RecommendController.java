package com.backend.project.controller;

import com.backend.project.model.*;
import com.backend.project.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://127.0.0.1:8081")
@RestController
@RequestMapping("/api")
public class RecommendController {
  @Value("${env.TMDB_KEY}")
  private String myTmdbKey;
  @Autowired
  InterestScoreRepository interestScoreRepository;
  @Autowired
  ReviewRepository reviewRepository;
  @Autowired
  HistoryRepository historyRepository;
  @Autowired
  FavouriteRepository favouriteRepository;
  @Autowired
  UserRepository userRepository;
  @Autowired
  MovieRepository movieRepository;

  @GetMapping("/recommend/{userId}")
  public ResponseEntity<List<Media>> getRecommend(@PathVariable("userId") int userId) {

    return new ResponseEntity<>(null, HttpStatus.OK);
  }

  @GetMapping("/recommend/realTime/{userId}")
  public ResponseEntity<List<MediaTimes>> getRecommendByRealTime(@PathVariable("userId") int userId) {
    System.out.println(myTmdbKey);
    // get user
    Optional<User> userData = userRepository.findById(userId);
    if (!userData.isPresent()) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    User user = userData.get();
    List<Review> reviewList = null;
    List<History> historyList = null;
    List<Favourite> favouriteList = null;
    // get review list
    Optional<List<Review>> reviewsData = reviewRepository.findReviewsByUid(user);
    if (reviewsData.isPresent()) {
      reviewList = reviewsData.get();
    }
    // get history list
    Optional<List<History>> historyData = historyRepository.findHistoriesByUid(user);
    if (historyData.isPresent()) {
      historyList = historyData.get();
    }
    // get favourite list
    Optional<List<Favourite>> favouriteData = favouriteRepository.findFavouritesByUid(user);
    if (favouriteData.isPresent()) {
      favouriteList = favouriteData.get();
    }
    // calculate real time recommend
    List<MediaTimes> mediaList = RealTimeRecommendCalculator(user, reviewList, historyList, favouriteList);
    List<MediaTimes> sortedList =  mediaList.stream()
        .sorted(Comparator.comparingInt(MediaTimes::getTime)
        .thenComparing(mt -> mt.getMedia().getFinalRate()).reversed())
        .limit(20)
        .collect(Collectors.toList());

    return new ResponseEntity<>(sortedList, HttpStatus.OK);
  }


  public ArrayList<MediaTimes> RealTimeRecommendCalculator(User user, List<Review> reviewList, List<History> historyList, List<Favourite> favouriteList) {
    // extract media from reviewList, historyList, favouriteList, and put them into a list, and delete duplicate media
    ArrayList<Media> mediaList = new ArrayList<Media>();
    for (Review review : reviewList) {
      if (!mediaList.contains(review.getMid())) {
        mediaList.add(review.getMid());
      }
    }
    for (History history : historyList) {
      if (!mediaList.contains(history.getMid())) {
        mediaList.add(history.getMid());
      }
    }
    for (Favourite favourite : favouriteList) {
      if (!mediaList.contains(favourite.getMid())) {
        mediaList.add(favourite.getMid());
      }
    }

    // calculate interest score for each media
    for (Media media : mediaList) {
      double userRating = 5;
      Boolean userLikesMovie = null;
      Instant dayBrowsed = Instant.MIN;
      Instant dayRated = Instant.MIN;
      Instant dayFavourited = Instant.MIN;
      boolean isFavourite = false;
      for (Review review : reviewList) {
        if (review.getMid().equals(media)) {
          userRating = review.getRate();
          userLikesMovie = review.getIsRecommend();
          dayRated = review.getTime();
        }
      }
      for (History history : historyList) {
        if (history.getMid().equals(media)) {
          dayBrowsed = history.getTime();
        }
      }
      for (Favourite favourite : favouriteList) {
        if (favourite.getMid().equals(media)) {
          dayFavourited = favourite.getTime();
          isFavourite = true;
        }
      }
      double interestScore = calculateInterestScore(userRating, userLikesMovie, dayBrowsed, dayRated, dayFavourited, isFavourite);
      if (interestScoreRepository.existsByUidAndMid(user, media)) {
        InterestScore interestScore1 = interestScoreRepository.findByUidAndMid(user, media);
        interestScore1.setScore(interestScore);
        interestScoreRepository.save(interestScore1);
      } else {
        InterestScore interestScore1 = new InterestScore(user, media, interestScore);
        interestScore1.setId(new InterestScoreId(user.getId(), media.getId()));
        System.out.println(interestScore1.getId().getUid());
        interestScoreRepository.save(interestScore1);
      }
    }
    List<InterestScore> interestScoreList = interestScoreRepository.findTop10ByUidOrderByScoreDesc(user);
    List<InterestScore> notInterestScoreList = interestScoreRepository.findTop10ByUidAndScoreBeforeOrderByScoreAsc(user, 50.0);
    TMDBController tmdbController = new TMDBController();
    ArrayList<MediaTimes> recommendMediaList = new ArrayList<MediaTimes>();

    for (InterestScore interestScore : interestScoreList) {
      try {
        List<Integer> similarList = tmdbController.getIdsFromTMDB(interestScore.getMid().getMovie().getImdbId(), "similar", myTmdbKey);
        for (Integer id : similarList) {
          Optional<Movie> movieData = movieRepository.findByTmdbId(id);
          if (movieData.isPresent()) {
            int index = -1;
            for (MediaTimes mediaTimes : recommendMediaList) {
              if (mediaTimes.getMedia().getId().equals(movieData.get().getId())) {
                index = recommendMediaList.indexOf(mediaTimes);
                break;
              }
            }
            if (index == -1) {
              Media tmpMedia = movieData.get().getMedia();
              tmpMedia.setFavourites(null);
              tmpMedia.setHistories(null);
              tmpMedia.setReviews(null);
              recommendMediaList.add(new MediaTimes(tmpMedia, 1));
            } else {
              recommendMediaList.get(index).setTime(recommendMediaList.get(index).getTime() + 1);
            }
          }
        }
      } catch (IOException e) {
        System.out.println(e.getMessage());
        throw new RuntimeException(e);
      }
    }

    for (InterestScore interestScore : notInterestScoreList){
      try {
        List<Integer> similarList = tmdbController.getIdsFromTMDB(interestScore.getMid().getMovie().getImdbId(), "similar", myTmdbKey);
        for (Integer id : similarList) {
          Optional<Movie> movieData = movieRepository.findByTmdbId(id);
          if (movieData.isPresent()) {
            int index = -1;
            for (MediaTimes mediaTimes : recommendMediaList) {
              if (mediaTimes.getMedia().getId().equals(movieData.get().getId())) {
                index = recommendMediaList.indexOf(mediaTimes);
                break;
              }
            }
            if (index == -1) {
              Media tmpMedia = movieData.get().getMedia();
              tmpMedia.setFavourites(null);
              tmpMedia.setHistories(null);
              tmpMedia.setReviews(null);
              recommendMediaList.add(new MediaTimes(tmpMedia, -1));
            } else {
              recommendMediaList.get(index).setTime(recommendMediaList.get(index).getTime() - 1);
            }
          }
        }

      } catch (IOException e) {
        System.out.println(e.getMessage());
        throw new RuntimeException(e);
      }
    }
    return recommendMediaList;
  }
  public double calculateInterestScore(double userRating, Boolean userLikesMovie, Instant dayBrowsed, Instant dayRated, Instant dayFavourited, boolean isFavourite) {
    double ratingWeight = 0.6;
    double reviewWeight = 0.3;
    double browseHistoryWeight = 0.1;

    int daysSinceBrowsed = (int) (Instant.now().getEpochSecond() - dayBrowsed.getEpochSecond()) / 86400;
    int daysSinceRated = (int) (Instant.now().getEpochSecond() - dayRated.getEpochSecond()) / 86400;
    int daysSinceFavourited = (int) (Instant.now().getEpochSecond() - dayFavourited.getEpochSecond()) / 86400;

//    double ratingScore = ((Math.pow(userRating - 5, 3)) / 125);
    double ratingScore = (userRating - 6) * 10;

    double reviewScore = userLikesMovie == null ? 0 : userLikesMovie?  10 : -10;
    double favouriteScore = isFavourite ? 30 : 0;

    double browseHistoryDecayRate = 0.01;
    double browseHistoryScore = 10 * Math.exp(-browseHistoryDecayRate * daysSinceBrowsed);;

    double decayRate = 0.01;
    double favouriteDecayRate = 0.005;
    double ratingDecayFactor = Math.exp(-decayRate * daysSinceRated);
    double reviewDecayFactor = Math.exp(-decayRate * daysSinceRated);
    double favouriteDecayFactor = Math.exp(-favouriteDecayRate * daysSinceFavourited);

    double timeWeightedRatingScore = ratingScore * ratingDecayFactor;
    double timeWeightedReviewScore = reviewScore * reviewDecayFactor;
    double timeWeightedFavoriteScore = favouriteScore * favouriteDecayFactor;

    double interest = (ratingWeight * timeWeightedRatingScore) + (reviewWeight * timeWeightedReviewScore) + (browseHistoryWeight * browseHistoryScore) + timeWeightedFavoriteScore;
    double interestScore = (interest + 130) / 2.6;

    return interestScore;
  }

  class MediaTimes {
    private Media media;
    private Integer time;

    public MediaTimes(Media media, Integer time) {
      this.media = media;
      this.time = time;
    }
    // getters and setters
    public Media getMedia() {
      return media;
    }
    public void setMedia(Media media) {
      this.media = media;
    }
    public Integer getTime() {
      return time;
    }
    public void setTime(Integer time) {
      this.time = time;
    }
  }
}
