package com.backend.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "favourite")
public class Favourite {
  @EmbeddedId
  private FavouriteId id;

  @MapsId("mid")
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "mid", nullable = false)
  private Media mid;

  @MapsId("uid")
  @JsonIgnore
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "uid", nullable = false)
  private User uid;

  @Column(name = "`describe`", length = 1000)
  private String describe;

  @Column(name = "time", nullable = false)
  private Instant time;

  public FavouriteId getId() {
    return id;
  }

  public void setId(FavouriteId id) {
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

  public String getDescribe() {
    return describe;
  }

  public void setDescribe(String describe) {
    this.describe = describe;
  }

  public Instant getTime() {
    return time;
  }

  public void setTime(Instant time) {
    this.time = time;
  }

}