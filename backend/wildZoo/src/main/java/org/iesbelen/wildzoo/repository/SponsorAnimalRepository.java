package org.iesbelen.wildzoo.repository;

import org.iesbelen.wildzoo.model.SponsorAnimal;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SponsorAnimalRepository extends CrudRepository<SponsorAnimal,Long> {
    @Query("SELECT aa FROM SponsorAnimal aa WHERE aa.animal.id = :animalId")
    Optional<SponsorAnimal> findByAnimalId(@Param("animalId") long animalId);

}
