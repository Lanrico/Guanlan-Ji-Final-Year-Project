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
import java.time.LocalDate;
import java.time.Period;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "${FRONTEND_URL}")
@RestController
@RequestMapping("/api")
public class RecommendController {
  @Value("${TMDB_KEY}")
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
  @Autowired
  PreferredGenreRepository preferredGenreRepository;
  @Autowired
  MediaRepository mediaRepository;
  @Autowired
  NotInterestedRepository notInterestedRepository;
  @Autowired
  private RecommendationRepository recommendationRepository;


  @GetMapping("/recommend/{userId}")
  public ResponseEntity<List<Media>> getRecommend(@PathVariable("userId") int userId) {
    // get user
    Optional<User> userData = userRepository.findById(userId);
    if (!userData.isPresent()) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    User user = userData.get();
    // get recommend list
    Optional<List<Recommendation>> recommendData = recommendationRepository.findMediasByUid(user);
    if (!recommendData.isPresent()) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    List<Recommendation> recommendList = recommendData.get();
    List<Media> mediaList = new ArrayList<>();
    for (Recommendation recommendation : recommendList) {
      Media tmpMedia = recommendation.getMid();
      tmpMedia.setFavourites(null);
      tmpMedia.setHistories(null);
      tmpMedia.setReviews(null);
      tmpMedia.setLanguages(null);
      tmpMedia.setUsers(null);
      mediaList.add(tmpMedia);
    }
    return new ResponseEntity<>(mediaList, HttpStatus.OK);
  }

