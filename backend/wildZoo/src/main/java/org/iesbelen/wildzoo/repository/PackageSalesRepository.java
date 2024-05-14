package org.iesbelen.wildzoo.repository;

import org.iesbelen.wildzoo.model.PackageSale;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PackageSalesRepository extends CrudRepository<PackageSale,Long> {
}
