package com.backend.project.repository;

import com.backend.project.model.ProUserRequest;
import com.backend.project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProUserRequestRepository extends JpaRepository<ProUserRequest, Integer> {
  Optional<ProUserRequest> findByUid(User uid);
}