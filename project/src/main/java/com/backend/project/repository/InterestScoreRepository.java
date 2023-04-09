package com.backend.project.repository;

import com.backend.project.model.InterestScore;
import com.backend.project.model.InterestScoreId;
import com.backend.project.model.Media;
import com.backend.project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterestScoreRepository extends JpaRepository<InterestScore, InterestScoreId> {
  boolean existsByUidAndMid(User user, Media media);

  InterestScore findByUidAndMid(User user, Media media);
  // find top 10 interest score by user id
  List<InterestScore> findTop10ByUidOrderByScoreDesc(User uid);

  List<InterestScore> findTop10ByUidAndScoreBeforeOrderByScoreAsc(User uid, Double score);
}