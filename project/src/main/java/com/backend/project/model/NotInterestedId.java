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
public class NotInterestedId implements Serializable {
  public NotInterestedId() {
  }
  public NotInterestedId(Integer uid, Integer mid) {
    this.uid = uid;
    this.mid = mid;
  }
  private static final long serialVersionUID = -5132813463053532755L;
  @Column(name = "uid", nullable = false)
  private Integer uid;

  @Column(name = "mid", nullable = false)
  private Integer mid;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    NotInterestedId entity = (NotInterestedId) o;
    return Objects.equals(this.uid, entity.uid) &&
        Objects.equals(this.mid, entity.mid);
  }

  @Override
  public int hashCode() {
    return Objects.hash(uid, mid);
  }

}