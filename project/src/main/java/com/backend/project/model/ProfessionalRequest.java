package com.backend.project.model;

import javax.persistence.*;

@Entity
@Table(name = "professional_request")
public class ProfessionalRequest {
  @EmbeddedId
  private ProfessionalRequestId id;

  @MapsId("aid")
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "aid", nullable = false)
  private Administrator aid;

  @MapsId("uid")
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "uid", nullable = false)
  private User uid;

  @Column(name = "`describe`", nullable = false, length = 10000)
  private String describe;

  public ProfessionalRequestId getId() {
    return id;
  }

  public void setId(ProfessionalRequestId id) {
    this.id = id;
  }

  public Administrator getAid() {
    return aid;
  }

  public void setAid(Administrator aid) {
    this.aid = aid;
  }

  public User getUid() {
    return uid;
  }

  public void setUid(User uid) {
    this.uid = uid;
  }

  public String getDescribe() {
    return describe;
  }

  public void setDescribe(String describe) {
    this.describe = describe;
  }

}