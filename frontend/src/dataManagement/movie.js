import movieService from "../api/movieService";
import { getMovie } from "../api/tmdb-api";
import companyService from "../api/companyService";
import collectionService from "../api/collectionService";

export const cleanMovieData = (movieList) => {
  const cleanList = movieList.filter((m) => {
    return m.popularity > 2
  })
  console.log(cleanList.length);
  return cleanList;
}

export const addMovieDetailedListByMovieList = async (movieList) => {
  movieService.getAll()
    .then((existData) => {
      // existIdList;
      if (existData.data.length > 0) {
        var existIdList = existData.data.map((d) => d.tmdbId)
      }
      console.log(existData.data.length)

      movieList.map((m) => {
        if (existIdList.includes(m.id)) {
          console.log("exist")
        }
        else {
          // console.log(m)
          getMovie(m.id)
            .then((response) => {

              var movie = {
                "media": {
                  "type": "0",
                  "rate": response.vote_average,
                  "voteCount": response.vote_count,
                  "recommend": 0,
                  "unrecommend": 0,
                  "languages": response.spoken_languages.map((l) => {
                    return {
                      "id": l.iso_639_1,
                    }
                  }),
                  "countries": response.production_countries.map((c) => {
                    return {
                      "id": c.iso_3166_1,
                    }
                  }),
                  "genres": response.genres.map((g) => {
                    return {
                      "id": g.id,
                    }
                  }),
                  "originalLanguage": response.original_language,
                  "popularity": response.popularity
                },
                "adult": response.adult,
                "originalTitle": response.original_title,
                "video": response.video,
                "tmdbId": response.id,
                "budget": response.budget,
                "homepage": response.homepage,
                "imdbId": response.imdb_id,
                "originalLanguage": response.original_language,
                "overview": response.overview,
                "posterPath": response.poster_path,
                "releaseDate": response.release_date,
                "revenue": response.revenue,
                "runtime": response.runtime,
                "status": response.status,
                "tagline": response.tagline,
                "title": response.title
              }
              if (response.production_companies.length > 0) {
                console.log(response.production_companies)
                companyService.getByTmdbId(response.production_companies[0].id)
                  .then((company) => {
                    movie.media['companies'] = [company.data]

                    if (response.belongs_to_collection) {
                      collectionService.getByTmdbId(response.belongs_to_collection.id)
                        .then((collection) => {
                          movie.media['collections'] = [{ "id": collection.data.id }]
                          console.log(collection)
                          var resultList = []
                          resultList.push(movie)
                          movieService.create(resultList)
                        })
                    }
                    else {
                      console.log(movie)
                      var resultList = []
                      resultList.push(movie)
                      movieService.create(resultList)
                    }
                  })
              }
              else {
                if (response.belongs_to_collection) {

                  collectionService.getByTmdbId(response.belongs_to_collection.id)
                    .then((collection) => {
                      movie.media['collections'] = [{ "id": collection.data.id }]
                      console.log(collection)
                      var resultList = []
                      resultList.push(movie)
                      movieService.create(resultList)
                    })
                }
                else {
                  console.log(movie)
                  var resultList = []
                  resultList.push(movie)
                  movieService.create(resultList)
                }
              }

            })
        }
        return null;
        // m['media'] = {
        //   popularity: m.popularity,
        //   type: '0'
        // }
        // return m
      })
    })
}