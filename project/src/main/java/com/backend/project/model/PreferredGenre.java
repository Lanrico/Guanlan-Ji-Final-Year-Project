package com.backend.project.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "preferred_genre")
public class PreferredGenre {
  @EmbeddedId
  private PreferredGenreId id;

  @MapsId("uid")
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "uid", nullable = false)
  private User uid;

  @MapsId("gid")
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "gid", nullable = false)
  private Genre gid;

  public PreferredGenre() {
  }
  public PreferredGenre(User user, Genre genre) {
    this.id = new PreferredGenreId(user.getId(), genre.getId());
    this.uid = user;
    this.gid = genre;
  }

}