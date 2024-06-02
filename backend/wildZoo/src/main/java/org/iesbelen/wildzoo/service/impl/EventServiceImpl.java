package org.iesbelen.wildzoo.service.impl;

import org.iesbelen.wildzoo.model.Event;
import org.iesbelen.wildzoo.model.EventSale;
import org.iesbelen.wildzoo.repository.EventRepository;
import org.iesbelen.wildzoo.repository.EventSaleRepository;
import org.iesbelen.wildzoo.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    EventSaleRepository eventSaleRepository;

    @Override
    public List<Event> getAll() {
        return (List<Event>) this.eventRepository.findAll();
    }

    @Override
    public Optional<Event> find(long id) {
        return this.eventRepository.findById(id);
    }

    @Override
    public boolean delete(long id) {
        return false;
    }

    @Override
    public Event update(Event event) {
        return null;
    }

    @Override
    public EventSale updateEventSale(EventSale eventSale) {
        return this.eventSaleRepository.save(eventSale);
    }
}
