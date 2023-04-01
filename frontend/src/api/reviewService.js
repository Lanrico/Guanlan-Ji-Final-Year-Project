import http from "../http-common";

class ReviewDataService {
  getAll() {
    return http.get("/review/all");
  }

  getById(id) {
    return http.get(`/review/?id=${id}`);
  }
  getReviewsByMediaAndUser(args) {
    const [, argsQuery] = args.queryKey
    console.log(argsQuery)
    return http.get(`/review/${argsQuery.media}/${argsQuery.user}`)
  }

  getReviewsByMedia(args) {
    const [, argsQuery] = args.queryKey
    console.log(argsQuery)
    return http.get(`/review/${argsQuery.media}?pageSize=${argsQuery.pageSize}&page=${argsQuery.page}&orderBy=${argsQuery.orderBy}&type=${argsQuery.type}`)
  }

  addReviewToMedia(id, data) {
    console.log(data)
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