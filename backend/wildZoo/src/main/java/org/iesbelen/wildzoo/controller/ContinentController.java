package org.iesbelen.wildzoo.controller;

import org.iesbelen.wildzoo.exception.ErrorNotFound;
import org.iesbelen.wildzoo.exception.NotFoundException;
import org.iesbelen.wildzoo.model.Continent;
import org.iesbelen.wildzoo.record.Continent.ResponseWrapperContinent;
import org.iesbelen.wildzoo.record.Continent.ResponseWrapperContinentOne;
import org.iesbelen.wildzoo.service.ContinentService;
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
@RequestMapping("continents")
public class ContinentController {

    @Autowired
    ContinentService continentService;

    @GetMapping()
    public ResponseEntity<ResponseWrapperContinent> getAll(){
        return new ResponseEntity<>(new ResponseWrapperContinent(continentService.getAll()),HttpStatus.OK);
    }

    @GetMapping( "{id}")
    public ResponseEntity<ResponseWrapperContinentOne> one(@PathVariable long id){
        Optional<Continent> optionalContinent = this.continentService.find(id);

        if (optionalContinent.isEmpty()){
            throw new NotFoundException(new ErrorNotFound("Continent not found", LocalDate.now()));
        }else{
            return new ResponseEntity<>(new ResponseWrapperContinentOne(optionalContinent.get()), HttpStatus.OK);
        }
    }
}
