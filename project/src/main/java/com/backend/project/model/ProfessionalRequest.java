package com.backend.project.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "professional_request")
public class ProfessionalRequest {
  @Id
  @Column(name = "uid", nullable = false)
  private Integer id;

  @MapsId
  @OneToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "uid", nullable = false)
  private User users;

  @Column(name = "company", length = 1000)
  private String company;

  @Column(name = "job", length = 1000)
  private String job;

  @Column(name = "description", length = 10000)
  private String description;

  @Column(name = "time")
  private Instant time;

  @Column(name = "status")
  private Boolean status;

}