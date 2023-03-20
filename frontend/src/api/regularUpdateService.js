import http from "../http-common";

class RegularUpdateService {
  updateFinalRates(id) {
    return http.post(`/update/finalRate/${id}`);
  }
}

export default new RegularUpdateService();