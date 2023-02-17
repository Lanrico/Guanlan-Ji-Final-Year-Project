package com.backend.project.model;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PeopleMediaId implements Serializable {
  private static final long serialVersionUID = 6854717879552611569L;
  @Column(name = "pid", nullable = false)
  private Integer pid;

  @Column(name = "mid", nullable = false)
  private Integer mid;

  public Integer getPid() {
    return pid;
  }

  public void setPid(Integer pid) {
    this.pid = pid;
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
    PeopleMediaId entity = (PeopleMediaId) o;
    return Objects.equals(this.mid, entity.mid) &&
        Objects.equals(this.pid, entity.pid);
  }

  @Override
  public int hashCode() {
    return Objects.hash(mid, pid);
  }

}