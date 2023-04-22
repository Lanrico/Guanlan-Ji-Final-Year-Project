import http from "../http-common";

class LanguageDataService {
  getAll() {
    return http.get("/language/all");
  }

  get(id) {
    return http.get(`/language/${id}`);
  }

  getByTmdbId(id) {
    return http.get(`/language/${id}?idSource=tmdb`);
  }

  create(data) {
    console.log(data)
    return http.post("/language", data);
  }

  update(id, data) {
    return http.put(`/language/${id}`, data);
  }

  delete(id) {
    return http.delete(`/language/${id}`);
  }

  deleteAll() {
    return http.delete(`/language`);
  }

  findByTitle(title) {
    return http.get(`/language?title=${title}`);
  }
}

export default new LanguageDataService();