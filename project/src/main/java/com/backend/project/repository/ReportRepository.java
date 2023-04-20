package com.backend.project.repository;

import com.backend.project.model.Report;
import com.backend.project.model.Review;
import com.backend.project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Integer> {
  Optional<Report> findByUidAndRid(User uid, Review rid);

  void deleteByUidAndRid(User user, Review review);

  void deleteAllByRid(Review review);

  void deleteByRid(Review review);
}