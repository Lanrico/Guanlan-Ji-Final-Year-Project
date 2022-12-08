package com.backend.project.model;

import javax.persistence.*;

@Entity
@Table(name = "movies")
public class Movies {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "overview")
    private String overview;

    @Column(name = "release_date")
    private String release_date;

    @Column(name = "title")
    private String title;

    @Column(name = "poster_path")
    private String poster_path;

    public Movies() {

    }

    public Movies(String title, String overview, String release_date) {
        this.overview = overview;
        this.release_date = release_date;
        this.title = title;
    }

    public long getId() {
        return id;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getRelease_date() {
        return release_date;
    }



    public String getPoster_path() {
        return poster_path;
    }

    public void setPoster_path(String poster_path) {
        this.poster_path = poster_path;
    }

    public void setRelease_date(String release_date) {
        this.release_date = release_date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "Movies [id=" + id + ", title=" + title + ", overview=" + overview + ", release_date=" + release_date + "]";
    }

    @PreRemove
    public void preRemove() {

    }

    @PostRemove
    public void postRemove() {

    }
}