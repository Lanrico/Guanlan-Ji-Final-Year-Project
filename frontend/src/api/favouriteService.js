import http from "../http-common";

class FavouriteDataService {
  getAllFavourteByPage(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/favourite/${argsQuery.user}/getAllByPage?pageSize=${argsQuery.pageSize}&page=${argsQuery.page}`);
  }

  getAllFavourte(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/favourite/${argsQuery.user}/getAll`);
  }


  get(id) {
    return http.get(`/favourite/${id}`);
  }

  addFavourite(user, media, data) {
    console.log(data)
    return http.post(`/favourite/${user}/add/${media}`, data);
  }

  update(id, data) {
    return http.put(`/favourite/${id}`, data);
  }

  removeFavourite(user, media) {
    return http.delete(`/favourite/${user}/delete/${media}`);
  }

  deleteAll() {
    return http.delete(`/favourite`);
  }

}

export default new FavouriteDataService();