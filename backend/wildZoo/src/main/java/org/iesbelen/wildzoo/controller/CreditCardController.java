package org.iesbelen.wildzoo.controller;

import org.iesbelen.wildzoo.model.CreditCard;
import org.iesbelen.wildzoo.service.CreditCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "creditcard")
public class CreditCardController {

    @Autowired
    CreditCardService creditCardService;

    @PostMapping("/update")
    public CreditCard updateCreditCard(@RequestBody CreditCard creditCard){
        return this.creditCardService.update(creditCard);
    }
}
