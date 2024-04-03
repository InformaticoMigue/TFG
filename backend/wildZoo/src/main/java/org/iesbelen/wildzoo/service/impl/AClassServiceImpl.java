package org.iesbelen.wildzoo.service.impl;


import org.iesbelen.wildzoo.model.AClass;
import org.iesbelen.wildzoo.repository.AClassRepository;
import org.iesbelen.wildzoo.service.AClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AClassServiceImpl implements AClassService {

    @Autowired
    AClassRepository AClassRepository;

    @Override
    public List<AClass> getAll() {
        return (List<AClass>) this.AClassRepository.findAll();
    }

    @Override
    public Optional<AClass> find(long id) {
        return this.AClassRepository.findById(id);
    }

    @Override
    public boolean delete(long id) {
        return false;
    }

    @Override
    public AClass update(AClass aClass) {
        return null;
    }
}
