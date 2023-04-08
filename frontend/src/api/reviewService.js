import http from "../http-common";

class ReviewDataService {
  getAll() {
    return http.get("/review/all");
  }

  getById(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/review/user/${argsQuery.id}`);
  }
  getReviewsByMediaAndUser(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/review/${argsQuery.media}/${argsQuery.user}`)
  }

  getReviewsByMedia(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/review/${argsQuery.media}?pageSize=${argsQuery.pageSize}&page=${argsQuery.page}&orderBy=${argsQuery.orderBy}&type=${argsQuery.type}`)
  }

  addReviewToMedia(id, data) {
    return http.post(`/review/${id}`, data);
  }

  update(id, data) {
    return http.put(`/review/${id}`, data);
  }

  delete(id) {
    return http.delete(`/review/${id}`);
  }

  deleteAll() {
    return http.delete(`/review`);
  }
}

export default new ReviewDataService();