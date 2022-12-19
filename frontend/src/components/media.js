import React, { Component } from "react";
import MediaDataService from "../services/mediaService";
import { withRouter } from '../common/with-router';

class Media extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeOverview = this.onChangeOverview.bind(this);
    this.getMedia = this.getMedia.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateMedia = this.updateMedia.bind(this);
    this.deleteMedia = this.deleteMedia.bind(this);

    this.state = {
      currentMedia: {
        id: null,
        title: "",
        overview: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getMedia(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMedia: {
          ...prevState.currentMedia,
          title: title
        }
      };
    });
  }

  onChangeOverview(e) {
    const overview = e.target.value;
    
    this.setState(prevState => ({
      currentMedia: {
        ...prevState.currentMedia,
        overview: overview
      }
    }));
  }

  getMedia(id) {
    MediaDataService.get(id)
      .then(response => {
        this.setState({
          currentMedia: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentMedia.id,
      title: this.state.currentMedia.title,
      overview: this.state.currentMedia.overview,
      published: status
    };

    MediaDataService.update(this.state.currentMedia.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentMedia: {
            ...prevState.currentMedia,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateMedia() {
    MediaDataService.update(
      this.state.currentMedia.id,
      this.state.currentMedia
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The media was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteMedia() {    
    MediaDataService.delete(this.state.currentMedia.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/medias');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentMedia } = this.state;

    return (
      <div>
        {currentMedia ? (
          <div className="edit-form">
            <h4>Media</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMedia.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="overview">Overview</label>
                <input
                  type="text"
                  className="form-control"
                  id="overview"
                  value={currentMedia.overview}
                  onChange={this.onChangeOverview}
                />
              </div>
            </form>

            {currentMedia.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteMedia}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateMedia}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Media...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Media);