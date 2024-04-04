package org.iesbelen.wildzoo.controller;

import org.iesbelen.wildzoo.record.Package.ResponseWrapperPackage;
import org.iesbelen.wildzoo.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "packages")
public class PackageController {
    @Autowired
    PackageService packageService;

    @GetMapping()
    public ResponseEntity<ResponseWrapperPackage> getAll(){
        return new ResponseEntity<>(
                new ResponseWrapperPackage(this.packageService.getAll()),
                HttpStatus.OK);
    }
}
