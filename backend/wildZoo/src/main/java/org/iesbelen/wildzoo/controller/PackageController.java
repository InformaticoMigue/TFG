package org.iesbelen.wildzoo.controller;

import org.iesbelen.wildzoo.exception.ErrorNotFound;
import org.iesbelen.wildzoo.exception.NotFoundException;
import org.iesbelen.wildzoo.model.Package;
import org.iesbelen.wildzoo.model.PackageSale;
import org.iesbelen.wildzoo.record.Package.ResponseWrapperPackage;
import org.iesbelen.wildzoo.record.Package.ResponseWrapperPackageOne;
import org.iesbelen.wildzoo.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

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

    @GetMapping("{id}")
    public ResponseEntity<ResponseWrapperPackageOne> find(@PathVariable long id){
        Optional<Package> optionalPackage = this.packageService.find(id);

        if (optionalPackage.isEmpty()){
            throw new NotFoundException(new ErrorNotFound("Package not found", LocalDate.now()));
        }else{
            return new ResponseEntity<>(
                    new ResponseWrapperPackageOne(optionalPackage.get()),
                    HttpStatus.OK);
        }
    }

    @PostMapping("create")
    public ResponseEntity<PackageSale> createPackageSale(@RequestBody PackageSale packageSale) {
        PackageSale created = packageService.createPackageSale(packageSale);
        return ResponseEntity.ok(created);
    }

}
