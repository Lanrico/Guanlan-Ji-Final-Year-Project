import http from "../http-common";

class GenreDataService {
  getAll() {
    return http.get("/genre/all");
  }

  get(id) {
    return http.get(`/genre/${id}`);
  }

  getByTmdbId(id) {
    return http.get(`/genre/${id}?idSource=tmdb`);
  }

  create(data) {
    console.log(data)
    return http.post("/genre", data);
  }

  update(id, data) {
    return http.put(`/genre/${id}`, data);
  }

  delete(id) {
    return http.delete(`/genre/${id}`);
  }

  deleteAll() {
    return http.delete(`/genre`);
  }

  findByTitle(title) {
    return http.get(`/genre?title=${title}`);
  }
}

export default new GenreDataService();