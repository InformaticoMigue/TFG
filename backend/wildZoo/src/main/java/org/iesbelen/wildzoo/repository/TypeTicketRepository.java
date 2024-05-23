package org.iesbelen.wildzoo.repository;

import org.iesbelen.wildzoo.model.TypeTicket;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeTicketRepository extends CrudRepository<TypeTicket, Long> {
}
