package com.backend.project.repository;

import java.util.List;
import java.util.Optional;

import com.backend.project.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
//    List<Movies> findByPublished(boolean published);
    List<Movie> findByOriginalTitleContaining(String title);
    Optional<Movie> findByTmdbId(int tmdb_id);
}