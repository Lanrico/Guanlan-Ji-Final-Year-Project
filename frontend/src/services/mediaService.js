import http from "../http-common";

class MediaDataService {
  getAll() {
    return http.get("/homepage");
  }

  get(id) {
    return http.get(`/homepage/${id}`);
  }

  create(data) {
    console.log(data)
    return http.post("/homepage", data);
  }

  update(id, data) {
    return http.put(`/homepage/${id}`, data);
  }

  delete(id) {
    return http.delete(`/homepage/${id}`);
  }

  deleteAll() {
    return http.delete(`/homepage`);
  }

  findByTitle(title) {
    return http.get(`/homepage?title=${title}`);
  }
}

export default new MediaDataService();