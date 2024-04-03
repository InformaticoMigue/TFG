package org.iesbelen.wildzoo.service;

import org.iesbelen.wildzoo.model.Specie;

import java.util.List;
import java.util.Optional;

public interface SpecieService {

    public List<Specie> getAll();
    public Optional<Specie> find(long id);
    public boolean delete(long id);
    public Specie update(Specie specie);

}
