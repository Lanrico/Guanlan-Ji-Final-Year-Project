package com.backend.project.model;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "genres")
public class Genre {
  @Id
  @Column(name = "id", nullable = false)
  private Integer id;

  @Column(name = "name", nullable = false, length = 10)
  private String name;

  @ManyToMany
  @JoinTable(name = "media_genre",
      joinColumns = @JoinColumn(name = "gid"),
      inverseJoinColumns = @JoinColumn(name = "mid"))
  private Set<Media> media = new LinkedHashSet<>();

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Set<Media> getMedia() {
    return media;
  }

  public void setMedia(Set<Media> media) {
    this.media = media;
  }

}