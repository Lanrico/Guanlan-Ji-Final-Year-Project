package com.backend.project.repository;

import java.util.List;
import java.util.Optional;

import com.backend.project.model.Genre;
import com.backend.project.model.Media;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.Nullable;

public interface MediaRepository extends JpaRepository<Media, Integer>, JpaSpecificationExecutor {
  Optional<Media> findById(int id);

  Optional<Media> findByMovieTmdbId(int tmdb_id);

//  Page<Media> findAllByType(Pageable pageable, String type, Specification<Media> spec);
  Page<Media> findAll(Pageable pageable);
  List<Media> findAllByType(Pageable pageable, String type);

  @Query("SELECT COUNT(m) FROM Media m WHERE m.finalRate > :finalRate")
  int getMediaRank(@Param("finalRate") double finalRate);
  @Query("SELECT AVG(e.finalRate) FROM Media e")
  Double findRateAverage();
  @Query("SELECT AVG(e.voteCount + e.finalVoteCount) FROM Media e")
  Double findVoteCountAverage();

  Page<Media> findByMovieTitleContaining(String title, Pageable pageable);

  List<Media> findTop20ByOrderByPopularityDesc();

  List<Media> findTop20ByOrderByFinalRateDesc();

  List<Media> findTop20ByGenresContainingOrderByFinalRateDesc(Genre genre);

  List<Media> findTop20ByOrderByFinalPopularityDesc();
}