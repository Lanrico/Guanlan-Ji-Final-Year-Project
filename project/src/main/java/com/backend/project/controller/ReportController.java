package com.backend.project.controller;

import com.backend.project.model.*;
import com.backend.project.repository.MediaRepository;
import com.backend.project.repository.ReportRepository;
import com.backend.project.repository.ReviewRepository;
import com.backend.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://127.0.0.1:8081")
@RestController
@RequestMapping("/api")
public class ReportController {

  @Autowired
  ReportRepository reportRepository;
  @Autowired
  UserRepository userRepository;
  @Autowired
  ReviewRepository reviewRepository;

  @GetMapping("/report/all")
  public ResponseEntity<List<Report>> getAllReports() {
    try {
      List<Report> reports = reportRepository.findAll();
      for (Report report : reports) {
        report.getRid().getUid().setReviews(null);
        report.getRid().getUid().setFavourites(null);
        report.getRid().getUid().setHistories(null);
        report.getRid().getMid().setReviews(null);
        report.getRid().getMid().setFavourites(null);
        report.getRid().getMid().setHistories(null);
        report.getUid().setFavourites(null);
        report.getUid().setReviews(null);
        report.getUid().setHistories(null);
      }
      return new ResponseEntity<>(reports, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @PostMapping("/report/add")
  public ResponseEntity<Report> addReport(
      @RequestBody Report report
  ) {
    if (reportRepository.findByUidAndRid(report.getUid(), report.getRid()).isPresent()) {
//      overwriting the report
      Report _report = reportRepository.findByUidAndRid(report.getUid(), report.getRid()).get();
      _report.setTime(report.getTime());
      _report.setReason(report.getReason());
      _report.setReviewResult(report.getReviewResult());
      reportRepository.save(_report);
      return new ResponseEntity<>(HttpStatus.OK);
    }
    report.setId(new ReportId(report.getUid().getId(), report.getRid().getId()));
    reportRepository.save(report);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }
  @Transactional
  @DeleteMapping ("/report/deleteReview/{userId}/{reviewId}")
  public ResponseEntity<HttpStatus> deleteReview(
      @PathVariable("userId") Integer userId,
      @PathVariable("reviewId") Integer reviewId
  ) {
      Optional<User> userData = userRepository.findById(userId);
      if (!userData.isPresent()) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
      Optional<Review> reviewData = reviewRepository.findById(reviewId);
      if (!reviewData.isPresent()) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
      reportRepository.deleteAllByRid(reviewData.get());
      reviewRepository.deleteById(reviewId);
      return new ResponseEntity<>(HttpStatus.OK);
  }
  @Transactional
  @DeleteMapping("/report/rejectReport/{userId}/{reviewId}")
  public ResponseEntity<HttpStatus> rejectReport(
      @PathVariable("userId") Integer userId,
      @PathVariable("reviewId") Integer reviewId
  ) {
    Optional<User> userData = userRepository.findById(userId);
    if (!userData.isPresent()) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    Optional<Review> reviewData = reviewRepository.findById(reviewId);
    if (!reviewData.isPresent()) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    reportRepository.deleteByRid(reviewData.get());
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
