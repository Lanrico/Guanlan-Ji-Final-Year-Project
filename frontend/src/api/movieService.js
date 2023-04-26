import http from "../http-common";
import { filterAPIEncoder } from "../util";
class MovieDataService {
  getAll() {
    return http.get("/movie/all");
  }

  getTopTrending(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/media/top/finalPopularity/movie?pageSize=${argsQuery.pageSize}&page=${argsQuery.page}`);
  }

  getRank(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/media/rank/${argsQuery.id}`);
  }

  getTopRated(args) {
    const [, argsQuery] = args.queryKey
    return http.get(`/media/top/finalRate/movie?pageSize=${argsQuery.pageSize}&page=${argsQuery.page}`);
  }

  getFilteredTopRated(args) {
    const [, argsQuery] = args.queryKey
    var sort = argsQuery.filter.sort ? argsQuery.filter.sort : "finalRate"
    sort = argsQuery.filter.sort === "releaseDate" ? "movie_releaseDate" : sort
    return http.get(`/media/top/${sort}/movie?pageSize=${argsQuery.pageSize}&page=${argsQuery.page}${filterAPIEncoder(argsQuery.filter)}`);
  }

  getSearchMovies(args) {
    const [, argsQuery] = args.queryKey
    var sort = argsQuery.sort ? argsQuery.sort : "finalRate"
    sort = argsQuery.sort === "releaseDate" ? "movie_releaseDate" : sort
    return http.get(`/media/search/${sort}/movie?title=${argsQuery.title}&pageSize=${argsQuery.pageSize}&page=${argsQuery.page}`);
  }

  get(args) {
    const [, argsQuery] = args.queryKey
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