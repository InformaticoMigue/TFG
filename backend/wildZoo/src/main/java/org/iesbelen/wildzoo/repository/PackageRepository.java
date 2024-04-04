package org.iesbelen.wildzoo.repository;

import org.iesbelen.wildzoo.model.Package;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PackageRepository extends CrudRepository<Package,Long> {
}
