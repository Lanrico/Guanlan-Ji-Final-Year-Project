package com.backend.project.model;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "discuss")
public class Discuss {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "uid", nullable = false)
  private User uid;

  @Column(name = "content", nullable = false, length = 10000)
  private String content;

  @Column(name = "time", nullable = false)
  private Instant time;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "gid", nullable = false)
  private DiscussGroup gid;

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

  public DiscussGroup getGid() {
    return gid;
  }

  public void setGid(DiscussGroup gid) {
    this.gid = gid;
  }

}