package com.backend.project.controller;

import com.backend.project.model.Media;
import com.backend.project.model.ProUserRequest;
import com.backend.project.model.User;
import com.backend.project.repository.MediaRepository;
import com.backend.project.repository.ProUserRequestRepository;
import com.backend.project.repository.UserRepository;
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
public class ProUserRequestController {

  @Autowired
  ProUserRequestRepository proUserRequestRepository;
  @Autowired
  UserRepository userRepository;

  @GetMapping("/proUserRequest/all")
  public ResponseEntity<List<ProUserRequest>> getAllProUserRequest() {
    try {
      List<ProUserRequest> proUserRequests = proUserRequestRepository.findAll();
      for (ProUserRequest proUserRequest : proUserRequests) {
        proUserRequest.getUid().setFavourites(null);
        proUserRequest.getUid().setReviews(null);
        proUserRequest.getUid().setRecommendations(null);
        proUserRequest.getUid().setHistories(null);
        if (proUserRequest.getAid() != null){
          proUserRequest.getAid().setFavourites(null);
          proUserRequest.getAid().setReviews(null);
          proUserRequest.getAid().setRecommendations(null);
          proUserRequest.getAid().setHistories(null);
        }
      }
      return new ResponseEntity<>(proUserRequests, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/proUserRequest/{userId}")
  public ResponseEntity<ProUserRequest> getProUserRequestByUserId(@PathVariable("userId") int userId) {
    Optional<User> userData = userRepository.findById(userId);
    if (!userData.isPresent()) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    Optional<ProUserRequest> proUserRequestData = proUserRequestRepository.findByUid(userData.get());
    if (proUserRequestData.isPresent()) {
      ProUserRequest proUserRequest = proUserRequestData.get();
      proUserRequest.getUid().setFavourites(null);
      proUserRequest.getUid().setReviews(null);
      proUserRequest.getUid().setRecommendations(null);
      proUserRequest.getUid().setHistories(null);
      if (proUserRequest.getAid() != null){
        proUserRequest.getAid().setFavourites(null);
        proUserRequest.getAid().setReviews(null);
        proUserRequest.getAid().setRecommendations(null);
        proUserRequest.getAid().setHistories(null);
      }
      return new ResponseEntity<>(proUserRequest, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  @PostMapping ("/proUserRequest/add/{userId}")
  public ResponseEntity<ProUserRequest> createProUserRequest(
      @RequestBody ProUserRequest proUserRequest,
      @PathVariable("userId") int userId
  ) {
    Optional<User> userData = userRepository.findById(userId);
    if (!userData.isPresent()) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    Optional<ProUserRequest> proUserRequestData = proUserRequestRepository.findByUid(userData.get());
    if (proUserRequestData.isPresent()) {
      ProUserRequest _proUserRequest = proUserRequestData.get();
      _proUserRequest.setJob(proUserRequest.getJob());
      _proUserRequest.setCompany(proUserRequest.getCompany());
      _proUserRequest.setTime(proUserRequest.getTime());
      _proUserRequest.setDescription(proUserRequest.getDescription());
      _proUserRequest.setStatus(null);
      _proUserRequest.setAid(null);
      return new ResponseEntity<>(proUserRequestRepository.save(_proUserRequest), HttpStatus.OK);
    }
    proUserRequest.setUid(userData.get());
    return new ResponseEntity<> (proUserRequestRepository.save(proUserRequest), HttpStatus.CREATED);
  }

  @PostMapping("/proUserRequest/{status}/{adminId}/{proUserRequestId}")
  public ResponseEntity<ProUserRequest> passProUserRequest(
      @PathVariable("adminId") int adminId,
      @PathVariable("proUserRequestId") int proUserRequestId,
      @PathVariable("status") boolean status
  ) {
    Optional<User> adminData = userRepository.findById(adminId);

    if (!adminData.isPresent()) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    if (adminData.get().getType() != 2) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    Optional<ProUserRequest> proUserRequestData = proUserRequestRepository.findById(proUserRequestId);
    if (!proUserRequestData.isPresent()) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
//    if (proUserRequestData.get().getStatus() == true) {
//      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//    }
    ProUserRequest _proUserRequest = proUserRequestData.get();
    _proUserRequest.setStatus(status);
    _proUserRequest.setAid(adminData.get());
    proUserRequestRepository.save(_proUserRequest);
    if (status) {
      Optional<User> user = userRepository.findById(_proUserRequest.getUid().getId());
      if (!user.isPresent()) {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      }
      if (user.get().getType() != 0) {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      }
      User _user = user.get();
      _user.setType(1);
      userRepository.save(_user);
    }
    return new ResponseEntity<> (null, HttpStatus.CREATED);
  }
}
