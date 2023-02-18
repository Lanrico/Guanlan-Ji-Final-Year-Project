import http from "../http-common";

class MovieDataService {
  getAll() {
    return http.get("/movie");
  }

  get(id) {
    return http.get(`/movie/${id}`);
  }

  create(data) {
    console.log(data)
    return http.post("/movie", data);
  }

  update(id, data) {
    return http.put(`/movie/${id}`, data);
  }

  delete(id) {
    return http.delete(`/movie/${id}`);
  }

  deleteAll() {
    return http.delete(`/movie`);
  }

  findByTitle(title) {
    return http.get(`/movie?title=${title}`);
  }
}

export default new MovieDataService();