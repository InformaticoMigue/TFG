package org.iesbelen.wildzoo.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class NotFoundException extends RuntimeException{
    private ErrorNotFound errorNotFound;

    public NotFoundException(ErrorNotFound errorNotFound) {
        super(errorNotFound.getMessage());
    }

}
