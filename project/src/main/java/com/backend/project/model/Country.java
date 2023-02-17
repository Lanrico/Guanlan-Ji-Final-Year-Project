package com.backend.project.model;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "countries")
public class Country {
  @Id
  @Column(name = "iso_3166_1", nullable = false, length = 10)
  private String id;

  @Column(name = "english_name", length = 100)
  private String englishName;

  @ManyToMany
  @JoinTable(name = "media_countries",
      joinColumns = @JoinColumn(name = "iso_3166_1"),
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

  public Set<Media> getMedia() {
    return media;
  }

  public void setMedia(Set<Media> media) {
    this.media = media;
  }

}