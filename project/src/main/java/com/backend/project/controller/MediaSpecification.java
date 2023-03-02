package com.backend.project.controller;

import com.backend.project.model.Media;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestParam;

import javax.persistence.criteria.Predicate;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MediaSpecification {
  public static Specification<Media> findMovieByCriteria(
      List<Integer> genres,
      LocalDate startDate,
      LocalDate endDate,
      String language,
      Double minRate,
      Double maxRate,
      Integer minRuntime,
      Integer maxRuntime,
      String typeCode
  ) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      if (genres != null && !genres.isEmpty()) {
        for (Integer g:genres) {
          predicates.add(criteriaBuilder.isMember(g, root.get("genres")));
        }
      }
      if (startDate != null) {
        predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("movie").get("releaseDate"), startDate));
      }
      if (endDate != null) {
        predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("movie").get("releaseDate"), endDate));
      }
      if (StringUtils.hasText(language)) {
        predicates.add(criteriaBuilder.equal(root.get("originalLanguage"), language));
      }
      if (minRate != null && maxRate != null) {
        predicates.add(criteriaBuilder.between(root.get("rate"), minRate, maxRate));
      }
      if (minRuntime != null && maxRuntime != null) {
        predicates.add(criteriaBuilder.between(root.get("movie").get("runtime"), minRuntime, maxRuntime));
      }
      if (typeCode != null) {
        predicates.add(criteriaBuilder.equal(root.get("type"), typeCode));
      }
      return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    };
  }
}
