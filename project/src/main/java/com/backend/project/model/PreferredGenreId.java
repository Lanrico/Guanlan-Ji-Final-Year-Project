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
public class PreferredGenreId implements Serializable {
  private static final long serialVersionUID = 5484941099923843786L;
  public PreferredGenreId(Integer uid, Integer gid) {
    this.gid = gid;
    this.uid = uid;
  }
  public PreferredGenreId() {
  }

  @Column(name = "uid", nullable = false)
  private Integer uid;

  @Column(name = "gid", nullable = false)
  private Integer gid;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    PreferredGenreId entity = (PreferredGenreId) o;
    return Objects.equals(this.uid, entity.uid) &&
        Objects.equals(this.gid, entity.gid);
  }

  @Override
  public int hashCode() {
    return Objects.hash(uid, gid);
  }

}