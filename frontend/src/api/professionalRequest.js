import http from "../http-common";

class ProfessionalRequestDataService {
  getAll() {
    return http.get("/professionalRequest/all");
  }

  getById(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/professionalRequest/user/${argsQuery.id}`);
  }
  getProfessionalRequestsByMediaAndUser(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/professionalRequest/${argsQuery.media}/${argsQuery.user}`)
  }

  getProfessionalRequestsByMedia(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/professionalRequest/${argsQuery.media}?pageSize=${argsQuery.pageSize}&page=${argsQuery.page}&orderBy=${argsQuery.orderBy}&type=${argsQuery.type}`)
  }

  create(id, data) {
    return http.post(`/professionalRequest/add/${id}`, data);
  }

  update(id, data) {
    return http.put(`/professionalRequest/${id}`, data);
  }

  delete(id) {
    return http.delete(`/professionalRequest/${id}`);
  }

  deleteAll() {
    return http.delete(`/professionalRequest`);
  }
}

export default new ProfessionalRequestDataService();