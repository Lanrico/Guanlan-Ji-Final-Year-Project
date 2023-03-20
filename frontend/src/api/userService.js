import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import http from "../http-common";

class UserDataService {

  getAll() {
    return http.get("/user/all");
  }

  getById(id) {
    return http.get(`/user/?id=${id}`);
  }

  getByEmail(email) {
    return http.get(`/user/?email=${email}`);
  }

  create(data) {
    console.log(data)
    return http.post("/user/create", data);
  }

  update(id, column, data) {
    return http.put(`/user/${id}/update/${column}`, data);
  }

  delete(id) {
    return http.delete(`/user/${id}`);
  }

  deleteAll() {
    return http.delete(`/user`);
  }

  findByTitle(title) {
    return http.get(`/user?title=${title}`);
  }
}

export default new UserDataService();