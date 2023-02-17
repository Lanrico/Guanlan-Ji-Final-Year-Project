package com.backend.project;

import javax.persistence.*;

@Entity
@Table(name = "sessions")
public class Session {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "type", nullable = false)
  private String type;

  @Column(name = "number", nullable = false)
  private Long number;

  @Column(name = "create_timestamp", nullable = false)
  private Long createTimestamp;

  @Column(name = "last_interact_timestamp", nullable = false)
  private Long lastInteractTimestamp;

  @Column(name = "status", nullable = false)
  private String status;

  @Lob
  @Column(name = "prompt", nullable = false)
  private String prompt;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Long getNumber() {
    return number;
  }

  public void setNumber(Long number) {
    this.number = number;
  }

  public Long getCreateTimestamp() {
    return createTimestamp;
  }

  public void setCreateTimestamp(Long createTimestamp) {
    this.createTimestamp = createTimestamp;
  }

  public Long getLastInteractTimestamp() {
    return lastInteractTimestamp;
  }

  public void setLastInteractTimestamp(Long lastInteractTimestamp) {
    this.lastInteractTimestamp = lastInteractTimestamp;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getPrompt() {
    return prompt;
  }

  public void setPrompt(String prompt) {
    this.prompt = prompt;
  }

}