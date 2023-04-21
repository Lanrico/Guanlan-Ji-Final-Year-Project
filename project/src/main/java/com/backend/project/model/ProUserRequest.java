package com.backend.project.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "pro_user_request")
public class ProUserRequest {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "uid")
  private User uid;

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