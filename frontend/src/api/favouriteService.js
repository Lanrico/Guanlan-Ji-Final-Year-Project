import http from "../http-common";

class FavouriteDataService {
  getAllFavourteByPage(user) {
    return http.get(`/favourite/${user}/getAllByPage`);
  }

  getAllFavourte(user) {
    return http.get(`/favourite/${user}/getAll`);
  }


  get(id) {
    return http.get(`/favourite/${id}`);
  }

  addFavourite(user, media, data) {
    console.log(media)
    return http.post(`/favourite/${user}/add/${media}`, data);
  }

  update(id, data) {
    return http.put(`/favourite/${id}`, data);
  }

  delete(user, media) {
    return http.delete(`/favourite/${user}/delete/${media}`);
  }

  deleteAll() {
    return http.delete(`/favourite`);
  }

}

export default new FavouriteDataService();