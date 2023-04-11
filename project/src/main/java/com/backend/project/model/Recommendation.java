package com.backend.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "recommendation")
public class Recommendation {
  public Recommendation() {
  }
  public Recommendation(User user, Media media) {
    this.id = new RecommendationId(user.getId(), media.getId());
    this.uid = user;
    this.mid = media;
  }

  @EmbeddedId
  private RecommendationId id;

  @MapsId("mid")
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "mid", nullable = false)
  @JsonIgnore
  private Media mid;

  @MapsId("uid")
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "uid", nullable = false)
  @JsonIgnore
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