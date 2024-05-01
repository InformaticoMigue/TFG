package org.iesbelen.wildzoo.service;

import org.iesbelen.wildzoo.model.Service;
import org.iesbelen.wildzoo.model.Specie;

import java.util.List;
import java.util.Optional;

public interface ServiceService {
    public List<Service> getAll();
    public Optional<Service> find(long id);
    public boolean delete(long id);
    public Service update(Service service);
}
