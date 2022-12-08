package com.backend.project.repository;


import java.util.List;

import com.backend.project.model.Movies;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movies, Long> {
//    List<Movies> findByPublished(boolean published);
    List<Movies> findByTitleContaining(String title);
}