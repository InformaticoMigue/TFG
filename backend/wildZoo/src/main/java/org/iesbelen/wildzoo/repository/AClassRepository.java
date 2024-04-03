package org.iesbelen.wildzoo.repository;


import org.iesbelen.wildzoo.model.AClass;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AClassRepository extends CrudRepository<AClass, Long> {
}
