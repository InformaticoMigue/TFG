package org.iesbelen.wildzoo.repository;

import org.iesbelen.wildzoo.model.Continent;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContinentRepository extends CrudRepository<Continent,Long> {
}
