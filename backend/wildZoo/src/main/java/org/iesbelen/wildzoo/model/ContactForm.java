package org.iesbelen.wildzoo.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ContactForm {
    private String name;
    private String phone;
    private String email;
    private String description;
}
