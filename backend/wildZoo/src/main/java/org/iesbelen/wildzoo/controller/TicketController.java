package org.iesbelen.wildzoo.controller;

import org.apache.coyote.Response;
import org.iesbelen.wildzoo.exception.ErrorNotFound;
import org.iesbelen.wildzoo.exception.NotFoundException;
import org.iesbelen.wildzoo.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("tickets")
public class TicketController {
    @Autowired
    TicketService ticketService;

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
