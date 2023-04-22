package com.backend.project.controller;

import com.backend.project.model.Genre;
import com.backend.project.model.Language;
import com.backend.project.model.Media;
import com.backend.project.model.Movie;
import com.backend.project.repository.GenreRepository;
import com.backend.project.repository.LanguageRepository;
import com.backend.project.repository.MediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "${FRONTEND_URL}")
@RestController
@RequestMapping("/api")
public class TestController {

  @Autowired
  MediaRepository mediaRepository;

  @GetMapping("/test")
  public List<Media> findTrendingMovies() {
    Pageable pageable = PageRequest.of(0, 10, Sort.by("movie_releaseDate").descending());
    return mediaRepository.findAllByType(pageable, "0");
  }
}
