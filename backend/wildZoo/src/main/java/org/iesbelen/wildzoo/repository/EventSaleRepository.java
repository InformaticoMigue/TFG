package org.iesbelen.wildzoo.repository;

import org.iesbelen.wildzoo.model.EventSale;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventSaleRepository extends CrudRepository<EventSale,Long> {
}
