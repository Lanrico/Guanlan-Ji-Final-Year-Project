import http from "../http-common";

class ProUserRequestDataService {
  getAll() {
    return http.get("/proUserRequest/all");
  }

  getById(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/proUserRequest/${argsQuery.userId}`);
  }
  getById0(userId) {
    return http.get(`/proUserRequest/${userId}`);
  }
  getProUserRequestsByMediaAndUser(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/proUserRequest/${argsQuery.media}/${argsQuery.user}`)
  }

  getProUserRequestsByMedia(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/proUserRequest/${argsQuery.media}?pageSize=${argsQuery.pageSize}&page=${argsQuery.page}&orderBy=${argsQuery.orderBy}&type=${argsQuery.type}`)
  }

  create(id, data) {
    return http.post(`/proUserRequest/add/${id}`, data);
  }

  update(id, data) {
    return http.put(`/proUserRequest/${id}`, data);
  }

  updateStatus(status, adminId, RequestId) {
    return http.post(`/proUserRequest/${status}/${adminId}/${RequestId}`);
  }

  delete(id) {
    return http.delete(`/proUserRequest/${id}`);
  }

  deleteAll() {
    return http.delete(`/proUserRequest`);
  }

}

export default new ProUserRequestDataService();