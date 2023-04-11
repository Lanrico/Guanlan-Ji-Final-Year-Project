package com.backend.project.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "not_interested")
public class NotInterested {
  public NotInterested() {
  }
  public NotInterested(User uid, Media mid) {
    this.id = new NotInterestedId(uid.getId(), mid.getId());
    this.uid = uid;
    this.mid = mid;
    this.time = Instant.now();
  }

  @EmbeddedId
  private NotInterestedId id;

  @MapsId("uid")
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "uid", nullable = false)
  private User uid;

  @MapsId("mid")
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "mid", nullable = false)
  private Media mid;

  @Column(name = "time")
  private Instant time;

}