package org.iesbelen.wildzoo.service;

import org.iesbelen.wildzoo.model.Continent;

import java.util.List;
import java.util.Optional;

public interface ContinentService {
    public List<Continent> getAll();
    public Optional<Continent> find(long id);
    public boolean delete(long id);
    public Continent update(Continent continent);
}
