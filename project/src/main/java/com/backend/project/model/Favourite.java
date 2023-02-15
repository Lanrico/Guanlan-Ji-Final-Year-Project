package com.backend.project.model;

import javax.persistence.*;

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
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "uid", nullable = false)
  private User uid;

  @Column(name = "`describe`", length = 1000)
  private String describe;

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

}