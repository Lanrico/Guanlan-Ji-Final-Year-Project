package com.backend.project.controller;

import java.util.List;
import java.util.Optional;

import com.backend.project.model.Country;
import com.backend.project.model.Genre;

import com.backend.project.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://127.0.0.1:8081")
@RestController
@RequestMapping("/api")
public class CountryController {

  @Autowired
  CountryRepository countryRepository;

  @PostMapping("/country")
  public List<Country> createCountries(@RequestBody List<Country> countriesList) {
//        try {
    for (Country c: countriesList) {
      Optional<Country> countryData = countryRepository.findById(c.getId());
      if (countryData.isPresent()) {
        Country _country = countryData.get();
        System.out.println("Modify");
        _country.setNativeName(c.getNativeName());
        _country.setEnglishName(c.getEnglishName());

        Country __country = countryRepository.save(_country);
      } else {
        Country _country = countryRepository.save(c);
      }
    }
    return countriesList;
  }

  @GetMapping("/country")
  public List<Country> getAllCountries() {
    return countryRepository.findAll();
  }
}