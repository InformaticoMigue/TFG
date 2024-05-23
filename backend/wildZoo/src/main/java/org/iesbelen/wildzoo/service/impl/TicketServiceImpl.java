package org.iesbelen.wildzoo.service.impl;

import org.iesbelen.wildzoo.model.Ticket;
import org.iesbelen.wildzoo.repository.TicketRepository;
import org.iesbelen.wildzoo.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TicketServiceImpl implements TicketService {

    @Autowired
    TicketRepository ticketRepository;

    @Override
    public Optional<Ticket> find(long id) {
        return this.ticketRepository.findById(id);
    }

    @Override
    public boolean delete(long id) {
        Optional<Ticket> optionalTicket = this.find(id);
        if (optionalTicket.isPresent()) {
            this.ticketRepository.delete(optionalTicket.get());
            return true;
        }
        return false;
    }

    @Override
    public Ticket save(Ticket ticket) {
        return this.ticketRepository.save(ticket);
    }

}
