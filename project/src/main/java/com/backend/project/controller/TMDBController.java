package com.backend.project.controller;

import com.backend.project.model.*;
import com.backend.project.repository.CompanyRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.util.*;

@CrossOrigin(origins = "${FRONTEND_URL}")
@RestController
@RequestMapping("/api")
public class TMDBController {

  public List<Integer> getIdsFromTMDB(String mediaTmdbId,String type, String myTmdbKey) throws IOException {
    URL url = new URL("https://api.themoviedb.org/3/movie/" + mediaTmdbId + "/"+ type +"?api_key=" + myTmdbKey);
    HttpURLConnection con = (HttpURLConnection) url.openConnection();
    con.setRequestMethod("GET");

    int status = con.getResponseCode();
    if (status != 200) {
      throw new RuntimeException("HTTP error code: " + status);
    }

    BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
    String inputLine;
    StringBuffer content = new StringBuffer();
    while ((inputLine = in.readLine()) != null) {
      content.append(inputLine);
    }
    in.close();
    con.disconnect();

    ObjectMapper mapper = new ObjectMapper();
    JsonNode rootNode = mapper.readTree(content.toString());

    List<Integer> ids = new ArrayList<>();
    JsonNode resultsNode = rootNode.get("results");
    Iterator<JsonNode> resultsIterator = resultsNode.elements();
    while (resultsIterator.hasNext()) {
      JsonNode resultNode = resultsIterator.next();
      int id = Integer.parseInt(resultNode.get("id").asText());
      ids.add(id);
    }
    return ids;
  }

  public List<Integer> getDailyUpdateIdsFromTMDB(String myTmdbKey) throws IOException {
    URL url = new URL("https://api.themoviedb.org/3/movie/changes?api_key=" + myTmdbKey);
    HttpURLConnection con = (HttpURLConnection) url.openConnection();
    con.setRequestMethod("GET");

    int status = con.getResponseCode();
    if (status != 200) {
      System.out.println("HTTP error code: " + status);
//      throw new RuntimeException("HTTP error code: " + status);

      return getDailyUpdateIdsFromTMDB(myTmdbKey);
    }

    BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
    String inputLine;
    StringBuffer content = new StringBuffer();
    while ((inputLine = in.readLine()) != null) {
      content.append(inputLine);
    }
    in.close();
    con.disconnect();

    ObjectMapper mapper = new ObjectMapper();
    JsonNode rootNode = mapper.readTree(content.toString());

    int totalPages = Integer.parseInt(rootNode.get("total_pages").asText());

    int page = 1;
    List<Integer> ids = new ArrayList<>();

    while (page <= totalPages) {
      List<Integer> idsFromPage = getDailyUpdateIdsFromTMDBByPage(myTmdbKey, page);
      if (idsFromPage.isEmpty()) {
        break;
      }
      ids.addAll(idsFromPage);
      page++;
    }

    // remove duplicates
    List<Integer> idsWithoutDuplicates = new ArrayList<>();
    for (int id : ids) {
      if (!idsWithoutDuplicates.contains(id)) {
        idsWithoutDuplicates.add(id);
      }
    }
    return idsWithoutDuplicates;
  }

