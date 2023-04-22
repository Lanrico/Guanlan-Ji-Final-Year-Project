package com.backend.project.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
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
}
