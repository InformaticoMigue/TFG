package org.iesbelen.wildzoo.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
public class ErrorNotFound {
    private String message;
    private LocalDate date;
}