  public List<Integer> getDailyUpdateIdsFromTMDBByPage(String myTmdbKey, int page) throws IOException {
    URL url = new URL("https://api.themoviedb.org/3/movie/changes?api_key=" + myTmdbKey+ "&page=" + page);
    HttpURLConnection con = (HttpURLConnection) url.openConnection();
    con.setRequestMethod("GET");

    int status = con.getResponseCode();
    if (status != 200) {
      System.out.println("HTTP error code: " + status);
//      throw new RuntimeException("HTTP error code: " + status);
      return getDailyUpdateIdsFromTMDBByPage(myTmdbKey, page);
    }

    BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
    String inputLine;
    StringBuffer content = new StringBuffer();
    while ((inputLine = in.readLine()) != null) {
      content.append(inputLine);
    }
    in.close();
    con.disconnect();

    ObjectMapper mapper = new ObjectMapper();
    JsonNode rootNode = mapper.readTree(content.toString());

    List<Integer> ids = new ArrayList<>();
    JsonNode resultsNode = rootNode.get("results");
    Iterator<JsonNode> resultsIterator = resultsNode.elements();
    while (resultsIterator.hasNext()) {
      JsonNode resultNode = resultsIterator.next();
      int id = Integer.parseInt(resultNode.get("id").asText());
      ids.add(id);
    }
    return ids;
  }
public Media getMediaDataFromTMDB(int id, String myTmdbKey, CompanyRepository companyRepository) throws IOException {
    URL url = new URL("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + myTmdbKey);
    HttpURLConnection con = (HttpURLConnection) url.openConnection();
    con.setRequestMethod("GET");
    int status = con.getResponseCode();
    if (status != 200) {
      System.out.println("HTTP error code: " + status);
//      throw new RuntimeException("HTTP error code: " + status);
      return null;
    }

    BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
    String inputLine;
    StringBuffer content = new StringBuffer();
    while ((inputLine = in.readLine()) != null) {
      content.append(inputLine);
    }
    in.close();
    con.disconnect();

    ObjectMapper mapper = new ObjectMapper();
    JsonNode rootNode = mapper.readTree(content.toString());
    if (rootNode.get("release_date") == null || rootNode.get("release_date").asText().isEmpty()) {
      return null;
    }
    Media media = new Media();

    media.setMovie(new Movie());

    List <Genre> genres = new ArrayList<>();
    for (JsonNode genreNode : rootNode.get("genres")) {
      Genre genre = new Genre();
      genre.setId(genreNode.get("id").asInt());
      genre.setName(genreNode.get("name").asText());
      genres.add(genre);
    }
    Set<Genre> genresSet = new HashSet<>(genres);

    List <Company> productionCompanies = new ArrayList<>();
    for (JsonNode companyNode : rootNode.get("production_companies")) {
      Optional<Company> companyData = companyRepository.findByTmdbId(companyNode.get("id").asInt());
      if (!companyData.isPresent()) {
        Company company = new Company();
        company.setTmdbId(companyNode.get("id").asInt());
        company.setName(companyNode.get("name").asText());
        productionCompanies.add(companyRepository.save(company));
      }
      else {
        productionCompanies.add(companyData.get());
      }
    }
    Set<Company> productionCompaniesSet = new HashSet<>(productionCompanies);

    List <Country> productionCountries = new ArrayList<>();
    for (JsonNode countryNode : rootNode.get("production_countries")) {
      Country country = new Country();
      country.setId(countryNode.get("iso_3166_1").asText());
      country.setEnglishName(countryNode.get("name").asText());
      productionCountries.add(country);
    }
    Set<Country> productionCountriesSet = new HashSet<>(productionCountries);

    List <Language> spokenLanguages = new ArrayList<>();
    for (JsonNode languageNode : rootNode.get("spoken_languages")) {
      Language language = new Language();
      language.setId(languageNode.get("iso_639_1").asText());
      language.setEnglishName(languageNode.get("name").asText());
      spokenLanguages.add(language);
    }
    Set<Language> spokenLanguagesSet = new HashSet<>(spokenLanguages);


    media.setId(id);
    media.getMovie().setTitle(rootNode.get("title").asText());
    media.getMovie().setOriginalTitle(rootNode.get("original_title").asText());
    media.getMovie().setOverview(rootNode.get("overview").asText());
    media.getMovie().setReleaseDate(LocalDate.parse(rootNode.get("release_date").asText()));
    media.getMovie().setPosterPath(rootNode.get("poster_path").asText());
    media.getMovie().setRevenue(rootNode.get("revenue").asText());
    media.getMovie().setTmdbId(id);
    media.getMovie().setBudget(rootNode.get("budget").asInt());
    media.getMovie().setImdbId(rootNode.get("imdb_id").asText());
    media.getMovie().setHomepage(rootNode.get("homepage").asText());
    media.getMovie().setTagline(rootNode.get("tagline").asText());
    media.getMovie().setAdult(rootNode.get("adult").asBoolean());
    media.getMovie().setRuntime(rootNode.get("runtime").asInt());
    media.getMovie().setOriginalLanguage(rootNode.get("original_language").asText());
    media.getMovie().setStatus(rootNode.get("status").asText());

    media.setRate(rootNode.get("vote_average").asDouble());
    media.setType("0");
    media.setRecommend(0);
    media.setUnrecommend(0);
    media.setVoteCount(rootNode.get("vote_count").asInt());
    media.setPopularity(rootNode.get("popularity").asDouble());
    media.setOriginalLanguage(rootNode.get("original_language").asText());
    media.setFinalPopularity(rootNode.get("popularity").asDouble());
    media.setFinalRate(rootNode.get("vote_average").asDouble());
    media.setFinalVoteCount(rootNode.get("vote_count").asInt());
    media.setGenres(genresSet);
    media.setCompanies(productionCompaniesSet);
    media.setCountries(productionCountriesSet);
    media.setLanguages(spokenLanguagesSet);
    return media;
  }

  public Movie getMovieDataFromTMDB(int id, String myTmdbKey, CompanyRepository companyRepository) throws IOException {
    URL url = new URL("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + myTmdbKey);
    HttpURLConnection con = (HttpURLConnection) url.openConnection();
    con.setRequestMethod("GET");
    int status = con.getResponseCode();
    if (status != 200) {
      System.out.println("HTTP error code: " + status);
//      throw new RuntimeException("HTTP error code: " + status);
      return null;
    }

    BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
    String inputLine;
    StringBuffer content = new StringBuffer();
    while ((inputLine = in.readLine()) != null) {
      content.append(inputLine);
    }
    in.close();
    con.disconnect();

    ObjectMapper mapper = new ObjectMapper();
    JsonNode rootNode = mapper.readTree(content.toString());
    if (rootNode.get("release_date") == null || rootNode.get("release_date").asText().isEmpty()) {
      return null;
    }
    Movie movie = new Movie();

    movie.setMedia(new Media());

    List <Genre> genres = new ArrayList<>();
    for (JsonNode genreNode : rootNode.get("genres")) {
      Genre genre = new Genre();
      genre.setId(genreNode.get("id").asInt());
      genre.setName(genreNode.get("name").asText());
      genres.add(genre);
    }
    Set<Genre> genresSet = new HashSet<>(genres);

    List <Company> productionCompanies = new ArrayList<>();
    for (JsonNode companyNode : rootNode.get("production_companies")) {
      Optional<Company> companyData = companyRepository.findByTmdbId(companyNode.get("id").asInt());
      if (!companyData.isPresent()) {
        Company company = new Company();
        company.setTmdbId(companyNode.get("id").asInt());
        company.setName(companyNode.get("name").asText());
        productionCompanies.add(companyRepository.save(company));
      }
      else {
        productionCompanies.add(companyData.get());
      }
    }
    Set<Company> productionCompaniesSet = new HashSet<>(productionCompanies);

    List <Country> productionCountries = new ArrayList<>();
    for (JsonNode countryNode : rootNode.get("production_countries")) {
      Country country = new Country();
      country.setId(countryNode.get("iso_3166_1").asText());
      country.setEnglishName(countryNode.get("name").asText());
      productionCountries.add(country);
    }
    Set<Country> productionCountriesSet = new HashSet<>(productionCountries);

    List <Language> spokenLanguages = new ArrayList<>();
    for (JsonNode languageNode : rootNode.get("spoken_languages")) {
      Language language = new Language();
      language.setId(languageNode.get("iso_639_1").asText());
      language.setEnglishName(languageNode.get("name").asText());
      spokenLanguages.add(language);
    }
    Set<Language> spokenLanguagesSet = new HashSet<>(spokenLanguages);


    movie.setTitle(rootNode.get("title").asText());
    movie.setOriginalTitle(rootNode.get("original_title").asText());
    movie.setOverview(rootNode.get("overview").asText());
    movie.setReleaseDate(LocalDate.parse(rootNode.get("release_date").asText()));
    movie.setPosterPath(rootNode.get("poster_path").asText());
    movie.setRevenue(rootNode.get("revenue").asText());
    movie.setTmdbId(id);
    movie.setBudget(rootNode.get("budget").asInt());
    movie.setImdbId(rootNode.get("imdb_id").asText());
    movie.setHomepage(rootNode.get("homepage").asText());
    movie.setTagline(rootNode.get("tagline").asText());
    movie.setAdult(rootNode.get("adult").asBoolean());
    movie.setRuntime(rootNode.get("runtime").asInt());
    movie.setOriginalLanguage(rootNode.get("original_language").asText());
    movie.setStatus(rootNode.get("status").asText());

    movie.getMedia().setRate(rootNode.get("vote_average").asDouble());
    movie.getMedia().setType("0");
    movie.getMedia().setRecommend(0);
    movie.getMedia().setUnrecommend(0);
    movie.getMedia().setVoteCount(rootNode.get("vote_count").asInt());
    movie.getMedia().setPopularity(rootNode.get("popularity").asDouble());
    movie.getMedia().setOriginalLanguage(rootNode.get("original_language").asText());
    movie.getMedia().setFinalPopularity(rootNode.get("popularity").asDouble());
    movie.getMedia().setFinalRate(rootNode.get("vote_average").asDouble());
    movie.getMedia().setFinalVoteCount(rootNode.get("vote_count").asInt());
    movie.getMedia().setGenres(genresSet);
    movie.getMedia().setCompanies(productionCompaniesSet);
    movie.getMedia().setCountries(productionCountriesSet);
    movie.getMedia().setLanguages(spokenLanguagesSet);
    return movie;
  }
}
