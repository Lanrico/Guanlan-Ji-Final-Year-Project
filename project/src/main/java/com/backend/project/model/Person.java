package com.backend.project.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "people")
public class Person {
  @Id
  @Column(name = "id", nullable = false)
  private Integer id;

  @Column(name = "tmdb_id")
  private Integer tmdbId;

  @Column(name = "birthday")
  private LocalDate birthday;

  @Column(name = "deathday")
  private LocalDate deathday;

  @Column(name = "known_for_department", length = 100)
  private String knownForDepartment;

  @Column(name = "name", length = 100)
  private String name;

  @Column(name = "gender")
  private Integer gender;

  @Column(name = "biography", length = 10000)
  private String biography;

  @Column(name = "popularity")
  private Double popularity;

  @Column(name = "place_of_birth", length = 1000)
  private String placeOfBirth;

  @Column(name = "profile_path", length = 1000)
  private String profilePath;

  @Column(name = "imdb_id", length = 100)
  private String imdbId;

  @Column(name = "homepage", length = 100)
  private String homepage;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getTmdbId() {
    return tmdbId;
  }

  public void setTmdbId(Integer tmdbId) {
    this.tmdbId = tmdbId;
  }

  public LocalDate getBirthday() {
    return birthday;
  }

  public void setBirthday(LocalDate birthday) {
    this.birthday = birthday;
  }

  public LocalDate getDeathday() {
    return deathday;
  }

  public void setDeathday(LocalDate deathday) {
    this.deathday = deathday;
  }

  public String getKnownForDepartment() {
    return knownForDepartment;
  }

  public void setKnownForDepartment(String knownForDepartment) {
    this.knownForDepartment = knownForDepartment;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getGender() {
    return gender;
  }

  public void setGender(Integer gender) {
    this.gender = gender;
  }

  public String getBiography() {
    return biography;
  }

  public void setBiography(String biography) {
    this.biography = biography;
  }

  public Double getPopularity() {
    return popularity;
  }

  public void setPopularity(Double popularity) {
    this.popularity = popularity;
  }

  public String getPlaceOfBirth() {
    return placeOfBirth;
  }

  public void setPlaceOfBirth(String placeOfBirth) {
    this.placeOfBirth = placeOfBirth;
  }

  public String getProfilePath() {
    return profilePath;
  }

  public void setProfilePath(String profilePath) {
    this.profilePath = profilePath;
  }

  public String getImdbId() {
    return imdbId;
  }

  public void setImdbId(String imdbId) {
    this.imdbId = imdbId;
  }

  public String getHomepage() {
    return homepage;
  }

  public void setHomepage(String homepage) {
    this.homepage = homepage;
  }

}