package org.iesbelen.wildzoo.service;

import org.iesbelen.wildzoo.model.SponsorAnimal;

import java.util.List;
import java.util.Optional;

public interface SponsorAnimalService {
    public List<SponsorAnimal> getAll();
    public Optional<SponsorAnimal> getAdoptionAnimalByAnimalId(long animalId);
}
