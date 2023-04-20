package com.backend.project.controller;

import com.backend.project.model.Favourite;
import com.backend.project.model.Media;
import com.backend.project.model.Movie;
import com.backend.project.model.User;
import com.backend.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins = "http://127.0.0.1:8081")
@RestController
@RequestMapping("/api")
public class UserController {

  @Autowired
  UserRepository userRepository;

  @GetMapping("/user")
  public ResponseEntity<Optional<User>> findUser(
      @RequestParam(required = false) String id,
      @RequestParam(required = false) String email
  ) {
    if (id != null) {
      Optional<User> _user = userRepository.findById(Integer.valueOf(id));
      if (_user.isPresent()) {
        _user.get().setReviews(null);
        _user.get().setFavourites(null);
        return new ResponseEntity<>(_user, HttpStatus.OK);
      }
      else {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      }
    }
    else if (email != null) {
      Optional<User> _user = userRepository.findByEmail(email);
      if (_user.isPresent()) {
        _user.get().setReviews(null);
        _user.get().setFavourites(null);
        _user.get().setHistories(null);
        return new ResponseEntity<>(_user, HttpStatus.OK);
      }
      else {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      }
    }
    else {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/user/create")
  public ResponseEntity<User> createUser(@RequestBody User user) {
    Optional<User> userData = userRepository.findByEmail(user.getEmail());
    if (userData.isPresent()){
      System.out.println("modify");
      User _user = userData.get();
      _user.setBirthday(user.getBirthday());
      _user.setCountry(user.getCountry());
      _user.setName(user.getName());
      _user.setPhone(user.getPhone());
      _user.setType(user.getType());
      _user.setBio(user.getBio());
      _user.setPreferLanguage(user.getPreferLanguage());
      _user.setGenres(user.getGenres());
      userRepository.save(_user);
      return new ResponseEntity<>(HttpStatus.OK);
    }
    else {
      return new ResponseEntity<>(userRepository.save(user), HttpStatus.CREATED);
    }
  }

  @PutMapping("/user/{userId}/update/{column}")
  public ResponseEntity<User> updateColumn(@RequestBody String newData, @PathVariable("userId") Integer userId, @PathVariable("column") String column) {
    Optional<User> userData = userRepository.findById(userId);
    if (userData.isPresent()){
      User _user = userData.get();

      switch (column){
        case "type":
          _user.setType(Integer.valueOf(newData));break;
        default:
      }
      userRepository.save(_user);
      return new ResponseEntity<>(HttpStatus.OK);
    }
    else {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

}
