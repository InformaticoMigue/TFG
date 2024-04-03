package org.iesbelen.wildzoo.repository;

import org.iesbelen.wildzoo.model.Adoption;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AdoptionRepository extends CrudRepository<Adoption,Long> {
}
