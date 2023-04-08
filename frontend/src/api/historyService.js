import http from "../http-common";

class HistoryDataService {
  getAllByUser(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/history/${argsQuery.user}/getAllByPage?pageSize=${argsQuery.pageSize}&page=${argsQuery.page}`);
  }

  create(userId, mediaId) {
    return http.post(`/history/${userId}/add/${mediaId}`);
  }

  delete(userId, mediaId) {
    return http.delete(`history/${userId}/delete/${mediaId}`);
  }
}

export default new HistoryDataService();