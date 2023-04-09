package com.backend.project.repository;

import com.backend.project.model.Favourite;
import com.backend.project.model.FavouriteId;
import com.backend.project.model.Media;
import com.backend.project.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FavouriteRepository extends JpaRepository<Favourite, FavouriteId> {
  // find all favourite by user id
  Page<Favourite> findByUid(User uid, Pageable pageable);
  List<Favourite> findByUidOrderByTimeDesc(User uid);
  Optional<Favourite> findByUidAndMid(User uid, Media mid);

  Optional<List<Favourite>> findFavouritesByUid(User user);
}