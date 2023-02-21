package com.backend.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "collections")
public class Collection {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Integer id;

  @Column(name = "name", nullable = false, length = 1000)
  private String name;

  @Column(name = "poster_path", length = 1000)
  private String posterPath;

  @Column(name = "tmdb_id")
  private Integer tmdbId;

  @Column(name = "overview", length = 10000)
  private String overview;

  @ManyToMany
  @JsonIgnore
  @JoinTable(name = "media_collections",
      joinColumns = @JoinColumn(name = "cid"),
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

  public String getPosterPath() {
    return posterPath;
  }

  public void setPosterPath(String posterPath) {
    this.posterPath = posterPath;
  }

  public Integer getTmdbId() {
    return tmdbId;
  }

  public void setTmdbId(Integer tmdbId) {
    this.tmdbId = tmdbId;
  }

  public String getOverview() {
    return overview;
  }

  public void setOverview(String overview) {
    this.overview = overview;
  }

  public Set<Media> getMedia() {
    return media;
  }

  public void setMedia(Set<Media> media) {
    this.media = media;
  }

}