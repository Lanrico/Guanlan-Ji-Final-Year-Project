package com.backend.project.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "movies")
public class Movie {
  @Id
  @Column(name = "media_id", nullable = false)
  private Integer id;

  @MapsId
  @OneToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "media_id", nullable = false)
  private Media media;

  @Column(name = "overview", length = 2550)
  private String overview;

  @Column(name = "release_date")
  private LocalDate releaseDate;

  @Column(name = "title", nullable = false)
  private String title;

  @Column(name = "poster_path")
  private String posterPath;

  @Column(name = "adult", nullable = false)
  private Boolean adult = false;

  @Column(name = "belongs_to_collection")
  private String belongsToCollection;

  @Column(name = "budget", nullable = false)
  private Integer budget;

  @Column(name = "homepage")
  private String homepage;

  @Column(name = "imdb_id")
  private Integer imdbId;

  @Column(name = "original_language")
  private String originalLanguage;

  @Column(name = "original_title")
  private String originalTitle;

  @Column(name = "popularity")
  private Double popularity;

  @Column(name = "revenue")
  private Integer revenue;

  @Column(name = "runtime")
  private Integer runtime;

  @Column(name = "status")
  private String status;

  @Column(name = "tagline")
  private String tagline;

  @Column(name = "video", nullable = false)
  private Boolean video = false;

  @Column(name = "vote_average")
  private Double voteAverage;

  @Column(name = "vote_count")
  private Integer voteCount;

  @Column(name = "genres", length = 1073741824)
  private String genres;

  @Column(name = "production_companies", length = 1073741824)
  private String productionCompanies;

  @Column(name = "production_countries", length = 1073741824)
  private String productionCountries;

  @Column(name = "spoken_languages")
  private Integer spokenLanguages;

  @Column(name = "tmdb_id")
  private Integer tmdbId;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Media getMedia() {
    return media;
  }

  public void setMedia(Media media) {
    this.media = media;
  }

  public String getOverview() {
    return overview;
  }

  public void setOverview(String overview) {
    this.overview = overview;
  }

  public LocalDate getReleaseDate() {
    return releaseDate;
  }

  public void setReleaseDate(LocalDate releaseDate) {
    this.releaseDate = releaseDate;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getPosterPath() {
    return posterPath;
  }

  public void setPosterPath(String posterPath) {
    this.posterPath = posterPath;
  }

  public Boolean getAdult() {
    return adult;
  }

  public void setAdult(Boolean adult) {
    this.adult = adult;
  }

  public String getBelongsToCollection() {
    return belongsToCollection;
  }

  public void setBelongsToCollection(String belongsToCollection) {
    this.belongsToCollection = belongsToCollection;
  }

  public Integer getBudget() {
    return budget;
  }

  public void setBudget(Integer budget) {
    this.budget = budget;
  }

  public String getHomepage() {
    return homepage;
  }

  public void setHomepage(String homepage) {
    this.homepage = homepage;
  }

  public Integer getImdbId() {
    return imdbId;
  }

  public void setImdbId(Integer imdbId) {
    this.imdbId = imdbId;
  }

  public String getOriginalLanguage() {
    return originalLanguage;
  }

  public void setOriginalLanguage(String originalLanguage) {
    this.originalLanguage = originalLanguage;
  }

  public String getOriginalTitle() {
    return originalTitle;
  }

  public void setOriginalTitle(String originalTitle) {
    this.originalTitle = originalTitle;
  }

  public Double getPopularity() {
    return popularity;
  }

  public void setPopularity(Double popularity) {
    this.popularity = popularity;
  }

  public Integer getRevenue() {
    return revenue;
  }

  public void setRevenue(Integer revenue) {
    this.revenue = revenue;
  }

  public Integer getRuntime() {
    return runtime;
  }

  public void setRuntime(Integer runtime) {
    this.runtime = runtime;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getTagline() {
    return tagline;
  }

  public void setTagline(String tagline) {
    this.tagline = tagline;
  }

  public Boolean getVideo() {
    return video;
  }

  public void setVideo(Boolean video) {
    this.video = video;
  }

  public Double getVoteAverage() {
    return voteAverage;
  }

  public void setVoteAverage(Double voteAverage) {
    this.voteAverage = voteAverage;
  }

  public Integer getVoteCount() {
    return voteCount;
  }

  public void setVoteCount(Integer voteCount) {
    this.voteCount = voteCount;
  }

  public String getGenres() {
    return genres;
  }

  public void setGenres(String genres) {
    this.genres = genres;
  }

  public String getProductionCompanies() {
    return productionCompanies;
  }

  public void setProductionCompanies(String productionCompanies) {
    this.productionCompanies = productionCompanies;
  }

  public String getProductionCountries() {
    return productionCountries;
  }

  public void setProductionCountries(String productionCountries) {
    this.productionCountries = productionCountries;
  }

  public Integer getSpokenLanguages() {
    return spokenLanguages;
  }

  public void setSpokenLanguages(Integer spokenLanguages) {
    this.spokenLanguages = spokenLanguages;
  }

  public Integer getTmdbId() {
    return tmdbId;
  }

  public void setTmdbId(Integer tmdbId) {
    this.tmdbId = tmdbId;
  }

}