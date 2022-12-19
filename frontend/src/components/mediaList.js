import React, { Component } from "react";
import MediaDataService from "../services/mediaService";
import { Link } from "react-router-dom";
import { CardMedia } from "@mui/material";

export default class MediaList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveMedias = this.retrieveMedias.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMedia = this.setActiveMedia.bind(this);
    this.removeAllMedias = this.removeAllMedias.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      medias: [],
      currentMedia: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveMedias();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveMedias() {
    MediaDataService.getAll()
      .then(response => {
        this.setState({
          medias: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveMedias();
    this.setState({
      currentMedia: null,
      currentIndex: -1
    });
  }

  setActiveMedia(media, index) {
    this.setState({
      currentMedia: media,
      currentIndex: index
    });
  }

  removeAllMedias() {
    MediaDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    MediaDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          medias: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, medias, currentMedia, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Medias List</h4>

          <ul className="list-group">
            {medias &&
              medias.map((media, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveMedia(media, index)}
                  key={index}
                >
                  {media.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllMedias}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentMedia ? (
            <div>
              <h4>Media</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentMedia.title}
              </div>
              <div>
                <label>
                  <strong>Overview:</strong>
                </label>{" "}
                {currentMedia.overview}
              </div>
              <div>
                <label>
                  <strong>Release date:</strong>
                </label>{" "}
                {currentMedia.release_date}
              </div>
              <div>
                <label>
                  <strong>Poster:</strong>
                </label>{" "}
                <CardMedia
                  sx={{ height: 800 }}
                  image={
                    currentMedia.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${currentMedia.poster_path}`
                      : `../images/film-poster-placeholder.png`
                  }
                />
              </div>
              <Link
                to={"/medias/" + currentMedia.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Media...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}