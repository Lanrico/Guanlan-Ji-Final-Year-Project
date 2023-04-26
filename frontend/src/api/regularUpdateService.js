import http from "../http-common";

class RegularUpdateService {
  updateFinalRates(id) {
    return http.post(`/update/finalRate/${id}`);
  }

  updateAllFinalRate() {
    return http.post(`/update/finalRateAll`);
  }

  updateAllPopularity() {
    return http.post(`/update/popularityAll`);
  }

  updateAllDailyMovie() {
    return http.post(`/update/movieAll/daily`);
  }
}

export default new RegularUpdateService();