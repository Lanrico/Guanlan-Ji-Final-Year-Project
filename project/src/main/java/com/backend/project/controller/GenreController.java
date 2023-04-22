package com.backend.project.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.backend.project.model.Genre;
import com.backend.project.model.Media;
import com.backend.project.model.Movie;

import com.backend.project.repository.GenreRepository;
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

@CrossOrigin(origins = "${FRONTEND_URL}")
@RestController
@RequestMapping("/api")
public class GenreController {

  @Autowired
  GenreRepository genreRepository;

  @PostMapping("/genre")
  public List<Genre> createGenres(@RequestBody List<Genre> genresList) {
//        try {
    for (Genre g: genresList) {
      Optional<Genre> genreData = genreRepository.findById(g.getId());
      if (genreData.isPresent()) {
        Genre _genre = genreData.get();
        System.out.println("Modify");
        _genre.setName(g.getName());

        Genre __genre = genreRepository.save(_genre);
      } else {
        Genre _genre = genreRepository.save(g);
      }
    }
    return genresList;
  }

  @GetMapping("/genre/all")
  public ResponseEntity<List<Genre>> getAllGenres() {
      return new ResponseEntity<>(genreRepository.findAll(), HttpStatus.OK);
  }
}