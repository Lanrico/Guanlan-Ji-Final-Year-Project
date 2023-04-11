package com.backend.project.repository;

import com.backend.project.model.Media;
import com.backend.project.model.Recommendation;
import com.backend.project.model.RecommendationId;
import com.backend.project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecommendationRepository extends JpaRepository<Recommendation, RecommendationId> {
  Optional<List<Recommendation>> findMediasByUid(User user);

  void deleteRecommendationsByUid(User user);

  Optional<Recommendation> findByUidAndMid(User user, Media media);
}