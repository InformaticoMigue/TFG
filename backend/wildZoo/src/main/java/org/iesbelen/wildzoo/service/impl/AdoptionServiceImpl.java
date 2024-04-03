package org.iesbelen.wildzoo.service.impl;

import org.iesbelen.wildzoo.model.Adoption;
import org.iesbelen.wildzoo.repository.AdoptionRepository;
import org.iesbelen.wildzoo.service.AdoptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdoptionServiceImpl implements AdoptionService {

    @Autowired
    AdoptionRepository adoptionRepository;
    @Override
    public List<Adoption> getAll() {
        return (List<Adoption>) this.adoptionRepository.findAll();
    }
}
