package com.backend.project.model;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ProfessionalRequestId implements Serializable {
  private static final long serialVersionUID = -8247629592838247188L;
  @Column(name = "aid", nullable = false)
  private Integer aid;

  @Column(name = "uid", nullable = false)
  private Integer uid;

  public Integer getAid() {
    return aid;
  }

  public void setAid(Integer aid) {
    this.aid = aid;
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
    ProfessionalRequestId entity = (ProfessionalRequestId) o;
    return Objects.equals(this.uid, entity.uid) &&
        Objects.equals(this.aid, entity.aid);
  }

  @Override
  public int hashCode() {
    return Objects.hash(uid, aid);
  }

}