import collectionService from "../api/collectionService";
import { getCollection } from "../api/tmdb-api";


export const addCollectionDetailedListByCollectionList = async (collectionList) => {
  collectionService.getAll()
    .then((existData) => {
      const existIdList = existData.data.map((d) => d.tmdbId)
      collectionList.map((m) => {
        if (existIdList.includes(m.id)) {
          console.log("exist")
        }
        else {
          getCollection(m.id)
            .then((response) => {
              var collection = {
                "tmdbId": response.id,
                "name": response.name,
                "overview": response.overview,
                "posterPath": response.poster_path,
              }
              var resultList = []
              resultList.push(collection)
              collectionService.create(resultList)
              console.log(m.id)
              console.log(existIdList.includes(m.id))
            })
        }
        return null;
      })
    })
}

