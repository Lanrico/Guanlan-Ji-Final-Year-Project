import http from "../http-common";

class CollectionDataService {
  getAll() {
    return http.get("/collection/all");
  }

  get(id) {
    return http.get(`/collection/${id}`);
  }

  getByTmdbId(id) {
    return http.get(`/collection/${id}?idSource=tmdb`);
  }

  create(data) {
    console.log(data)
    return http.post("/collection", data);
  }

  update(id, data) {
    return http.put(`/collection/${id}`, data);
  }

  delete(id) {
    return http.delete(`/collection/${id}`);
  }

  deleteAll() {
    return http.delete(`/collection`);
  }

  findByTitle(title) {
    return http.get(`/collection?title=${title}`);
  }
}

export default new CollectionDataService();