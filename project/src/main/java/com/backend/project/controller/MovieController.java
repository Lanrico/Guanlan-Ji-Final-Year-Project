package com.backend.project.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class MovieController {

    @Autowired
    MovieRepository movieRepository;

    @GetMapping("/homepage")
    public ResponseEntity<List<Movie>> getAllTutorials(@RequestParam(required = false) String title) {
        try {
            List<Movie> movies = new ArrayList<Movie>();

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
    public ResponseEntity<Movie> getTutorialById(@PathVariable("id") long id) {
        Optional<Movie> movieData = movieRepository.findById(id);

        if (movieData.isPresent()) {
            return new ResponseEntity<>(movieData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/homepage")
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {
        try {
            Movie _movie = movieRepository
                    .save(new Movie());
            return new ResponseEntity<>(_movie, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/homepage/{id}")
    public ResponseEntity<Movie> updateTutorial(@PathVariable("id") long id, @RequestBody Movie movie) {
        Optional<Movie> tutorialData = movieRepository.findById(id);

        if (tutorialData.isPresent()) {
            Movie _movie = tutorialData.get();
            _movie.setOverview(movie.getOverview());
            _movie.setReleaseDate(movie.getReleaseDate());
            _movie.setTitle(movie.getTitle());
            return new ResponseEntity<>(movieRepository.save(_movie), HttpStatus.OK);
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