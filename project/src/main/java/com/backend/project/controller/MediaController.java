package com.backend.project.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import com.backend.project.model.Media;
import com.backend.project.model.Movie;

import com.backend.project.model.Review;
import com.backend.project.model.User;
import com.sun.org.apache.bcel.internal.generic.ACONST_NULL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.project.repository.MovieRepository;
import com.backend.project.repository.MediaRepository;

@CrossOrigin(origins = "${FRONTEND_URL}")
@RestController
@RequestMapping("/api")
public class MediaController {

  @Autowired
  MediaRepository mediaRepository;

  @GetMapping("/media/all")
  public ResponseEntity<List<Media>> getAllMedia() {
    try {
      List<Media> mediaList = new ArrayList<Media>();


      List<Media> ml = mediaRepository.findAll();//.forEach(mediaList::add);
      for (Media m:ml) {
        m.setMovie(null);
        m.setUsers(null);
        m.setReviews(null);
        mediaList.add(m);
      }

      if (mediaList.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(mediaList, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @GetMapping("/media/{id}")
  public ResponseEntity<Media> getMediaById(@PathVariable("id") Integer id) {
    try {
      Optional<Media> mediaData = mediaRepository.findById(id);
      if (mediaData.isPresent()) {
        Media media = mediaData.get();
        media.setReviews(null);
        return new ResponseEntity<>(mediaData.get(), HttpStatus.OK);
      }
      else {
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
      }
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
  }

  @GetMapping("/media/search/{property}/{type}")
  public ResponseEntity<Page<Media>> searchMedia(
      @RequestParam("title") String title,
      @PathVariable("property") String property,
      @RequestParam(required = false) String pageSize,
      @RequestParam(required = false) String page,
      @RequestParam(required = false) String order
  ) {
    try {
      int size = pageSize == null ? 20 : Integer.parseInt(pageSize);
      int pageNumber = page == null ? 0 : Integer.parseInt(page);
      Pageable pageable;
      if (order == null) {
        pageable = PageRequest.of(pageNumber, size, Sort.by(property).descending());
      } else {
        switch (order) {
          case "asc":
            pageable = PageRequest.of(pageNumber, size, Sort.by(property).ascending());
            break;
          case "desc":
            pageable = PageRequest.of(pageNumber, size, Sort.by(property).descending());
            break;
          default:
            pageable = PageRequest.of(pageNumber, size, Sort.by(property).descending());
            break;
        }
      }
      Page<Media> mediaList = mediaRepository.findByMovieTitleContaining(title, pageable);
      for (Media m : mediaList) {
        m.setReviews(null);
      }
      return new ResponseEntity<>(mediaList, HttpStatus.OK);
    }
    catch(Exception e){
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
      }
    }

    @GetMapping("/media/rank/{id}")
    public ResponseEntity<Integer> getMediaRank (@PathVariable("id") Integer id){
      try {
        Optional<Media> mediaData = mediaRepository.findById(id);
        if (mediaData.isPresent()) {
          Media media = mediaData.get();
          media.setReviews(null);
          int rank = mediaRepository.getMediaRank(media.getFinalRate()) + 1;
          return new ResponseEntity<>(rank, HttpStatus.OK);
        } else {
          return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
      } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
      }
    }

    @GetMapping("/media/top/{property}/{type}")
    public ResponseEntity<Page<Media>> findTrendingMedia (
        @PathVariable("type") String type,
        @PathVariable("property") String property,
        @RequestParam(required = false) String pageSize,
        @RequestParam(required = false) String page,
        @RequestParam(required = false) String order,
        @RequestParam(required = false) String genres,
        @RequestParam(required = false) String startDate,
        @RequestParam(required = false) String endDate,
        @RequestParam(required = false) String language,
        @RequestParam(required = false) Double minRate,
        @RequestParam(required = false) Double maxRate,
        @RequestParam(required = false) Integer minRuntime,
        @RequestParam(required = false) Integer maxRuntime
  ){
      try {
        int size = pageSize == null ? 20 : Integer.parseInt(pageSize);
        int pageNumber = page == null ? 0 : Integer.parseInt(page);
        String typeCode;
        Pageable pageable;
        List<Integer> genresList = new ArrayList<>();
        if (genres != null) {
          List<String> tmp = Arrays.asList(genres.split("and"));
          genresList = tmp.stream().map(Integer::parseInt).collect(Collectors.toList());
        }
        LocalDate startDate1 = startDate != null ? LocalDate.parse(startDate, DateTimeFormatter.ofPattern("dd-MM-yyyy")) : null;
        LocalDate endDate1 = endDate != null ? LocalDate.parse(endDate, DateTimeFormatter.ofPattern("dd-MM-yyyy")) : null;
        if (order == null) {
          pageable = PageRequest.of(pageNumber, size, Sort.by(property).descending());
        } else {
          switch (order) {
            case "asc":
              pageable = PageRequest.of(pageNumber, size, Sort.by(property).ascending());
              break;
            case "desc":
              pageable = PageRequest.of(pageNumber, size, Sort.by(property).descending());
              break;
            default:
              pageable = PageRequest.of(pageNumber, size, Sort.by(property).descending());
              break;
          }
        }
        if (type == null) {
          typeCode = "0";
        } else {
          switch (type) {
            case "game":
              typeCode = "1";
              break;
            case "music":
              typeCode = "2";
              break;
            default:
              typeCode = "0";
              break;
          }
        }
        Specification<Media> spec = MediaSpecification.findMovieByCriteria(genresList, startDate1, endDate1, language, minRate, maxRate, minRuntime, maxRuntime, typeCode);
//    return new ResponseEntity<>(mediaRepository.findAllByType(pageable, typeCode, spec), HttpStatus.OK);
        Page<Media> mediaList = mediaRepository.findAll(spec, pageable);
        for (Media m : mediaList) {
          m.setReviews(null);
        }
        return new ResponseEntity<>(mediaList, HttpStatus.OK);
      } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
      }
    }

}