import http from "../http-common";

class CountryDataService {
  getAll() {
    return http.get("/country");
  }

  get(id) {
    return http.get(`/country/${id}`);
  }

  getByTmdbId(id) {
    return http.get(`/country/${id}?idSource=tmdb`);
  }

  create(data) {
    console.log(data)
    return http.post("/country", data);
  }

  update(id, data) {
    return http.put(`/country/${id}`, data);
  }

  delete(id) {
    return http.delete(`/country/${id}`);
  }

  deleteAll() {
    return http.delete(`/country`);
  }

  findByTitle(title) {
    return http.get(`/country?title=${title}`);
  }
}

export default new CountryDataService();