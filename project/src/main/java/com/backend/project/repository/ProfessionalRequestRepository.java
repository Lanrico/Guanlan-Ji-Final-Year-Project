package com.backend.project.repository;

import com.backend.project.model.ProfessionalRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessionalRequestRepository extends JpaRepository<ProfessionalRequest, Integer> {
}