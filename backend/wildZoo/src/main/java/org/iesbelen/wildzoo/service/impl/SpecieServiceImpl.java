package org.iesbelen.wildzoo.service.impl;

import org.iesbelen.wildzoo.model.Specie;
import org.iesbelen.wildzoo.repository.SpecieRepository;
import org.iesbelen.wildzoo.service.SpecieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SpecieServiceImpl implements SpecieService {
    @Autowired
    SpecieRepository specieRepository;


    @Override
    public List<Specie> getAll() {
        return (List<Specie>) this.specieRepository.findAll();
    }

    @Override
    public Optional<Specie> find(long id) {
        return this.specieRepository.findById(id);
    }

    @Override
    public boolean delete(long id) {
        return false;
    }

    @Override
    public Specie update(Specie specie) {
        return null;
    }
}
