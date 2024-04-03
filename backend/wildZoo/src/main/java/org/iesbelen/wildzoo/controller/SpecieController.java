package org.iesbelen.wildzoo.controller;

import org.iesbelen.wildzoo.exception.ErrorNotFound;
import org.iesbelen.wildzoo.exception.NotFoundException;
import org.iesbelen.wildzoo.model.Specie;
import org.iesbelen.wildzoo.record.Specie.ResponseWrapperSpecie;
import org.iesbelen.wildzoo.record.Specie.ResponseWrapperSpecieOne;
import org.iesbelen.wildzoo.service.SpecieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("species")
public class SpecieController {

    @Autowired
    SpecieService specieService;

    @GetMapping()
    public ResponseEntity<ResponseWrapperSpecie> getAll(){
        return new ResponseEntity<>(new ResponseWrapperSpecie(this.specieService.getAll()),
                HttpStatus.OK);

    }

    @GetMapping("{id}")
    public ResponseEntity<ResponseWrapperSpecieOne> one (@PathVariable long id) {
        Optional<Specie> optionalSpecie = this.specieService.find(id);

        if (optionalSpecie.isEmpty()){
            throw new NotFoundException(new ErrorNotFound("Specie not found", LocalDate.now()));
        }else{
            return new ResponseEntity<>( new ResponseWrapperSpecieOne(optionalSpecie.get()), HttpStatus.OK);
        }
    }

}
