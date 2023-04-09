package com.backend.project.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class InterestScoreId implements Serializable {
  private static final long serialVersionUID = -5020392959175085938L;
  public InterestScoreId(Integer uid, Integer mid) {
    this.mid = mid;
    this.uid = uid;
  }

  public InterestScoreId() {
  }

  @Column(name = "mid", nullable = false)
  private Integer mid;

  @Column(name = "uid", nullable = false)
  private Integer uid;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    InterestScoreId entity = (InterestScoreId) o;
    return Objects.equals(this.uid, entity.uid) &&
        Objects.equals(this.mid, entity.mid);
  }

  @Override
  public int hashCode() {
    return Objects.hash(uid, mid);
  }

}