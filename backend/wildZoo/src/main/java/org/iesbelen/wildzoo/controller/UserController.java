package org.iesbelen.wildzoo.controller;

import org.iesbelen.wildzoo.exception.ErrorNotFound;
import org.iesbelen.wildzoo.exception.NotFoundException;
import org.iesbelen.wildzoo.model.User;
import org.iesbelen.wildzoo.record.User.ResponseWrapperUser;
import org.iesbelen.wildzoo.record.User.ResponseWrapperUserOne;
import org.iesbelen.wildzoo.service.UserService;
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
@RequestMapping("users")
public class UserController {
    @Autowired
    UserService userService;
    @GetMapping()
    public ResponseEntity<ResponseWrapperUser> getAll(){
        return new ResponseEntity<>(new ResponseWrapperUser(this.userService.getAll()), HttpStatus.OK);
    }
    @GetMapping("{id}")
    public ResponseEntity<ResponseWrapperUserOne> one(@PathVariable long id){
        Optional<User> user = this.userService.find(id);
        if (user.isEmpty()){
            throw new NotFoundException(new ErrorNotFound("User not found", LocalDate.now()));
        }else{
            return new ResponseEntity<>(new ResponseWrapperUserOne(user.get()),HttpStatus.OK);
        }
    }
}
