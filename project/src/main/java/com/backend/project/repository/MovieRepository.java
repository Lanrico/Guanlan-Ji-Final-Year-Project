package com.backend.project.repository;


import java.util.List;

import com.backend.project.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
//    List<Movies> findByPublished(boolean published);
    List<Movie> findByTitleContaining(String title);
}