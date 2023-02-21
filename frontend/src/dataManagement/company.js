import companyService from "../api/companyService";
import { getCompany } from "../api/tmdb-api";

export const addCompanyDetailedListByCompanyList = async (companyList) => {
  companyService.getAll()
    .then((existData) => {
      // existIdList;
      if (existData.data.length > 0) {
        var existIdList = existData.data.map((d) => d.tmdbId)
      }
      console.log(existData.data.length)
      companyList.map((m) => {
        if (existIdList.includes(m.id)) {
          console.log("exist")
        }
        else {
          getCompany(m.id)
            .then((response) => {
              var company = {
                "tmdbId": response.id,
                "name": response.name,
                "description": response.description,
                "logoPath": response.logo_path,
                "originCountry": response.origin_country,
                "headquarters": response.headquarters,
                "homepage": response.homepage
              }
              if (response.parent_company) {
                company["parentCompany"] = response.parent_company.id
              }
              var resultList = []
              resultList.push(company)
              companyService.create(resultList)
              console.log(resultList)
              // console.log(existIdList.includes(m.id))
            })
        }
        return null;
      })
    })
}

