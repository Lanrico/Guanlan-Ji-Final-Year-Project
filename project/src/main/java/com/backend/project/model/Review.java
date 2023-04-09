package com.backend.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "review")
public class Review {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ID", nullable = false)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "uid", nullable = false)
  private User uid;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "mid", nullable = false)
  private Media mid;

  @Column(name = "rate")
  private Double rate;

  @Column(name = "isRecommend")
  private Boolean isRecommend;

  @Column(name = "content", length = 10000)
  private String content;

  @Column(name = "time", nullable = false)
  private Instant time;

  @Column(name = "isAudited", nullable = false)
  private Boolean isAudited = false;

  @Column(name = "`like`")
  private Integer like;

  @Column(name = "dislike")
  private Integer dislike;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
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

  public Double getRate() {
    return rate;
  }

  public void setRate(Double rate) {
    this.rate = rate;
  }

  public Boolean getIsRecommend() {
    return isRecommend;
  }

  public void setIsRecommend(Boolean isRecommend) {
    this.isRecommend = isRecommend;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Instant getTime() {
    return time;
  }

  public void setTime(Instant time) {
    this.time = time;
  }

  public Boolean getIsAudited() {
    return isAudited;
  }

  public void setIsAudited(Boolean isAudited) {
    this.isAudited = isAudited;
  }

  public Integer getLike() {
    return like;
  }

  public void setLike(Integer like) {
    this.like = like;
  }

  public Integer getDislike() {
    return dislike;
  }

  public void setDislike(Integer dislike) {
    this.dislike = dislike;
  }

}