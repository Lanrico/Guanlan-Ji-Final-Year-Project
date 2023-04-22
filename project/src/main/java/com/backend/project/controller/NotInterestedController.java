package com.backend.project.controller;

import com.backend.project.model.*;
import com.backend.project.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
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
public class NotInterestedController {

  @Autowired
  NotInterestedRepository notInterestedRepository;
  @Autowired
  FavouriteRepository favouriteRepository;
  @Autowired
  MediaRepository mediaRepository;
  @Autowired
  UserRepository userRepository;
  @Autowired
  RecommendationRepository recommendationRepository;
  @PostMapping("/notInterested/{userId}/{mediaId}")
  public ResponseEntity<NotInterested> addNotInterested(@PathVariable("userId") Integer userId, @PathVariable("mediaId") Integer mediaId) {
    Optional<User> userData = userRepository.findById(userId);
    if (!userData.isPresent()) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    Optional<Media> mediaData = mediaRepository.findById(mediaId);
    if (!mediaData.isPresent()) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    Optional<NotInterested> notInterestedData = notInterestedRepository.findByUidAndMid(userData.get(), mediaData.get());
    if (notInterestedData.isPresent()) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    Optional<Favourite> favouriteData = favouriteRepository.findByUidAndMid(userData.get(), mediaData.get());
    if (favouriteData.isPresent()) {
      favouriteRepository.delete(favouriteData.get());
    }
    Optional<Recommendation> recommendationData = recommendationRepository.findByUidAndMid(userData.get(), mediaData.get());
    if (recommendationData.isPresent()) {
      recommendationRepository.delete(recommendationData.get());
    }
    NotInterested notInterested = new NotInterested(userData.get(), mediaData.get());
    notInterestedRepository.save(notInterested);
    return new ResponseEntity<>(null, HttpStatus.CREATED);
  }
}

