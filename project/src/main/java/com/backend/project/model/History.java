package com.backend.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "history")
public class History {
  @EmbeddedId
  private HistoryId id;

  @MapsId("uid")
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "uid", nullable = false)
  @JsonIgnore
  private User uid;

  @MapsId("mid")
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "mid", nullable = false)
  private Media mid;

  @Column(name = "type", length = 20)
  private String type;

  @Column(name = "time", nullable = false)
  private Instant time;

  public HistoryId getId() {
    return id;
  }

  public void setId(HistoryId id) {
    this.id = id;
  }

  public User getUid() {
    return uid;
  }

  public void setUid(User uid) {
    this.uid = uid;
  }

  public Media getMid() {
    return mid;
  }

  public void setMid(Media mid) {
    this.mid = mid;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Instant getTime() {
    return time;
  }

  public void setTime(Instant time) {
    this.time = time;
  }

}