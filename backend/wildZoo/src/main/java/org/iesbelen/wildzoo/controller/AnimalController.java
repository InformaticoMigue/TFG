package org.iesbelen.wildzoo.controller;


import org.iesbelen.wildzoo.exception.ErrorNotFound;
import org.iesbelen.wildzoo.exception.NotFoundException;
import org.iesbelen.wildzoo.model.Adoption;
import org.iesbelen.wildzoo.model.AdoptionAnimal;
import org.iesbelen.wildzoo.model.Animal;
import org.iesbelen.wildzoo.record.Adoption.ResponseWrapperAdoption;
import org.iesbelen.wildzoo.record.Animal.ResponseWrapperAnimal;
import org.iesbelen.wildzoo.record.Animal.ResponseWrapperAnimalOne;
import org.iesbelen.wildzoo.service.AdoptionAnimalService;
import org.iesbelen.wildzoo.service.AdoptionService;
import org.iesbelen.wildzoo.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "animals")
public class AnimalController {

    @Autowired
    AnimalService animalService;

    @GetMapping()
    public ResponseEntity<ResponseWrapperAnimal> getAll(){
        return new ResponseEntity<>(new ResponseWrapperAnimal(animalService.getAll()
                ),HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<ResponseWrapperAnimalOne> one(@PathVariable long id){
        Optional<Animal>  optionalAnimal = this.animalService.find(id);

        if (optionalAnimal.isEmpty()){
            throw new NotFoundException(new ErrorNotFound("Animal not found", LocalDate.now()));
        }else{
            return new ResponseEntity<>(new ResponseWrapperAnimalOne(optionalAnimal.get()),
                    HttpStatus.OK);
        }
    }

}
