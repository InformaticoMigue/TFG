package org.iesbelen.wildzoo.model;

import lombok.Getter;

import java.io.Serializable;

public record AuthenticationResponseModel(String jwt) implements Serializable {
}
