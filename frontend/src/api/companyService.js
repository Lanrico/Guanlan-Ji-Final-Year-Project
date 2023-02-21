import http from "../http-common";

class CompanyDataService {
  getAll() {
    return http.get("/company/all");
  }

  get(id) {
    return http.get(`/company/${id}`);
  }

  getByTmdbId(id) {
    return http.get(`/company/${id}?idSource=tmdb`);
  }

  create(data) {
    console.log(data)
    return http.post("/company", data);
  }

  update(id, data) {
    return http.put(`/company/${id}`, data);
  }

  delete(id) {
    return http.delete(`/company/${id}`);
  }

  deleteAll() {
    return http.delete(`/company`);
  }

}

export default new CompanyDataService();