import http from "../http-common";
import { filterAPIEncoder } from "../util";
class MovieDataService {
  getAll() {
    return http.get("/movie/all");
  }

  // getTopTrending(pageSize, page) {
  getTopTrending(args) {
    const [, argsQuery] = args.queryKey
    console.log(argsQuery)
    return http.get(`/media/top/popularity/movie?pageSize=${argsQuery.pageSize}&page=${argsQuery.page}`);
  }

  getTopRated(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/media/top/rate/movie?pageSize=${argsQuery.pageSize}&page=${argsQuery.page}`);
  }

  getFilteredTopRated(args) {
    const [, argsQuery] = args.queryKey
    var sort = argsQuery.filter.sort ? argsQuery.filter.sort : "rate"
    sort = argsQuery.filter.sort === "releaseDate" ? "movie_releaseDate" : sort
    console.log(`/media/top/${sort}/movie?pageSize=${argsQuery.pageSize}&page=${argsQuery.page}${filterAPIEncoder(argsQuery.filter)}`)
    return http.get(`/media/top/${sort}/movie?pageSize=${argsQuery.pageSize}&page=${argsQuery.page}${filterAPIEncoder(argsQuery.filter)}`);
  }

  get(args) {
    const [, argsQuery] = args.queryKey
    console.log(argsQuery)
    return http.get(`/media/${argsQuery.id}`);
  }

  create(data) {
    console.log(data)
    return http.post("/movie", data);
  }

  update(id, data) {
    return http.put(`/movie/${id}`, data);
  }

  delete(id) {
    return http.delete(`/movie/${id}`);
  }

  deleteAll() {
    return http.delete(`/movie`);
  }

  findByTitle(title) {
    return http.get(`/movie?title=${title}`);
  }
}

export default new MovieDataService();