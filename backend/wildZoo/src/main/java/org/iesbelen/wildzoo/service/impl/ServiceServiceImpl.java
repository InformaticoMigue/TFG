package org.iesbelen.wildzoo.service.impl;

import org.iesbelen.wildzoo.repository.ServiceRepository;
import org.iesbelen.wildzoo.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceServiceImpl implements ServiceService {
    @Autowired
    ServiceRepository serviceRepository;

    @Override
    public List<org.iesbelen.wildzoo.model.Service> getAll() {
        return (List<org.iesbelen.wildzoo.model.Service>) this.serviceRepository.findAll();
    }

    @Override
    public Optional<org.iesbelen.wildzoo.model.Service> find(long id) {
        return Optional.empty();
    }

    @Override
    public boolean delete(long id) {
        return false;
    }

    @Override
    public org.iesbelen.wildzoo.model.Service update(org.iesbelen.wildzoo.model.Service service) {
        return null;
    }
}
