package org.iesbelen.wildzoo.repository;

import org.iesbelen.wildzoo.model.Sponsor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SponsorRepository extends CrudRepository<Sponsor,Long> {
}
