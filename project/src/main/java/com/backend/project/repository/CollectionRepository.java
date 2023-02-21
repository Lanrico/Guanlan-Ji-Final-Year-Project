package com.backend.project.repository;

import com.backend.project.model.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CollectionRepository extends JpaRepository<Collection, Integer> {
  Optional<Collection> findByTmdbId(int tmdb_id);
}