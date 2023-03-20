import http from "../http-common";
class MediaDataService {
  getAll() {
    return http.get("/media/all");
  }
}

export default new MediaDataService();