package com.backend.project.model;

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

  @OneToMany(mappedBy = "mid")
  private Set<Favourite> favourites = new LinkedHashSet<>();

  @OneToOne(mappedBy = "media")
  private Movie movie;

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

  public Set<Favourite> getFavourites() {
    return favourites;
  }

  public void setFavourites(Set<Favourite> favourites) {
    this.favourites = favourites;
  }

  public Movie getMovie() {
    return movie;
  }

  public void setMovie(Movie movie) {
    this.movie = movie;
  }

}