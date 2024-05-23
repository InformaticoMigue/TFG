package org.iesbelen.wildzoo.controller;

import org.apache.coyote.Response;
import org.iesbelen.wildzoo.exception.ErrorNotFound;
import org.iesbelen.wildzoo.exception.NotFoundException;
import org.iesbelen.wildzoo.model.Ticket;
import org.iesbelen.wildzoo.record.Ticket.ResponseWrapperTicketOne;
import org.iesbelen.wildzoo.record.Ticket.ResponseWrapperTypeTicket;
import org.iesbelen.wildzoo.service.TicketService;
import org.iesbelen.wildzoo.service.TypeTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("tickets")
public class TicketController {
    @Autowired
    TicketService ticketService;

    @Autowired
    TypeTicketService typeTicketService;

    @GetMapping("/types")
    public ResponseEntity<ResponseWrapperTypeTicket> getAll(){
        return new ResponseEntity<>(
                new ResponseWrapperTypeTicket(this.typeTicketService.getAll()),
                HttpStatus.OK
        );
    }

    @PostMapping("/save")
    public ResponseEntity<ResponseWrapperTicketOne> save(@RequestBody Ticket ticket) {
        return new ResponseEntity<>(
                new ResponseWrapperTicketOne(this.ticketService.save(ticket))
                ,HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable long id){
        try {
            boolean deleted = this.ticketService.delete(id);
            if (deleted){
                return ResponseEntity.ok().build();
            }else{
                throw new NotFoundException(new ErrorNotFound("Ticket not found", LocalDate.now()));
            }
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
