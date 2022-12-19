import React, { Component } from "react";
import MediaDataService from "../services/mediaService";

export default class AddMedia extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeOverview = this.onChangeOverview.bind(this);
    this.onChangeReleaseDate = this.onChangeReleaseDate.bind(this);
    this.onChangePosterPath = this.onChangePosterPath.bind(this);
    this.saveMedia = this.saveMedia.bind(this);
    this.newMedia = this.newMedia.bind(this);

    this.state = {
      id: null,
      title: "",
      overview: "", 
      release_date: "",
      poster_path: "",

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeOverview(e) {
    this.setState({
      overview: e.target.value
    });
  }

  onChangeReleaseDate(e) {
    this.setState({
      release_date: e.target.value
    });
  }

  onChangePosterPath(e) {
    this.setState({
      poster_path: e.target.value
    });
  }

  saveMedia() {
    var data = {
      title: this.state.title,
      overview: this.state.overview,
      release_date: this.state.release_date,
      poster_path: this.state.poster_path
    };

    MediaDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          overview: response.data.overview,
          release_date: response.data.release_date,
          poster_path: response.data.poster_path,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newMedia() {
    this.setState({
      id: null,
      title: "",
      overview: "",
      release_date: "",
      poster_path: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newMedia}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="overview">Overview</label>
              <input
                type="text"
                className="form-control"
                id="overview"
                required
                value={this.state.overview}
                onChange={this.onChangeOverview}
                name="overview"
              />
            </div>

            <div className="form-group">
              <label htmlFor="release_date">Release date</label>
              <input
                type="text"
                className="form-control"
                id="release_date"
                required
                value={this.state.release_date}
                onChange={this.onChangeReleaseDate}
                name="release_date"
              />
            </div>

            <div className="form-group">
              <label htmlFor="poster_path">Poster path</label>
              <input
                type="text"
                className="form-control"
                id="poster_path"
                required
                value={this.state.poster_path}
                onChange={this.onChangePosterPath}
                name="poster_path"
              />
            </div>

            <button onClick={this.saveMedia} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}