  @PostMapping("/recommend/{userId}/generate")
  public ResponseEntity<List<MediaTimes>> generateRecommend(@PathVariable("userId") int userId) {
    // get user
    Optional<User> userData = userRepository.findById(userId);
    if (!userData.isPresent()) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    List<MediaTimes> finalMediaTimes = new ArrayList<>();
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
    //Get recommend from realTime section
    List<MediaTimes> realTimeList = RealTimeRecommendCalculator(user, reviewList, historyList, favouriteList);
    //Get recommend from offline section
    List<MediaTimes> offlineList = OfflineRecommendCalculator(user);
    //Get recommend from statistics section
    List<MediaTimes> statisticsList = StatisticsRecommendCalculator(user);
    List<NotInterested> notInterestedList = notInterestedRepository.findNotInterestedByUid(user);
    List<Media> notInterestedTimesList = new ArrayList<>();
    for (NotInterested notInterested : notInterestedList) {
      notInterestedTimesList.add(notInterested.getMid());
    }
    //Merge all recommend list
    finalMediaTimes = mediaTimesListGeneratorByMediaTimes(finalMediaTimes, realTimeList, 2);
    finalMediaTimes = mediaTimesListGeneratorByMediaTimes(finalMediaTimes, offlineList, 1);
    finalMediaTimes = mediaTimesListGeneratorByMediaTimes(finalMediaTimes, statisticsList, 3);
    finalMediaTimes = mediaTimesListGeneratorByMedia(notInterestedTimesList, finalMediaTimes, -5);
    List<MediaTimes> sortedMediaTimes = finalMediaTimes.stream()
        .sorted(Comparator.comparing(MediaTimes::getTime).reversed()
            .thenComparing((MediaTimes mt) -> mt.getMedia().getFinalRate()))
        .limit(20)
        .collect(Collectors.toList());
    List<Media> sortedMedia = finalMediaTimes.stream()
        .sorted(Comparator.comparing(MediaTimes::getTime).reversed()
            .thenComparing((MediaTimes mt) -> mt.getMedia().getFinalRate()))
        .map(MediaTimes::getMedia)
        .limit(20)
        .collect(Collectors.toList());
    //delete user's old recommend
    Optional<List<Recommendation>> oldRecommendations = recommendationRepository.findMediasByUid(user);
    if (oldRecommendations.isPresent()) {
      try {
        recommendationRepository.deleteAll(oldRecommendations.get());
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    //save new recommend
    for (Media media : sortedMedia) {
      Recommendation recommendation = new Recommendation(user, media);
      if (recommendationRepository.findByUidAndMid(user, media).isPresent()){
        continue;
      }
      recommendationRepository.save(recommendation);
    }
    return new ResponseEntity<>(sortedMediaTimes, HttpStatus.OK);
  }

  @GetMapping("/recommend/realTime/{userId}")
  public ResponseEntity<List<MediaTimes>> getRecommendByRealTime(
      @PathVariable("userId") int userId,
      @RequestParam(required = false) Integer weight
  ) {
    int recommendSize = weight == null ? 20 : weight;
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
    List<MediaTimes> sortedList = mediaList.stream()
        .sorted(Comparator.comparingDouble(MediaTimes::getTime)
            .thenComparing(mt -> mt.getMedia().getFinalRate()).reversed())
        .limit(recommendSize)
        .collect(Collectors.toList());

    return new ResponseEntity<>(sortedList, HttpStatus.OK);
  }

  @GetMapping("/recommend/offline/{userId}")
  public ResponseEntity<List<MediaTimes>> getRecommendByOffline(
      @PathVariable("userId") int userId,
      @RequestParam(required = false) Integer weight
  ) {
    int recommendSize = weight == null ? 20 : weight;
    // get user
    Optional<User> userData = userRepository.findById(userId);
    if (!userData.isPresent()) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    User user = userData.get();
    List<MediaTimes> mediaList = OfflineRecommendCalculator(user);
    List<MediaTimes> sortedList = mediaList.stream()
        .sorted(Comparator.comparingDouble(MediaTimes::getTime)
            .thenComparing(mt -> mt.getMedia().getFinalRate()).reversed())
        .limit(recommendSize)
        .collect(Collectors.toList());
    return new ResponseEntity<>(sortedList, HttpStatus.OK);
  }

  @GetMapping("/recommend/statistics/{userId}")
  public ResponseEntity<List<MediaTimes>> getRecommendByStatistics(
      @PathVariable("userId") int userId,
      @RequestParam(required = false) Integer weight
  ) {
    int recommendSize = weight == null ? 20 : weight;
    // get user
    Optional<User> userData = userRepository.findById(userId);
    if (!userData.isPresent()) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    User user = userData.get();
    List<MediaTimes> mediaList = StatisticsRecommendCalculator(user);
    List<MediaTimes> sortedList = mediaList.stream()
        .sorted(Comparator.comparingDouble(MediaTimes::getTime)
            .thenComparing(mt -> mt.getMedia().getFinalRate()).reversed())
        .limit(recommendSize)
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
        recommendMediaList = (ArrayList<MediaTimes>) mediaTimesListGeneratorById(similarList, recommendMediaList, 1);
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    }

    for (InterestScore interestScore : notInterestScoreList) {
      try {
        List<Integer> similarList = tmdbController.getIdsFromTMDB(interestScore.getMid().getMovie().getImdbId(), "similar", myTmdbKey);
        recommendMediaList = (ArrayList<MediaTimes>) mediaTimesListGeneratorById(similarList, recommendMediaList, -1);
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

    double reviewScore = userLikesMovie == null ? 0 : userLikesMovie ? 10 : -10;
    double favouriteScore = isFavourite ? 30 : 0;

    double browseHistoryDecayRate = 0.01;
    double browseHistoryScore = 10 * Math.exp(-browseHistoryDecayRate * daysSinceBrowsed);
    ;

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

  public ArrayList<MediaTimes> OfflineRecommendCalculator(User user) {
    List<User> userList = userRepository.findAllByIdNot(user.getId());
    List<Double> similarityList = new ArrayList<>();
    for (User userN : userList) {
      double similarity = calculateSimilarity(user, userN);
      similarityList.add(similarity);
    }
    // find the top 5 similar users
    List<User> top5SimilarUsers = new ArrayList<>();
    for (int i = 0; i < 5; i++) {
      int maxIndex = similarityList.indexOf(Collections.max(similarityList));
      top5SimilarUsers.add(userList.get(maxIndex));
      similarityList.set(maxIndex, -1.0);
    }
    ArrayList<MediaTimes> recommendMediaList = new ArrayList<MediaTimes>();

    for (User userN : top5SimilarUsers) {
      Optional<List<Recommendation>> similarRecommendationList = recommendationRepository.findMediasByUid(userN);
      if (!similarRecommendationList.isPresent()) {
        continue;
      }
      List<Media> similarMediaList = new ArrayList<>();
      for (Recommendation recommendation : similarRecommendationList.get()) {
        similarMediaList.add(recommendation.getMid());
      }
      recommendMediaList = (ArrayList<MediaTimes>) mediaTimesListGeneratorByMedia(similarMediaList, recommendMediaList, 1);
    }
    return recommendMediaList;
  }

  public double calculateSimilarity(User user1, User user2) {
    // get user preferred genres' id as a list
    List<Integer> user1GenreList = new ArrayList<>();
    List<Integer> user2GenreList = new ArrayList<>();
    Optional<List<PreferredGenre>> user1GenreListData = preferredGenreRepository.findPreferredGenresByUid(user1);
    Optional<List<PreferredGenre>> user2GenreListData = preferredGenreRepository.findPreferredGenresByUid(user2);
    if (user1GenreListData.isPresent() && user2GenreListData.isPresent()) {
      for (PreferredGenre preferredGenre : user1GenreListData.get()) {
        user1GenreList.add(preferredGenre.getGid().getId());
      }
      for (PreferredGenre preferredGenre : user2GenreListData.get()) {
        user2GenreList.add(preferredGenre.getGid().getId());
      }
    }

    // Get user attributes
    String country1 = user1.getCountry() == null ? "unknown1" : user1.getCountry().getId();
    LocalDate birthday1 = user1.getBirthday();
    String language1 = user1.getPreferLanguage().getId();

    String country2 = user2.getCountry() == null ? "unknown2" : user2.getCountry().getId();
    LocalDate birthday2 = user2.getBirthday();
    String language2 = user2.getPreferLanguage().getId();

    // Convert attributes to numerical values
    double countrySimilarity = country1.equals(country2) ? 1.0 : 0.0;
    double languageSimilarity = language1.equals(language2) ? 1.0 : 0.0;
    int age1 = birthday1 == null? 100 : Period.between(birthday1, LocalDate.now()).getYears();
    int age2 = birthday2 == null? 1 : Period.between(birthday2, LocalDate.now()).getYears();
    double genresOverlap = calculateGenresOverlap(user1GenreList, user2GenreList);

    // Normalize age attributes
    int maxAge = 100;
    double normalizedAge1 = (double) age1 / maxAge;
    double normalizedAge2 = (double) age2 / maxAge;

    // Set attribute weights
    double countryWeight = 1.0;
    double ageWeight = 2.0;
    double languageWeight = 1.0;
    double genresWeight = 3.0;

    // Calculate Euclidean distance with weights
    double euclideanDistance = Math.sqrt(
      Math.pow((normalizedAge1 - normalizedAge2) * ageWeight, 2) +
      Math.pow((countrySimilarity) * countryWeight, 2) +
      Math.pow((languageSimilarity) * languageWeight, 2) +
      Math.pow((genresOverlap) * genresWeight, 2)
    );

    // Calculate similarity based on the Euclidean distance
    double similarity = 1 / (1 + euclideanDistance);

    return similarity;
  }

  private double calculateGenresOverlap(List<Integer> preferredGenres1, List<Integer> preferredGenres2) {
    Set<Integer> intersection = new HashSet<>(preferredGenres1);
    intersection.retainAll(preferredGenres2);
    int overlappingGenres = intersection.size();
    int totalGenresInUser2 = preferredGenres2.size();

    return totalGenresInUser2 == 0 ? 0.0 : (double) overlappingGenres / totalGenresInUser2;
  }


  public ArrayList<MediaTimes> StatisticsRecommendCalculator(User user) {
    // find the top 20 most popular media
    List<Media> mediaTop20PopularList = mediaRepository.findTop20ByOrderByPopularityDesc();
    // find the top 20 final rate media
    List<Media> mediaTop20FinalRateList = mediaRepository.findTop20ByOrderByFinalRateDesc();
    // find the top 20 final rate media in user's preferred genres
    List<Media> mediaTop20FinalRateInPreferredGenresList = new ArrayList<>();
    Optional<List<PreferredGenre>> preferredGenreListData = preferredGenreRepository.findPreferredGenresByUid(user);
    if (preferredGenreListData.isPresent()) {
      for (PreferredGenre preferredGenre : preferredGenreListData.get()) {
        List<Media> mediaList = mediaRepository.findTop20ByGenresContainingOrderByFinalRateDesc(preferredGenre.getGid());
        mediaTop20FinalRateInPreferredGenresList.addAll(mediaList);
      }
    }
    // use the lists to generate the mediatimes list
    ArrayList<MediaTimes> recommendMediaList = new ArrayList<>();
    recommendMediaList = (ArrayList<MediaTimes>) mediaTimesListGeneratorByMedia(mediaTop20PopularList, recommendMediaList, 1);
    recommendMediaList = (ArrayList<MediaTimes>) mediaTimesListGeneratorByMedia(mediaTop20FinalRateList, recommendMediaList, 1);
    recommendMediaList = (ArrayList<MediaTimes>) mediaTimesListGeneratorByMedia(mediaTop20FinalRateInPreferredGenresList, recommendMediaList, 1);
    return recommendMediaList;
  }

  // convert the media list into a list of mediatimes
  public List<MediaTimes> mediaTimesListGeneratorById(List<Integer> mediaIdList, List<MediaTimes> existingMediaTimesList, double timeWeight) {
    List<MediaTimes> mediaTimesList = existingMediaTimesList == null? new ArrayList<>() : existingMediaTimesList;
    for (Integer id : mediaIdList) {
      Optional<Movie> movieData = movieRepository.findByTmdbId(id);
      if (movieData.isPresent()) {
        int index = -1;
        for (MediaTimes mediaTimes : mediaTimesList) {
          if (mediaTimes.getMedia().getId().equals(movieData.get().getId())) {
            index = mediaTimesList.indexOf(mediaTimes);
            break;
          }
        }
        if (index == -1) {
          Media tmpMedia = movieData.get().getMedia();
          tmpMedia.setFavourites(null);
          tmpMedia.setHistories(null);
          tmpMedia.setReviews(null);
          mediaTimesList.add(new MediaTimes(tmpMedia, timeWeight));
        } else {
          mediaTimesList.get(index).setTime(mediaTimesList.get(index).getTime() + timeWeight);
        }
      }
    }
    return mediaTimesList;
  }

  public List<MediaTimes> mediaTimesListGeneratorByMedia(List<Media> mediaList, List<MediaTimes> existingMediaTimesList, double timeWeight) {
    List<MediaTimes> mediaTimesList = existingMediaTimesList == null? new ArrayList<>() : existingMediaTimesList;
    for (Media media : mediaList) {
        int index = -1;
        for (MediaTimes mediaTimes : mediaTimesList) {
          if (mediaTimes.getMedia().getId().equals(media.getId())) {
            index = mediaTimesList.indexOf(mediaTimes);
            break;
          }
        }
        if (index == -1) {
          media.setFavourites(null);
          media.setHistories(null);
          media.setReviews(null);
          mediaTimesList.add(new MediaTimes(media, timeWeight));
        } else {
          mediaTimesList.get(index).setTime(mediaTimesList.get(index).getTime() + timeWeight);
        }
    }
    return mediaTimesList;
  }
  public List<MediaTimes> mediaTimesListGeneratorByMediaTimes(List<MediaTimes> mediaList1, List<MediaTimes> mediaTimesList2, double timeWeight) {
    if (mediaTimesList2 == null) {
      return mediaList1;
    }
    if (mediaList1 == null) {
      return mediaTimesList2;
    }
    for (MediaTimes mediaTimes: mediaTimesList2) {
      int index = -1;
      for (MediaTimes mediaTimes1 : mediaList1) {
        if (mediaTimes1.getMedia().getId().equals(mediaTimes.getMedia().getId())) {
          index = mediaList1.indexOf(mediaTimes1);
          break;
        }
      }
      if (index == -1) {
        mediaTimes.setTime(mediaTimes.getTime() * timeWeight);
        mediaList1.add(mediaTimes);
      } else {
        mediaList1.get(index).setTime(mediaList1.get(index).getTime() + mediaTimes.getTime() * timeWeight);
      }
    }
    return mediaList1;
  }

    public class MediaTimes {
    private Media media;
    private double time;

    public MediaTimes(Media media, double time) {
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

    public double getTime() {
      return time;
    }

    public void setTime(double time) {
      this.time = time;
    }
  }
}
