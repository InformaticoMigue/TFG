package org.iesbelen.wildzoo.service;

import org.iesbelen.wildzoo.model.Ticket;

import java.util.Optional;

public interface TicketService {
    public boolean delete(long id);
    public Ticket save(Ticket ticket);
    public Optional<Ticket> find(long id);
}
