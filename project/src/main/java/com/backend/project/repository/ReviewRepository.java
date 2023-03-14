package com.backend.project.repository;

import com.backend.project.model.Media;
import com.backend.project.model.Review;
import com.backend.project.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
  Page<Review> getReviewsByMidAndUidType(Media media, Integer type, Pageable pageable);
  Optional<Review> findReviewByMidAndUid(Media media, User user);
}