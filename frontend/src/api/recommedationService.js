import http from "../http-common";

class RecommendDataService {
  getAll() {
    return http.get("/recommend/all");
  }

  getById(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/recommend/${argsQuery.id}`);
  }

  generateRecommendation(id) {
    return http.post(`/recommend/${id}/generate`);
  }
}

export default new RecommendDataService();