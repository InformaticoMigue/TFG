package org.iesbelen.wildzoo.controller;


import org.iesbelen.wildzoo.exception.ErrorNotFound;
import org.iesbelen.wildzoo.exception.NotFoundException;
import org.iesbelen.wildzoo.model.Sponsor;
import org.iesbelen.wildzoo.model.SponsorAnimal;
import org.iesbelen.wildzoo.record.Sponsor.ResponseWrapperSponsor;
import org.iesbelen.wildzoo.record.Sponsor.ResponseWrapperSponsorOne;
import org.iesbelen.wildzoo.record.Sponsor.ResponseWrapperAvailable;
import org.iesbelen.wildzoo.service.SponsorAnimalService;
import org.iesbelen.wildzoo.service.SponsorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("sponsored")
public class SponsorController {

    @Autowired
    SponsorService sponsorService;

    @Autowired
    SponsorAnimalService sponsorAnimalService;

    @GetMapping()
    public ResponseEntity<ResponseWrapperSponsor> getSponsors(){
        return new ResponseEntity<>(
                new ResponseWrapperSponsor(this.sponsorService.getAll()), HttpStatus.OK);
    }

    @GetMapping("available/sponsors")
    public ResponseEntity<ResponseWrapperAvailable> getSponsorAnimalsAvailable(){
        return new ResponseEntity<>(
                new ResponseWrapperAvailable(this.sponsorAnimalService.getAllWithSponsored()),
                HttpStatus.OK);
    }

    @GetMapping("available")
    public ResponseEntity<ResponseWrapperAvailable> getAllSponsorAnimal(){
        return new ResponseEntity<>(
                new ResponseWrapperAvailable(this.sponsorAnimalService.getAll()),
                HttpStatus.OK);
    }

    @GetMapping("/available/{animalId}")
    public ResponseEntity<SponsorAnimal> getSponsorAnimalByAnimalId(@PathVariable long animalId) {
        Optional<SponsorAnimal> optionalAdoptionAnimal = this.sponsorAnimalService.getAdoptionAnimalByAnimalId(animalId);

        if (optionalAdoptionAnimal.isEmpty()){
            throw new NotFoundException(new ErrorNotFound("Sponsor animal not found", LocalDate.now()));
        }else{
            return new ResponseEntity<>(optionalAdoptionAnimal.get(),HttpStatus.OK);
        }
    }

    @PostMapping("save")
    public ResponseEntity<ResponseWrapperSponsorOne> save(@RequestBody Sponsor sponsor){
        var adoptionSaved = this.sponsorService.save(sponsor);
        return new ResponseEntity<>(
                new ResponseWrapperSponsorOne(adoptionSaved),
                HttpStatus.OK);
    }

}
