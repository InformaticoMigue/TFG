package org.iesbelen.wildzoo.controller;

import org.iesbelen.wildzoo.record.Service.ResponseWrapperService;
import org.iesbelen.wildzoo.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "services")
public class ServiceController {

    @Autowired
    ServiceService service;

    @GetMapping()
    public ResponseEntity<ResponseWrapperService> getAll(){
        return new ResponseEntity<>(
                new ResponseWrapperService(this.service.getAll())
                ,HttpStatus.OK);
    }
}
