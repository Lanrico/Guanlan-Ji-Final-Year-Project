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
public class ReportId implements Serializable {
  private static final long serialVersionUID = -4269842212006611756L;
  @Column(name = "uid", nullable = false)
  private Integer uid;

  @Column(name = "rid", nullable = false)
  private Integer rid;
  public ReportId(Integer uid, Integer rid) {
    this.rid = rid;
    this.uid = uid;
  }

  public ReportId() {
  }
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    ReportId entity = (ReportId) o;
    return Objects.equals(this.uid, entity.uid) &&
        Objects.equals(this.rid, entity.rid);
  }

  @Override
  public int hashCode() {
    return Objects.hash(uid, rid);
  }

}