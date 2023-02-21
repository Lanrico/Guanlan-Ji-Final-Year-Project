package com.backend.project.repository;

import java.util.Optional;

import com.backend.project.model.Media;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaRepository extends JpaRepository<Media, Integer> {
  Media findById(int id);
}