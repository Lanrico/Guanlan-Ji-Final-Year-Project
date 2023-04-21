package com.backend.project.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "report")
public class Report {
  @EmbeddedId
  private ReportId id;

  @MapsId("uid")
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "uid", nullable = false)
  private User uid;

  @MapsId("rid")
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "rid", nullable = false)
  private Review rid;

  @Column(name = "reason", length = 10000)
  private String reason;

  @Column(name = "review_result")
  private Boolean reviewResult;

  @Column(name = "time")
  private Instant time;

}