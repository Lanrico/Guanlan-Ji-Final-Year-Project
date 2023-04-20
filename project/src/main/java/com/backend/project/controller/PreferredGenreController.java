package com.backend.project.controller;

import com.backend.project.model.Genre;
import com.backend.project.model.PreferredGenre;
import com.backend.project.model.User;
import com.backend.project.repository.GenreRepository;
import com.backend.project.repository.PreferredGenreRepository;
import com.backend.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://127.0.0.1:8081")
@RestController
@RequestMapping("/api")
public class PreferredGenreController {
  @Autowired
  PreferredGenreRepository preferredGenreRepository;
  @Autowired
  UserRepository userRepository;
  @Autowired
  GenreRepository genreRepository;
  @GetMapping("/preferredGenre/{userId}")
  public ResponseEntity<List<Genre>> getPreferredGenreByUser(@PathVariable("userId") int userId) {
    Optional<User> userData = userRepository.findById(userId);
    if (!userData.isPresent()) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    Optional<List<PreferredGenre>> preferredGenreData = preferredGenreRepository.findPreferredGenresByUid(userData.get());
    if (!preferredGenreData.isPresent()) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    List<PreferredGenre> preferredGenreList = preferredGenreData.get();
    List<Genre> genreList = new ArrayList<>();
    for (PreferredGenre preferredGenre : preferredGenreList) {
      genreList.add(preferredGenre.getGid());
    }
    return new ResponseEntity<>(genreList, HttpStatus.OK);
  }

  @PostMapping("/preferredGenre/{userId}/{genreIds}")
  public ResponseEntity<PreferredGenre> addPreferredGenre(@PathVariable("userId") int userId, @PathVariable("genreIds") String genreId) {
    Optional<User> userData = userRepository.findById(userId);
    if (!userData.isPresent()) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    String[] genreStringList = genreId.split("and");
    // delete all preferred genres of the user
    Optional<List<PreferredGenre>> preferredGenreData = preferredGenreRepository.findPreferredGenresByUid(userData.get());
    if (preferredGenreData.isPresent()) {
      List<PreferredGenre> preferredGenreList = preferredGenreData.get();
      preferredGenreRepository.deleteAll(preferredGenreList);
    }
    for(String g: genreStringList) {
      int genreIdInt = Integer.parseInt(g);
      Optional<Genre> genreData = genreRepository.findById(genreIdInt);
      if (!genreData.isPresent()) {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      }
      PreferredGenre preferredGenre = new PreferredGenre(userData.get(), genreData.get());
      preferredGenreRepository.save(preferredGenre);
    }
    return new ResponseEntity<>(null, HttpStatus.CREATED);
  }
}
