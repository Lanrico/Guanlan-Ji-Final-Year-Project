package com.backend.project.model;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "discuss_group")
public class DiscussGroup {
  @Id
  @Column(name = "mid", nullable = false)
  private Integer id;

  @MapsId
  @OneToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "mid", nullable = false)
  private Media media;

  @Column(name = "`describe`", length = 1000)
  private String describe;

  @OneToMany(mappedBy = "gid")
  private Set<Discuss> discusses = new LinkedHashSet<>();

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Media getMedia() {
    return media;
  }

  public void setMedia(Media media) {
    this.media = media;
  }

  public String getDescribe() {
    return describe;
  }

  public void setDescribe(String describe) {
    this.describe = describe;
  }

  public Set<Discuss> getDiscusses() {
    return discusses;
  }

  public void setDiscusses(Set<Discuss> discusses) {
    this.discusses = discusses;
  }

}