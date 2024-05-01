package org.iesbelen.wildzoo.repository;

import org.iesbelen.wildzoo.model.Service;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends CrudRepository<Service, Long> {
}
