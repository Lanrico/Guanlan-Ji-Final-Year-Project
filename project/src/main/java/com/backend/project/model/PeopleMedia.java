package com.backend.project.model;

import javax.persistence.*;

@Entity
@Table(name = "people_media")
public class PeopleMedia {
  @EmbeddedId
  private PeopleMediaId id;

  @MapsId("pid")
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "pid", nullable = false)
  private Person pid;

  @MapsId("mid")
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "mid", nullable = false)
  private Media mid;

  @Column(name = "job", length = 100)
  private String job;

  public PeopleMediaId getId() {
    return id;
  }

  public void setId(PeopleMediaId id) {
    this.id = id;
  }

  public Person getPid() {
    return pid;
  }

  public void setPid(Person pid) {
    this.pid = pid;
  }

  public Media getMid() {
    return mid;
  }

  public void setMid(Media mid) {
    this.mid = mid;
  }

  public String getJob() {
    return job;
  }

  public void setJob(String job) {
    this.job = job;
  }

}