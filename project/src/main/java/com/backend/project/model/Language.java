package com.backend.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "languages")
public class Language {
  @Id
  @Column(name = "iso_639_1", nullable = false, length = 10)
  private String id;

  @Column(name = "english_name", length = 100)
  private String englishName;

  @Column(name = "name", length = 100)
  private String name;

  @ManyToMany
  @JsonIgnore
  @JoinTable(name = "media_languages",
      joinColumns = @JoinColumn(name = "iso_639_1"),
      inverseJoinColumns = @JoinColumn(name = "mid"))
  private Set<Media> media = new LinkedHashSet<>();

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getEnglishName() {
    return englishName;
  }

  public void setEnglishName(String englishName) {
    this.englishName = englishName;
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