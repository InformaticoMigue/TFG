package org.iesbelen.wildzoo.service;

import org.iesbelen.wildzoo.model.Animal;

import java.util.List;
import java.util.Optional;

public interface AnimalService {
    public List<Animal> getAll();
    public Optional<Animal> find(long id);
    public boolean delete(long id);
    public Animal update(Animal animal);
}
