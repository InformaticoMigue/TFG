package org.iesbelen.wildzoo.service.impl;

import org.iesbelen.wildzoo.model.SponsorAnimal;
import org.iesbelen.wildzoo.repository.SponsorAnimalRepository;
import org.iesbelen.wildzoo.service.SponsorAnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SponsorAnimalServiceImpl implements SponsorAnimalService {
    @Autowired
    SponsorAnimalRepository SponsorAnimalRepository;

    @Override
    public List<SponsorAnimal> getAll() {
        List<SponsorAnimal> animals = (List<SponsorAnimal>) this.SponsorAnimalRepository.findAll();
        return animals.stream()
                .filter(adoptionAnimal -> adoptionAnimal.getSponsor() == null)
                .toList();
    }

    public Optional<SponsorAnimal> getAdoptionAnimalByAnimalId(long animalId) {
        return this.SponsorAnimalRepository.findByAnimalId(animalId);
    }

}
