package org.iesbelen.wildzoo.controller;

import org.iesbelen.wildzoo.exception.ErrorNotFound;
import org.iesbelen.wildzoo.exception.NotFoundException;
import org.iesbelen.wildzoo.model.Event;
import org.iesbelen.wildzoo.record.Animal.ResponseWrapperAnimalOne;
import org.iesbelen.wildzoo.record.Event.ResponseWrapperEvent;
import org.iesbelen.wildzoo.record.Event.ResponseWrapperEventOne;
import org.iesbelen.wildzoo.service.EventService;
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
@RequestMapping(value = "events")
public class EventController {

    @Autowired
    EventService eventService;
    @GetMapping()
    public ResponseEntity<ResponseWrapperEvent> getAll(){
        return new ResponseEntity<>(
                new ResponseWrapperEvent(this.eventService.getAll()), HttpStatus.OK);
    }
    @GetMapping("{id}")
    public ResponseEntity<ResponseWrapperEventOne> one(@PathVariable long id){
        Optional<Event> optionalEvent = this.eventService.find(id);

        if (optionalEvent.isEmpty()){
            throw new NotFoundException(new ErrorNotFound("Event not found", LocalDate.now()));
        }else{
            return new ResponseEntity<>(new ResponseWrapperEventOne(optionalEvent.get()),
                    HttpStatus.OK);
        }
    }
}
