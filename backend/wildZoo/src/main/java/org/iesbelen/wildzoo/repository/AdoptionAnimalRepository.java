package org.iesbelen.wildzoo.repository;

import org.iesbelen.wildzoo.model.AdoptionAnimal;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdoptionAnimalRepository extends CrudRepository<AdoptionAnimal,Long> {
}
