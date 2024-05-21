package org.iesbelen.wildzoo.service.impl;

import org.iesbelen.wildzoo.model.CreditCard;
import org.iesbelen.wildzoo.model.Package;
import org.iesbelen.wildzoo.model.PackageSale;
import org.iesbelen.wildzoo.repository.PackageRepository;
import org.iesbelen.wildzoo.repository.PackageSalesRepository;
import org.iesbelen.wildzoo.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PackageServiceImpl implements PackageService {
    @Autowired
    PackageRepository packageRepository;

    @Autowired
    PackageSalesRepository packageSalesRepository;

    @Override
    public List<Package> getAll() {
        return (List<Package>) this.packageRepository.findAll();
    }

    @Override
    public Optional<Package> find(long id) {
        return this.packageRepository.findById(id);
    }

    @Override
    public boolean delete(long id) {
        return false;
    }

    @Override
    public Package update(Package pack) {
        return null;
    }
    @Override
    @Transactional
    public PackageSale createPackageSale(PackageSale packageSale) {
        return this.packageSalesRepository.save(packageSale);
    }
    @Override
    public boolean deletePackageSale(long id) {
        Optional<PackageSale> creditCard = this.packageSalesRepository.findById(id);
        if (creditCard.isPresent()) {
            this.packageSalesRepository.delete(creditCard.get());
            return true;
        }
        return false;
    }
}
