package org.iesbelen.wildzoo.repository;

import org.iesbelen.wildzoo.model.Specie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecieRepository extends CrudRepository<Specie,Long> {
}
