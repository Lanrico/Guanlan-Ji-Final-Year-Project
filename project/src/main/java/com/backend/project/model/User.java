package com.backend.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Integer id;

  @Column(name = "name", nullable = false, length = 20)
  private String name;

  @Column(name = "email", nullable = false, length = 200)
  private String email;

  @Column(name = "type", nullable = false)
  private Integer type;

  @Column(name = "phone", length = 20)
  private String phone;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "country")
  private Country country;

  @Column(name = "birthday")
  private LocalDate birthday;

  @OneToMany(mappedBy = "uid")
  private Set<Recommendation> recommendations = new LinkedHashSet<>();

  @OneToMany(mappedBy = "uid")
  private Set<Favourite> favourites = new LinkedHashSet<>();

  @OneToMany(mappedBy = "uid")
  private Set<Discuss> discusses = new LinkedHashSet<>();



  @OneToMany(mappedBy = "uid")
  private Set<Review> reviews = new LinkedHashSet<>();

  @OneToMany(mappedBy = "uid")
  private Set<History> histories = new LinkedHashSet<>();

  @OneToMany(mappedBy = "uid")
  @JsonIgnore
  private Set<InterestScore> interestScores = new LinkedHashSet<>();

  @ManyToMany
  @JoinTable(name = "preferred_genre",
      joinColumns = @JoinColumn(name = "uid"),
      inverseJoinColumns = @JoinColumn(name = "gid"))
  private Set<Genre> genres = new LinkedHashSet<>();

  @OneToMany(mappedBy = "uid")
  private Set<NotInterested> notInteresteds = new LinkedHashSet<>();

  @Column(name = "bio", length = 10000)
  private String bio;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "prefer_language")
  private Language preferLanguage;

  @OneToMany(mappedBy = "uid")
  private Set<Report> reports = new LinkedHashSet<>();


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

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Integer getType() {
    return type;
  }

  public void setType(Integer type) {
    this.type = type;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public Country getCountry() {
    return country;
  }

  public void setCountry(Country country) {
    this.country = country;
  }

  public LocalDate getBirthday() {
    return birthday;
  }

  public void setBirthday(LocalDate birthday) {
    this.birthday = birthday;
  }

  public Set<Recommendation> getRecommendations() {
    return recommendations;
  }

  public void setRecommendations(Set<Recommendation> recommendations) {
    this.recommendations = recommendations;
  }

  public Set<Favourite> getFavourites() {
    return favourites;
  }

  public void setFavourites(Set<Favourite> favourites) {
    this.favourites = favourites;
  }

  public Set<Discuss> getDiscusses() {
    return discusses;
  }

  public void setDiscusses(Set<Discuss> discusses) {
    this.discusses = discusses;
  }

  public Set<Review> getReviews() {
    return reviews;
  }

  public void setReviews(Set<Review> reviews) {
    this.reviews = reviews;
  }

  public Set<History> getHistories() {
    return histories;
  }

  public void setHistories(Set<History> histories) {
    this.histories = histories;
  }

  public String getBio() {
    return bio;
  }

  public void setBio(String bio) {
    this.bio = bio;
  }

  public Language getPreferLanguage() {
    return preferLanguage;
  }

  public void setPreferLanguage(Language preferLanguage) {
    this.preferLanguage = preferLanguage;
  }

  public Set<Genre> getGenres() {
    return genres;
  }

  public void setGenres(Set<Genre> genres) {
    this.genres = genres;
  }
}