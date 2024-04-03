package org.iesbelen.wildzoo.controllerAdvice;

import org.iesbelen.wildzoo.exception.ErrorNotFound;
import org.iesbelen.wildzoo.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;
import java.util.Date;

@ControllerAdvice
public class RestExceptionHandler {
    @ExceptionHandler(value = { NotFoundException.class })
    @ResponseBody
    public ResponseEntity<ErrorNotFound> handleMyCustomException(NotFoundException ex) {
        ErrorNotFound error = new ErrorNotFound(ex.getMessage(), LocalDate.now());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}
