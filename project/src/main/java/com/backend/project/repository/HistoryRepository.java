package com.backend.project.repository;

import com.backend.project.model.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HistoryRepository extends JpaRepository<History, HistoryId> {

  Page<History> findByUid(User uid, Pageable pageable);
  List<History> findByUid(User uid);
  Optional<History> findByUidAndMid(User uid, Media mid);
  List<History> findHistoryRecordsByUidOrderByTimeAsc(User userId);

  Optional<List<History>> findHistoriesByUid(User user);
}