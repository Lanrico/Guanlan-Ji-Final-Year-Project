package com.backend.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "companies")
public class Company {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Integer id;

  @Column(name = "description", length = 10000)
  private String description;

  @Column(name = "homepage", length = 1000)
  private String homepage;

  @Column(name = "logo_path", length = 100)
  private String logoPath;

  @Column(name = "origin_country", length = 10)
  private String originCountry;

  @Column(name = "parent_company")
  private Integer parentCompany;

  @Column(name = "tmdb_id")
  private Integer tmdbId;

  @Column(name = "headquarters", length = 1000)
  private String headquarters;

  @Column(name = "name", length = 200)
  private String name;

  @ManyToMany
  @JsonIgnore
  @JoinTable(name = "media_companies",
      joinColumns = @JoinColumn(name = "cid"),
      inverseJoinColumns = @JoinColumn(name = "mid"))
  private Set<Media> media = new LinkedHashSet<>();

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getHomepage() {
    return homepage;
  }

  public void setHomepage(String homepage) {
    this.homepage = homepage;
  }

  public String getLogoPath() {
    return logoPath;
  }

  public void setLogoPath(String logoPath) {
    this.logoPath = logoPath;
  }

  public String getOriginCountry() {
    return originCountry;
  }

  public void setOriginCountry(String originCountry) {
    this.originCountry = originCountry;
  }

  public Integer getParentCompany() {
    return parentCompany;
  }

  public void setParentCompany(Integer parentCompany) {
    this.parentCompany = parentCompany;
  }

  public Integer getTmdbId() {
    return tmdbId;
  }

  public void setTmdbId(Integer tmdbId) {
    this.tmdbId = tmdbId;
  }

  public String getHeadquarters() {
    return headquarters;
  }

  public void setHeadquarters(String headquarters) {
    this.headquarters = headquarters;
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