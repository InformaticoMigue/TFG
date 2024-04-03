package org.iesbelen.wildzoo.service.impl;

import org.iesbelen.wildzoo.model.Continent;
import org.iesbelen.wildzoo.model.Event;
import org.iesbelen.wildzoo.repository.ContinentRepository;
import org.iesbelen.wildzoo.service.ContinentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ContinentServiceImpl implements ContinentService {

    @Autowired
    ContinentRepository continentRepository;

    @Override
    public List<Continent> getAll() {
        return (List<Continent>) continentRepository.findAll();
    }

    @Override
    public Optional<Continent> find(long id) {
        return this.continentRepository.findById(id);
    }

    @Override
    public boolean delete(long id) {
        return false;
    }

    @Override
    public Continent update(Continent continent) {
        return null;
    }
}
