package com.backend.project.controller;


import com.backend.project.model.Media;
import com.backend.project.model.Review;
import com.backend.project.model.User;
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

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ReviewController {
  @Autowired
  ReviewRepository reviewRepository;
  @Autowired
  MediaRepository mediaRepository;

  @PostMapping("/review/{media}")
  public ResponseEntity<Review> addMediaReview(@PathVariable("media") int media, @RequestBody Review review) {
    Optional<Media> mediaData = mediaRepository.findById(media);
    if (mediaData.isPresent()) {
      review.setMid(mediaData.get());
      Review _review = reviewRepository.save(review);
      return new ResponseEntity<>(HttpStatus.OK);
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
        r.setMid(tmpMedia);
        User tmpUser = r.getUid();
        tmpUser.setReviews(null);
        r.setUid(tmpUser);
      }
      return new ResponseEntity<>(reviewList, HttpStatus.OK);
    }
    else {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }
}
