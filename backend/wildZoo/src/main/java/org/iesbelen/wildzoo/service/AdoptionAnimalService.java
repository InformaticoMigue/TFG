package org.iesbelen.wildzoo.service;

import org.iesbelen.wildzoo.model.AdoptionAnimal;

import java.util.List;
import java.util.Optional;

public interface AdoptionAnimalService {
    public List<AdoptionAnimal> getAll();
    public Optional<AdoptionAnimal> getAdoptionAnimalByAnimalId(long animalId);
}
