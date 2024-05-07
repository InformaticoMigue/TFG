package org.iesbelen.wildzoo.service.impl;

import org.iesbelen.wildzoo.model.AdoptionAnimal;
import org.iesbelen.wildzoo.repository.AdoptionAnimalRepository;
import org.iesbelen.wildzoo.service.AdoptionAnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdoptionAnimalServiceImpl implements AdoptionAnimalService {
    @Autowired
    AdoptionAnimalRepository AdoptionAnimalRepository;

    @Override
    public List<AdoptionAnimal> getAll() {
        List<AdoptionAnimal> animals = (List<AdoptionAnimal>) this.AdoptionAnimalRepository.findAll();
        return animals.stream()
                .filter(adoptionAnimal -> adoptionAnimal.getAdoption() == null)
                .toList();
    }

    public Optional<AdoptionAnimal> getAdoptionAnimalByAnimalId(long animalId) {
        return this.AdoptionAnimalRepository.findByAnimalId(animalId);
    }

}
