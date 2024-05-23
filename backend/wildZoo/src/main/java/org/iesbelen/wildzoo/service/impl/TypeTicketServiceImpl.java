package org.iesbelen.wildzoo.service.impl;

import org.iesbelen.wildzoo.model.TypeTicket;
import org.iesbelen.wildzoo.repository.TypeTicketRepository;
import org.iesbelen.wildzoo.service.TypeTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeTicketServiceImpl implements TypeTicketService {

    @Autowired
    TypeTicketRepository typeTicketRepository;

    @Override
    public List<TypeTicket> getAll() {
        return (List<TypeTicket>) this.typeTicketRepository.findAll();
    }

}
