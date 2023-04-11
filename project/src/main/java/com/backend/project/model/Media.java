package com.backend.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "media")
public class Media {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Integer id;

  @Column(name = "type", nullable = false, length = 1)
  private String type;

  @Column(name = "rate")
  private Double rate;

  @Column(name = "vote_count")
  private Integer voteCount;

  @Column(name = "recommend")
  private Integer recommend;

  @Column(name = "unrecommend")
  private Integer unrecommend;

  @Column(name = "original_language", length = 100)
  private String originalLanguage;

  @Column(name = "popularity")
  private Double popularity;

  @OneToMany(mappedBy = "mid")
  private Set<PeopleMedia> peopleMedia = new LinkedHashSet<>();

  @ManyToMany
  @JsonIgnore
  @JoinTable(name = "recommendation",
      joinColumns = @JoinColumn(name = "mid"),
      inverseJoinColumns = @JoinColumn(name = "uid"))
  private Set<User> users = new LinkedHashSet<>();

  @ManyToMany
  @JoinTable(name = "media_collections",
      joinColumns = @JoinColumn(name = "mid"),
      inverseJoinColumns = @JoinColumn(name = "cid"))
  private Set<Collection> collections = new LinkedHashSet<>();

  @OneToMany(mappedBy = "mid")
  @JsonIgnore
  private Set<Favourite> favourites = new LinkedHashSet<>();

  @ManyToMany
  @JoinTable(name = "media_countries",
      joinColumns = @JoinColumn(name = "mid"),
      inverseJoinColumns = @JoinColumn(name = "iso_3166_1"))
  private Set<Country> countries = new LinkedHashSet<>();

  @OneToOne(mappedBy = "media")
//  @JsonIgnore
  private Movie movie;

  @ManyToMany
  @JoinTable(name = "media_languages",
      joinColumns = @JoinColumn(name = "mid"),
      inverseJoinColumns = @JoinColumn(name = "iso_639_1"))
  private Set<Language> languages = new LinkedHashSet<>();

  @ManyToMany
  @JoinTable(name = "media_companies",
      joinColumns = @JoinColumn(name = "mid"),
      inverseJoinColumns = @JoinColumn(name = "cid"))
  private Set<Company> companies = new LinkedHashSet<>();

  @OneToMany(mappedBy = "mid")
  private Set<Review> reviews = new LinkedHashSet<>();

  @ManyToMany
  @JoinTable(name = "media_genre",
      joinColumns = @JoinColumn(name = "mid"),
      inverseJoinColumns = @JoinColumn(name = "gid"))
  private Set<Genre> genres = new LinkedHashSet<>();

  @OneToOne(mappedBy = "media")
  private DiscussGroup discussGroup;

  @OneToMany(mappedBy = "mid")
  @JsonIgnore
  private Set<History> histories = new LinkedHashSet<>();

  @Column(name = "final_rate")
  private Double finalRate;

  @Column(name = "final_vote_count")
  private Integer finalVoteCount;

  public Integer getFinalVoteCount() {
    return finalVoteCount;
  }

  public void setFinalVoteCount(Integer finalVoteCount) {
    this.finalVoteCount = finalVoteCount;
  }

  public Double getFinalRate() {
    return finalRate;
  }

  public void setFinalRate(Double finalRate) {
    this.finalRate = finalRate;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Double getRate() {
    return rate;
  }

  public void setRate(Double rate) {
    this.rate = rate;
  }

  public Integer getVoteCount() {
    return voteCount;
  }

  public void setVoteCount(Integer voteCount) {
    this.voteCount = voteCount;
  }

  public Integer getRecommend() {
    return recommend;
  }

  public void setRecommend(Integer recommend) {
    this.recommend = recommend;
  }

  public Integer getUnrecommend() {
    return unrecommend;
  }

  public void setUnrecommend(Integer unrecommend) {
    this.unrecommend = unrecommend;
  }

  public String getOriginalLanguage() {
    return originalLanguage;
  }

  public void setOriginalLanguage(String originalLanguage) {
    this.originalLanguage = originalLanguage;
  }

  public Double getPopularity() {
    return popularity;
  }

  public void setPopularity(Double popularity) {
    this.popularity = popularity;
  }

  public Set<PeopleMedia> getPeopleMedia() {
    return peopleMedia;
  }

  public void setPeopleMedia(Set<PeopleMedia> peopleMedia) {
    this.peopleMedia = peopleMedia;
  }

  public Set<User> getUsers() {
    return users;
  }

  public void setUsers(Set<User> users) {
    this.users = users;
  }

  public Set<Collection> getCollections() {
    return collections;
  }

  public void setCollections(Set<Collection> collections) {
    this.collections = collections;
  }

  public Set<Favourite> getFavourites() {
    return favourites;
  }

  public void setFavourites(Set<Favourite> favourites) {
    this.favourites = favourites;
  }

  public Set<Country> getCountries() {
    return countries;
  }

  public void setCountries(Set<Country> countries) {
    this.countries = countries;
  }

  public Movie getMovie() {
    return movie;
  }

  public void setMovie(Movie movie) {
    this.movie = movie;
  }

  public Set<Language> getLanguages() {
    return languages;
  }

  public void setLanguages(Set<Language> languages) {
    this.languages = languages;
  }

  public Set<Company> getCompanies() {
    return companies;
  }

  public void setCompanies(Set<Company> companies) {
    this.companies = companies;
  }

  public Set<Review> getReviews() {
    return reviews;
  }

  public void setReviews(Set<Review> reviews) {
    this.reviews = reviews;
  }

  public Set<Genre> getGenres() {
    return genres;
  }

  public void setGenres(Set<Genre> genres) {
    this.genres = genres;
  }

  public DiscussGroup getDiscussGroup() {
    return discussGroup;
  }

  public void setDiscussGroup(DiscussGroup discussGroup) {
    this.discussGroup = discussGroup;
  }

  public Set<History> getHistories() {
    return histories;
  }

  public void setHistories(Set<History> histories) {
    this.histories = histories;
  }

}