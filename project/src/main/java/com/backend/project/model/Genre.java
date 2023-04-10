package com.backend.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "genres")
public class Genre {
  @Id
  @Column(name = "id", nullable = false)
  private Integer id;

  @Column(name = "name", nullable = false, length = 100)
  private String name;

  @ManyToMany
  @JsonIgnore
  @JoinTable(name = "media_genre",
      joinColumns = @JoinColumn(name = "gid"),
      inverseJoinColumns = @JoinColumn(name = "mid"))
  private Set<Media> media = new LinkedHashSet<>();

  @ManyToMany
  @JsonIgnore
  @JoinTable(name = "preferred_genre",
      joinColumns = @JoinColumn(name = "gid"),
      inverseJoinColumns = @JoinColumn(name = "uid"))
  private Set<User> users = new LinkedHashSet<>();

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