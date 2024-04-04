package org.iesbelen.wildzoo.service;

import org.iesbelen.wildzoo.model.Event;
import org.iesbelen.wildzoo.model.Package;

import java.util.List;
import java.util.Optional;

public interface PackageService {
    public List<Package> getAll();
    public Optional<Package> find(long id);
    public boolean delete(long id);
    public Package update(Package pack);

}
