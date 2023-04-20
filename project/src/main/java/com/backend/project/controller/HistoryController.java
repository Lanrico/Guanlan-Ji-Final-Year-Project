package com.backend.project.controller;

import com.backend.project.model.*;
import com.backend.project.repository.FavouriteRepository;
import com.backend.project.repository.HistoryRepository;
import com.backend.project.repository.MediaRepository;
import com.backend.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://127.0.0.1:8081")
@RestController
@RequestMapping("/api")
public class HistoryController {

  @Autowired
  HistoryRepository historyRepository;

  @Autowired
  UserRepository userRepository;
  @Autowired
  MediaRepository mediaRepository;
  @GetMapping("/history/{userId}/getAllByPage")
  public ResponseEntity<Page<History>> getFavourite(
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
      Page<History> historyData = historyRepository.findByUid(userData.get(),  pageable);
      for (History h:historyData) {
        h.getMid().setReviews(null);
        h.setUid(null);
      }
      return new ResponseEntity<>(historyData, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/history/{userId}/add/{mediaId}")
  public ResponseEntity<Media> addFavourite(
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
    Optional<History> historyData = historyRepository.findByUidAndMid(userData.get(), mediaData.get());

    History history = new History();
    history.setId(new HistoryId(userId, mediaId));
    history.setUid(userData.get());
    history.setMid(mediaData.get());
    history.setTime(Instant.now());

    if(historyData.isPresent()) {
      History _history = historyData.get();
      _history.setTime(Instant.now());
      historyRepository.save(_history);
      return new ResponseEntity<>(null, HttpStatus.OK);
    }

// delete the oldest record if the number of records is more than 100
    List<History> historyList = historyRepository.findHistoryRecordsByUidOrderByTimeAsc(userData.get());
    while (historyList.size() > 99) {
      History oldestRecord = historyList.get(0);
      historyRepository.delete(oldestRecord);
      historyList.remove(0);
    }

    historyRepository.save(history);
    return new ResponseEntity<>(null, HttpStatus.CREATED);
  }

  @DeleteMapping("/history/{userId}/delete/{mediaId}")
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
    Optional<History> historyData = historyRepository.findByUidAndMid(userData.get(), mediaData.get());
    if (historyData.isPresent()) {
      historyRepository.delete(historyData.get());
      return new ResponseEntity<>(null, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
  }
}
