package com.backend.project.controller;

import com.backend.project.model.Genre;
import com.backend.project.model.Language;
import com.backend.project.repository.GenreRepository;
import com.backend.project.repository.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://127.0.0.1:8081")
@RestController
@RequestMapping("/api")
public class LanguageController {

  @Autowired
  LanguageRepository languageRepository;

  @PostMapping("/language")
  public List<Language> createLanguages(@RequestBody List<Language> languagesList) {
//        try {
    for (Language l: languagesList) {
      Optional<Language> languageData = languageRepository.findById(l.getId());
      if (languageData.isPresent()) {
        Language _language = languageData.get();
        System.out.println("Modify");
        _language.setName(l.getName());
        _language.setEnglishName(l.getEnglishName());

        Language __language = languageRepository.save(_language);
      } else {
      System.out.println(l.getId());
//        l.setId(l.getId());
        Language _language = languageRepository.save(l);
      }
    }
    return languagesList;
  }

  @GetMapping("/language")
  public List<Language> getAllLanguages() {
    return languageRepository.findAll();
  }
}
