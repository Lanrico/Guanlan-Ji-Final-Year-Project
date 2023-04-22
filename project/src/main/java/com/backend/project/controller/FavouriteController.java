package com.backend.project.controller;

import com.backend.project.model.*;
import com.backend.project.repository.FavouriteRepository;
import com.backend.project.repository.MediaRepository;
import com.backend.project.repository.NotInterestedRepository;
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
import java.util.Set;

@CrossOrigin(origins = "${FRONTEND_URL}")
@RestController
@RequestMapping("/api")
public class FavouriteController {

  @Autowired
  FavouriteRepository favouriteRepository;
  @Autowired
  UserRepository userRepository;
  @Autowired
  MediaRepository mediaRepository;
  @Autowired
  NotInterestedRepository notInterestedRepository;
  @GetMapping("/favourite/{userId}/getAllByPage")
  public ResponseEntity<Page<Favourite>> getFavourite(
      @PathVariable("userId") Integer userId,
      @RequestParam(required = false) String pageSize,
      @RequestParam(required = false) String page
  ) {
    try {
      int size = pageSize == null ? 20 : Integer.parseInt(pageSize);
      int pageNumber = page == null ? 0 : Integer.parseInt(page);
      Pageable pageable = PageRequest.of(pageNumber, size, Sort.by("time").descending());
      Optional<User> userData = userRepository.findById(userId);
      if(!userData.isPresent()) {
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
      }
      Page<Favourite> favouriteData = favouriteRepository.findByUid(userData.get(), pageable);
        for (Favourite f:favouriteData) {
          f.getMid().setReviews(null);
          f.setUid(null);
        }
        return new ResponseEntity<>(favouriteData, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
  }

  //get all favourite by user id
  @GetMapping("/favourite/{userId}/getAll")
  public ResponseEntity<List<Favourite>> getFavourite(
      @PathVariable("userId") Integer userId
  ) {
    try {
      Optional<User> userData = userRepository.findById(userId);
      if(!userData.isPresent()) {
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
      }
      List<Favourite> favouriteData = favouriteRepository.findByUidOrderByTimeDesc(userData.get());
      for (Favourite f:favouriteData) {
        f.getMid().setReviews(null);
        f.setUid(null);
      }
      return new ResponseEntity<>(favouriteData, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
  }
  // add favourite to user
  @PostMapping("/favourite/{userId}/add/{mediaId}")
  public ResponseEntity<Media> addFavourite(
      @PathVariable("userId") Integer userId,
      @PathVariable("mediaId") Integer mediaId,
      @RequestBody Favourite favouriteDandT
  ) {
    Optional<User> userData = userRepository.findById(userId);
    if(!userData.isPresent()) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    Optional<Media> mediaData = mediaRepository.findById(mediaId);
    if(!mediaData.isPresent()) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    Optional<Favourite> favouriteData = favouriteRepository.findByUidAndMid(userData.get(), mediaData.get());
    if(favouriteData.isPresent()) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    Optional<NotInterested> notInterestedData = notInterestedRepository.findByUidAndMid(userData.get(), mediaData.get());
    if (notInterestedData.isPresent()) {
      notInterestedRepository.delete(notInterestedData.get());
    }
    Favourite favourite = new Favourite();
    favourite.setId(new FavouriteId(userId, mediaId));
    favourite.setUid(userData.get());
    favourite.setMid(mediaData.get());
    favourite.setTime(favouriteDandT.getTime());
    favourite.setDescribe(favouriteDandT.getDescribe());
    favouriteRepository.save(favourite);
    return new ResponseEntity<>(null, HttpStatus.OK);
  }

  @DeleteMapping("/favourite/{userId}/delete/{mediaId}")
  public ResponseEntity<Favourite> deleteFavourite(
      @PathVariable("userId") Integer userId,
      @PathVariable("mediaId") Integer mediaId
  ) {
    Optional<User> userData = userRepository.findById(userId);
    if(!userData.isPresent()) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    Optional<Media> mediaData = mediaRepository.findById(mediaId);
    if(!mediaData.isPresent()) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    Optional<Favourite> optionalFavourite = favouriteRepository.findByUidAndMid(userData.get(), mediaData.get());
    if (optionalFavourite.isPresent()) {
      favouriteRepository.delete(optionalFavourite.get());
      return new ResponseEntity<>(null, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
  }
}
