package org.iesbelen.wildzoo.repository;

import org.iesbelen.wildzoo.model.AdoptionAnimal;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdoptionAnimalRepository extends CrudRepository<AdoptionAnimal,Long> {
    @Query("SELECT aa FROM AdoptionAnimal aa WHERE aa.animal.id = :animalId")
    Optional<AdoptionAnimal> findByAnimalId(@Param("animalId") long animalId);

}
