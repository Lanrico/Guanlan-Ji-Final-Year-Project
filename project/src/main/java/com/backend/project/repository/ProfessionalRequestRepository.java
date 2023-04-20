package com.backend.project.repository;

import com.backend.project.model.ProfessionalRequest;
import com.backend.project.model.ProfessionalRequestId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessionalRequestRepository extends JpaRepository<ProfessionalRequest, ProfessionalRequestId> {
}