package org.iesbelen.wildzoo.controller;


import org.iesbelen.wildzoo.model.AdoptionAnimal;
import org.iesbelen.wildzoo.record.Adoption.ResponseWrapperAdoption;
import org.iesbelen.wildzoo.record.Adoption.ResponseWrapperAvailable;
import org.iesbelen.wildzoo.service.AdoptionAnimalService;
import org.iesbelen.wildzoo.service.AdoptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("adoptions")
@CrossOrigin("http://localhost:4200")
public class AdoptionController {

    @Autowired
    AdoptionService adoptionService;
    @Autowired
    AdoptionAnimalService adoptionAnimalService;

    @GetMapping()
    public ResponseEntity<ResponseWrapperAdoption> getAdoptions(){
        return new ResponseEntity<>(
                new ResponseWrapperAdoption(this.adoptionService.getAll()), HttpStatus.OK);
    }
    @GetMapping("available")
    public ResponseEntity<ResponseWrapperAvailable> getAdoptionAnimalsAvailable(){
        return new ResponseEntity<>(
                new ResponseWrapperAvailable(this.adoptionAnimalService.getAll()),
                HttpStatus.OK);
    }
}
