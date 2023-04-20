package com.backend.project.controller;

import com.backend.project.model.Media;
import com.backend.project.model.ProfessionalRequest;
import com.backend.project.model.User;
import com.backend.project.repository.MediaRepository;
import com.backend.project.repository.ProfessionalRequestRepository;
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

@CrossOrigin(origins = "http://127.0.0.1:8081")
@RestController
@RequestMapping("/api")
public class ProfessionalRequestController {

  @Autowired
  ProfessionalRequestRepository professionalRequestRepository;

  @Autowired
  UserRepository userRepository;
  @GetMapping("/professionalRequest/all")
  public List<ProfessionalRequest> findAllProfessionalRequest() {
    return professionalRequestRepository.findAll();
  }

  @PostMapping("/professionalRequest/add/{userId}")
  public ResponseEntity<ProfessionalRequest> addProfessionalRequest(
      @RequestBody ProfessionalRequest professionalRequest,
      @PathVariable("userId") int userId
  ) {
    Optional<User> userData = userRepository.findById(userId);
    if (userData.isPresent()) {
      User _user = userData.get();
      professionalRequest.setUid(_user);
    }
    else {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<>(HttpStatus.OK);
  }

}
