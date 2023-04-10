package com.backend.project.repository;

import com.backend.project.model.Genre;
import com.backend.project.model.PreferredGenre;
import com.backend.project.model.PreferredGenreId;
import com.backend.project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PreferredGenreRepository extends JpaRepository<PreferredGenre, PreferredGenreId> {
  Optional<List<PreferredGenre>> findPreferredGenresByUid(User user);

  Optional<PreferredGenre> findPreferredGenreByUidAndGid(User user, Genre genre);

}