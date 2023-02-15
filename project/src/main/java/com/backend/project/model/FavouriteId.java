package com.backend.project.model;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class FavouriteId implements Serializable {
  private static final long serialVersionUID = -7231660443660037943L;
  @Column(name = "mid", nullable = false)
  private Integer mid;

  @Column(name = "uid", nullable = false)
  private Integer uid;

  public Integer getMid() {
    return mid;
  }

  public void setMid(Integer mid) {
    this.mid = mid;
  }

  public Integer getUid() {
    return uid;
  }

  public void setUid(Integer uid) {
    this.uid = uid;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    FavouriteId entity = (FavouriteId) o;
    return Objects.equals(this.uid, entity.uid) &&
        Objects.equals(this.mid, entity.mid);
  }

  @Override
  public int hashCode() {
    return Objects.hash(uid, mid);
  }

}