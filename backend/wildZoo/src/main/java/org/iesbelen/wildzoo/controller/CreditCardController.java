package org.iesbelen.wildzoo.controller;

import org.iesbelen.wildzoo.exception.ErrorNotFound;
import org.iesbelen.wildzoo.exception.NotFoundException;
import org.iesbelen.wildzoo.model.CreditCard;
import org.iesbelen.wildzoo.record.CreditCard.ResponseWrapperCreditCardOne;
import org.iesbelen.wildzoo.service.CreditCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping(value = "creditcard")
public class CreditCardController {

    @Autowired
    CreditCardService creditCardService;

    @PostMapping("/update")
    public ResponseEntity<ResponseWrapperCreditCardOne> updateCreditCard(@RequestBody CreditCard creditCard){
        return new ResponseEntity<>(
                new ResponseWrapperCreditCardOne(this.creditCardService.update(creditCard)),
                HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCreditCard(@PathVariable Long id) {
        try {
            boolean deleted = this.creditCardService.delete(id);
            if (deleted) {
                return ResponseEntity.ok().build();
            } else {
                throw new NotFoundException(new ErrorNotFound("Credit card not found", LocalDate.now()));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
