package com.backend.project.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.backend.project.model.Company;
import com.backend.project.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://127.0.0.1:8081")
@RestController
@RequestMapping("/api")
public class CompanyController {

  @Autowired
  CompanyRepository companyRepository;
  @GetMapping("/company/all")
  public ResponseEntity<List<Company>> getAllCompanies() {
    try {
      List<Company> companies = new ArrayList<Company>();

      companyRepository.findAll().forEach(companies::add);
      if (companies.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(companies, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @GetMapping("/company/{id}")
  public ResponseEntity<Company> getCompanyById(@PathVariable("id") int id, @RequestParam(required = false) String idSource) {
    if (idSource.equals("tmdb")){
      Optional<Company> companyData = companyRepository.findByTmdbId(id);
      if (companyData.isPresent()) {
        return new ResponseEntity<>(companyData.get(), HttpStatus.OK);
      } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
    } else {
      Optional<Company> companyData = companyRepository.findById(id);
      if (companyData.isPresent()) {
        return new ResponseEntity<>(companyData.get(), HttpStatus.OK);
      } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
    }
  }
  @PostMapping("/company")
  public List<Company> createCompanies(@RequestBody List<Company> companiesList) {
//        try {
    for (Company c: companiesList) {
      Optional<Company> companyData = companyRepository.findByTmdbId(c.getTmdbId());
      if (companyData.isPresent()) {
        Company _company = companyData.get();
        System.out.println("Modify");
        _company.setHeadquarters(c.getHeadquarters());
        _company.setName(c.getName());
        _company.setDescription(c.getDescription());
        _company.setHomepage(c.getHomepage());
        _company.setParentCompany(c.getParentCompany());
        _company.setOriginCountry(c.getOriginCountry());
        _company.setLogoPath(c.getLogoPath());

        Company __company = companyRepository.save(_company);
      } else {
        Company _company = companyRepository.save(c);
      }
    }
    return companiesList;
  }
}