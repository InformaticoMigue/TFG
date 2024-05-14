package org.iesbelen.wildzoo.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthenticationRequestModel {
    private String username;
    private String password;
}
