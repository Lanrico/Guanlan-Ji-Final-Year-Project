package com.backend.project.repository;

import com.backend.project.model.ProUserRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProUserRequestRepository extends JpaRepository<ProUserRequest, Integer> {
}