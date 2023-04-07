package com.backend.project.model;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class HistoryId implements Serializable {
  public HistoryId(Integer mid, Integer uid) {
    this.mid = mid;
    this.uid = uid;
  }
  public HistoryId() {

  }
  private static final long serialVersionUID = 1128300342533005769L;
  @Column(name = "uid", nullable = false)
  private Integer uid;

  @Column(name = "mid", nullable = false)
  private Integer mid;

  public Integer getUid() {
    return uid;
  }

  public void setUid(Integer uid) {
    this.uid = uid;
  }

  public Integer getMid() {
    return mid;
  }

  public void setMid(Integer mid) {
    this.mid = mid;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    HistoryId entity = (HistoryId) o;
    return Objects.equals(this.uid, entity.uid) &&
        Objects.equals(this.mid, entity.mid);
  }

  @Override
  public int hashCode() {
    return Objects.hash(uid, mid);
  }

}