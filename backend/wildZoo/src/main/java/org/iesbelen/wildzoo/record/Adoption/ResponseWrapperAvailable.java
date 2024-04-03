package org.iesbelen.wildzoo.record.Adoption;

import org.iesbelen.wildzoo.model.AdoptionAnimal;

import java.util.List;

public record ResponseWrapperAvailable(List<AdoptionAnimal> available) {
}
