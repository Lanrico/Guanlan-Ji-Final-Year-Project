package com.backend.project.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.backend.project.model.Country;
import com.backend.project.model.Genre;
import com.backend.project.model.Collection;

import com.backend.project.model.Movie;
import com.backend.project.repository.CollectionRepository;
import com.backend.project.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${FRONTEND_URL}")
@RestController
@RequestMapping("/api")
public class CollectionController {

  @Autowired
  CollectionRepository collectionRepository;
  @GetMapping("/collection/all")
  public ResponseEntity<List<com.backend.project.model.Collection>> getAllCollections() {
    try {
      List<com.backend.project.model.Collection> collections = new ArrayList<com.backend.project.model.Collection>();

      collectionRepository.findAll().forEach(collections::add);
      if (collections.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(collections, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/collection/{id}")
  public ResponseEntity<com.backend.project.model.Collection> getCollectionById(@PathVariable("id") int id, @RequestParam(required = false) String idSource) {
    if (idSource.equals("tmdb")){
      Optional<com.backend.project.model.Collection> collectionData = collectionRepository.findByTmdbId(id);
      if (collectionData.isPresent()) {
        return new ResponseEntity<>(collectionData.get(), HttpStatus.OK);
      } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
    }
    else {
      Optional<com.backend.project.model.Collection> collectionData = collectionRepository.findById(id);
      if (collectionData.isPresent()) {
        return new ResponseEntity<>(collectionData.get(), HttpStatus.OK);
      } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
    }
  }

  @PostMapping("/collection")
  public List<com.backend.project.model.Collection> createCollections(@RequestBody List<com.backend.project.model.Collection> collectionsList) {
//        try {
    for (com.backend.project.model.Collection c: collectionsList) {
      Optional<com.backend.project.model.Collection> collectionData = collectionRepository.findByTmdbId(c.getTmdbId());
      if (collectionData.isPresent()) {
        com.backend.project.model.Collection _collection = collectionData.get();
        System.out.println("Modify");
        _collection.setOverview(c.getOverview());
        _collection.setName(c.getName());
        _collection.setPosterPath(c.getPosterPath());

        com.backend.project.model.Collection __collection = collectionRepository.save(_collection);
      } else {
        com.backend.project.model.Collection _collection = collectionRepository.save(c);
      }
    }
    return collectionsList;
  }
}