package com.backend.project.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.backend.project.model.Movies;
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

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class MovieController {

    @Autowired
    MovieRepository movieRepository;

    @GetMapping("/homepage")
    public ResponseEntity<List<Movies>> getAllTutorials(@RequestParam(required = false) String title) {
        try {
            List<Movies> movies = new ArrayList<Movies>();

            if (title == null)
                movieRepository.findAll().forEach(movies::add);
            else
                movieRepository.findByTitleContaining(title).forEach(movies::add);

            if (movies.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(movies, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/homepage/{id}")
    public ResponseEntity<Movies> getTutorialById(@PathVariable("id") long id) {
        Optional<Movies> movieData = movieRepository.findById(id);

        if (movieData.isPresent()) {
            return new ResponseEntity<>(movieData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/homepage")
    public ResponseEntity<Movies> createMovie(@RequestBody Movies movies) {
        try {
            Movies _movies = movieRepository
                    .save(new Movies(movies.getTitle(), movies.getOverview(), "123123"));
            return new ResponseEntity<>(_movies, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/homepage/{id}")
    public ResponseEntity<Movies> updateTutorial(@PathVariable("id") long id, @RequestBody Movies movies) {
        Optional<Movies> tutorialData = movieRepository.findById(id);

        if (tutorialData.isPresent()) {
            Movies _movies = tutorialData.get();
            _movies.setOverview(movies.getOverview());
            _movies.setRelease_date(movies.getRelease_date());
            _movies.setTitle(movies.getTitle());
            return new ResponseEntity<>(movieRepository.save(_movies), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/homepage/{id}")
    public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") long id) {
        try {
            movieRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/homepage")
    public ResponseEntity<HttpStatus> deleteAllTutorials() {
        try {
            movieRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}