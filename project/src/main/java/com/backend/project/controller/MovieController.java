package com.backend.project.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.backend.project.model.Media;
import com.backend.project.model.Movie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
public class MovieController {

  @Autowired
  MovieRepository movieRepository;
  @Autowired
  private MediaRepository mediaRepository;

  @GetMapping("/movie/all")
  public ResponseEntity<List<Movie>> getAllMovies(@RequestParam(required = false) String originalTitle) {
    try {
      List<Movie> movies = new ArrayList<Movie>();

      if (originalTitle == null)
        movieRepository.findAll().forEach(movies::add);
      else
        movieRepository.findByOriginalTitleContaining(originalTitle).forEach(movies::add);

      if (movies.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(movies, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/movie/{id}")
  public ResponseEntity<Movie> getMovieById(@PathVariable("id") int id) {
    Optional<Movie> movieData = movieRepository.findById(id);

    if (movieData.isPresent()) {
      return new ResponseEntity<>(movieData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

//    @PostMapping("/movie")
//    public ResponseEntity<List<Movie>> createMovie(@RequestBody List<Movie> movieList) {
//        try {
//            for (Movie m: movieList) {
//                Optional<Movie> movieData = movieRepository.findById(Long.valueOf(m.getId()));
//                if(movieData.isPresent()){
//                    Movie _movie = movieData.get();
//                    _movie.setAdult(m.getAdult());
//                    _movie.setId(m.getId());
//                    _movie.setVideo(m.getVideo());
//                    _movie.setTmdbId(m.getTmdbId());
//                    _movie.setOriginalTitle(m.getOriginalTitle());
//                    _movie.setMedia(m.getMedia());
//                    Movie __movie = movieRepository.save(_movie);
//                }else {
//                    Movie _movie = movieRepository
//                        .save(m);
//                }
//            }
//
//            return new ResponseEntity<>(movieList, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }



  @PostMapping("/movie")
  public List<Movie> createMovies(@RequestBody List<Movie> movieList) {
//        try {
    for (Movie m : movieList) {
        Optional<Movie> movieData = movieRepository.findByTmdbId(m.getTmdbId());
        if (movieData.isPresent()) {
          Movie _movie = movieData.get();
          System.out.println("Modify");
          _movie.setImdbId(m.getImdbId());
          _movie.setOverview(m.getOverview());
          _movie.setReleaseDate(m.getReleaseDate());
          _movie.setPosterPath(m.getPosterPath());
          _movie.setBudget(m.getBudget());
          _movie.setHomepage(m.getHomepage());
          _movie.setOriginalLanguage(m.getOriginalLanguage());
          _movie.setTitle(m.getTitle());
          _movie.setTagline(m.getTagline());
          _movie.setStatus(m.getStatus());
          _movie.setRuntime(m.getRuntime());
          _movie.setRevenue(m.getRevenue());
          _movie.setAdult(m.getAdult());
          _movie.setVideo(m.getVideo());
          _movie.setOriginalTitle(m.getOriginalTitle());
          Movie __movie = movieRepository.save(_movie);
        }
       else {
        Movie _movie = movieRepository
            .save(m);
      }
    }

    return movieList;
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
  }

  @PutMapping("/movie/{id}")
  public ResponseEntity<Movie> updateMovie(@PathVariable("id") int id, @RequestBody Movie movie) {
    Optional<Movie> movieData = movieRepository.findById(id);

    if (movieData.isPresent()) {
      Movie _movie = movieData.get();
//            _movie.setOverview(movie.getOverview());
//            _movie.setReleaseDate(movie.getReleaseDate());
//            _movie.setTitle(movie.getTitle());
      return new ResponseEntity<>(movieRepository.save(_movie), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/movie/{id}")
  public ResponseEntity<HttpStatus> deleteMovie(@PathVariable("id") int id) {
    try {
      movieRepository.deleteById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

//    @DeleteMapping("/movie")
//    public ResponseEntity<HttpStatus> deleteAllMovies() {
//        try {
//            movieRepository.deleteAll();
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//
//    }



}