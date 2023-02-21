package com.backend.project.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.backend.project.model.Media;
import com.backend.project.model.Movie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.project.repository.MovieRepository;
import com.backend.project.repository.MediaRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class MediaController {

  @Autowired
  MediaRepository mediaRepository;

  @GetMapping("/media")
  public Media getMedia() {
//        try {
    Optional<Media> mediaData = Optional.ofNullable(mediaRepository.findById(130));
    return mediaData.get();
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
  }

  public String updateMedia(int mid, String type) {
    Optional<Media> mediaData = Optional.ofNullable(mediaRepository.findById(122));
    if (mediaData.isPresent()){
      Media _media = mediaData.get();
      _media.setType(type);
      return "success";
    }
    else {
      return "fail";
    }

  }
}