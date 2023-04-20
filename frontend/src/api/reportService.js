import http from "../http-common";

class ReportDataService {
  getAll() {
    return http.get("/report/all");
  }

  getById(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/report/user/${argsQuery.id}`);
  }
  getReportsByMediaAndUser(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/report/${argsQuery.media}/${argsQuery.user}`)
  }

  getReportsByMedia(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/report/${argsQuery.media}?pageSize=${argsQuery.pageSize}&page=${argsQuery.page}&orderBy=${argsQuery.orderBy}&type=${argsQuery.type}`)
  }

  addReportToMedia(data) {
    return http.post(`/report/add`, data);
  }

  update(id, data) {
    return http.put(`/report/${id}`, data);
  }

  delete(id) {
    return http.delete(`/report/${id}`);
  }

  deleteReview(userId, reviewId) {
    return http.delete(`/report/deleteReview/${userId}/${reviewId}`);
  }

  rejectReport(userId, reviewId) {
    return http.delete(`/report/rejectReport/${userId}/${reviewId}`);
  }

  deleteAll() {
    return http.delete(`/report`);
  }
}

export default new ReportDataService();