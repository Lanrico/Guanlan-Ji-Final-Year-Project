package com.backend.project.controller;

import com.backend.project.model.Media;
import com.backend.project.model.ProUserRequest;
import com.backend.project.repository.MediaRepository;
import com.backend.project.repository.ProUserRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:8081")
@RestController
@RequestMapping("/api")
public class ProUserRequestController {

  @Autowired
  ProUserRequestRepository proUserRequestRepository;

  @PostMapping ("/proUserRequests")
  public ProUserRequest createProUserRequest(@RequestBody ProUserRequest proUserRequest) {
    return proUserRequestRepository.save(proUserRequest);
  }
}
