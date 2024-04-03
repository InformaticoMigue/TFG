package org.iesbelen.wildzoo.service.impl;

import org.iesbelen.wildzoo.model.Animal;
import org.iesbelen.wildzoo.model.Event;
import org.iesbelen.wildzoo.repository.AnimalRepository;
import org.iesbelen.wildzoo.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AnimalServiceImpl implements AnimalService {

    @Autowired
    AnimalRepository animalRepository;

    @Override
    public List<Animal> getAll() {
        return (List<Animal>) this.animalRepository.findAll();
    }


    @Override
    public Optional<Animal> find(long id) {
        return this.animalRepository.findById(id);
    }

    @Override
    public boolean delete(long id) {
        return false;
    }

    @Override
    public Animal update(Animal animal) {
        return null;
    }
}
