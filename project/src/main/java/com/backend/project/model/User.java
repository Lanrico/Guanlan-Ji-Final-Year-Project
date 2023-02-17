package com.backend.project.model;

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

  @Column(name = "password", nullable = false, length = 20)
  private String password;

  @Column(name = "email", nullable = false, length = 20)
  private String email;

  @Column(name = "type", nullable = false)
  private Integer type;

  @Column(name = "phone", length = 20)
  private String phone;

  @Column(name = "country", length = 100)
  private String country;

  @Column(name = "birthday")
  private LocalDate birthday;

  @ManyToMany
  @JoinTable(name = "recommendation",
      joinColumns = @JoinColumn(name = "uid"),
      inverseJoinColumns = @JoinColumn(name = "mid"))
  private Set<Media> media = new LinkedHashSet<>();

  @OneToMany(mappedBy = "uid")
  private Set<Favourite> favourites = new LinkedHashSet<>();

  @OneToMany(mappedBy = "uid")
  private Set<Discuss> discusses = new LinkedHashSet<>();

  @OneToMany(mappedBy = "uid")
  private Set<ProfessionalRequest> professionalRequests = new LinkedHashSet<>();

  @OneToMany(mappedBy = "uid")
  private Set<Review> reviews = new LinkedHashSet<>();

  @OneToMany(mappedBy = "uid")
  private Set<History> histories = new LinkedHashSet<>();

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

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
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

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public LocalDate getBirthday() {
    return birthday;
  }

  public void setBirthday(LocalDate birthday) {
    this.birthday = birthday;
  }

  public Set<Media> getMedia() {
    return media;
  }

  public void setMedia(Set<Media> media) {
    this.media = media;
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

  public Set<ProfessionalRequest> getProfessionalRequests() {
    return professionalRequests;
  }

  public void setProfessionalRequests(Set<ProfessionalRequest> professionalRequests) {
    this.professionalRequests = professionalRequests;
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

}