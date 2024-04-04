package org.iesbelen.wildzoo.service.impl;

import org.iesbelen.wildzoo.model.Package;
import org.iesbelen.wildzoo.repository.PackageRepository;
import org.iesbelen.wildzoo.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PackageServiceImpl implements PackageService {
    @Autowired
    PackageRepository packageRepository;


    @Override
    public List<Package> getAll() {
        return (List<Package>) this.packageRepository.findAll();
    }

    @Override
    public Optional<Package> find(long id) {
        return Optional.empty();
    }

    @Override
    public boolean delete(long id) {
        return false;
    }

    @Override
    public Package update(Package pack) {
        return null;
    }
}
