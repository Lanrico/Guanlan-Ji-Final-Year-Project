package com.backend.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "interest_score")
public class InterestScore {
  @EmbeddedId
  private InterestScoreId id;

  @MapsId("mid")
  @JsonIgnore
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "mid", nullable = false)
  private Media mid;

  @MapsId("uid")
  @JsonIgnore
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "uid", nullable = false)
  private User uid;

  @Column(name = "score")
  private Double score;


  public InterestScore(User user, Media media, double interestScore) {
    this.id = new InterestScoreId(user.getId(), media.getId());
    this.uid = user;
    this.mid = media;
    this.score = interestScore;
  }

  public InterestScore() {

  }
}