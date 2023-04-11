import http from "../http-common";

class NotInterestedDataService {
  getAll() {
    return http.get("/notInterested/all");
  }

  get(id) {
    return http.get(`/notInterested/${id}`);
  }

  getByTmdbId(id) {
    return http.get(`/notInterested/${id}?idSource=tmdb`);
  }

  create(user_id, media_id) {
    return http.post(`/notInterested/${user_id}/${media_id}`);
  }

  update(id, data) {
    return http.put(`/notInterested/${id}`, data);
  }

  delete(id) {
    return http.delete(`/notInterested/${id}`);
  }

  deleteAll() {
    return http.delete(`/notInterested`);
  }

}

export default new NotInterestedDataService();