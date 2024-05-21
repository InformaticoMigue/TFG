package org.iesbelen.wildzoo.controller;


import org.iesbelen.wildzoo.exception.ErrorNotFound;
import org.iesbelen.wildzoo.exception.NotFoundException;
import org.iesbelen.wildzoo.model.Adoption;
import org.iesbelen.wildzoo.model.AdoptionAnimal;
import org.iesbelen.wildzoo.record.Adoption.ResponseWrapperAdoption;
import org.iesbelen.wildzoo.record.Adoption.ResponseWrapperAdoptionOne;
import org.iesbelen.wildzoo.record.Adoption.ResponseWrapperAvailable;
import org.iesbelen.wildzoo.record.Adoption.ResponseWrapperAvailableOne;
import org.iesbelen.wildzoo.record.Animal.ResponseWrapperAnimalOne;
import org.iesbelen.wildzoo.service.AdoptionAnimalService;
import org.iesbelen.wildzoo.service.AdoptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("adoptions")
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

    @GetMapping("/available/{animalId}")
    public ResponseEntity<AdoptionAnimal> getAdoptionAnimalByAnimalId(@PathVariable long animalId) {
        Optional<AdoptionAnimal> optionalAdoptionAnimal = this.adoptionAnimalService.getAdoptionAnimalByAnimalId(animalId);

        if (optionalAdoptionAnimal.isEmpty()){
            throw new NotFoundException(new ErrorNotFound("Adoption animal not found", LocalDate.now()));
        }else{
            return new ResponseEntity<>(optionalAdoptionAnimal.get(),HttpStatus.OK);
        }
    }

    @PostMapping("save")
    public ResponseEntity<ResponseWrapperAdoptionOne> save(@RequestBody Adoption adoption){
        var adoptionSaved = this.adoptionService.save(adoption);
        return new ResponseEntity<>(
                new ResponseWrapperAdoptionOne(adoptionSaved),
                HttpStatus.OK);
    }

}
