package org.iesbelen.wildzoo.repository;

import org.iesbelen.wildzoo.model.Event;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends CrudRepository<Event,Long> {
}
