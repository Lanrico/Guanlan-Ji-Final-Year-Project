package com.backend.project.model;

import javax.persistence.*;

@Entity
@Table(name = "recommendation")
public class Recommendation {
  @EmbeddedId
  private RecommendationId id;

  @MapsId("mid")
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "mid", nullable = false)
  private Media mid;

  @MapsId("uid")
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "uid", nullable = false)
  private User uid;

  public RecommendationId getId() {
    return id;
  }

  public void setId(RecommendationId id) {
    this.id = id;
  }

  public Media getMid() {
    return mid;
  }

  public void setMid(Media mid) {
    this.mid = mid;
  }

  public User getUid() {
    return uid;
  }

  public void setUid(User uid) {
    this.uid = uid;
  }

}