package org.iesbelen.wildzoo.controller;

import org.iesbelen.wildzoo.exception.ErrorNotFound;
import org.iesbelen.wildzoo.exception.NotFoundException;
import org.iesbelen.wildzoo.model.AClass;
import org.iesbelen.wildzoo.record.AClass.ResponseWrapperAClass;
import org.iesbelen.wildzoo.record.AClass.ResponseWrapperAClassOne;
import org.iesbelen.wildzoo.service.AClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("classes")
@CrossOrigin("http://localhost:4200")
public class AClassController {

    @Autowired
    AClassService aClassService;

    @GetMapping()
    public ResponseEntity<ResponseWrapperAClass> getAll(){
        return new ResponseEntity<>(new ResponseWrapperAClass(this.aClassService.getAll()),HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<ResponseWrapperAClassOne> one(@PathVariable long id) {
        Optional<AClass> aClassOptional = this.aClassService.find(id);

        if (aClassOptional.isEmpty()){
            throw new NotFoundException(new ErrorNotFound("Animal class not found", LocalDate.now()));
        }else{
            return new ResponseEntity<>(new ResponseWrapperAClassOne(aClassOptional.get()),HttpStatus.OK);
        }
    }
}
