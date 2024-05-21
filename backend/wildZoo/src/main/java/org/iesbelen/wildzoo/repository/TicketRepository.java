package org.iesbelen.wildzoo.repository;

import org.iesbelen.wildzoo.model.Ticket;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends CrudRepository<Ticket,Long> {
}
