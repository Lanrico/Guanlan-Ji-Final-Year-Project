package com.backend.project.repository;

import com.backend.project.model.Collection;
import com.backend.project.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
  Optional<Company> findByTmdbId(int tmdb_id);

}