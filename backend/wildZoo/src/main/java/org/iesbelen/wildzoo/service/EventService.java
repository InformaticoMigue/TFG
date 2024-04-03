package org.iesbelen.wildzoo.service;

import org.iesbelen.wildzoo.model.Event;

import java.util.List;
import java.util.Optional;

public interface EventService {
    public List<Event> getAll();
    public Optional<Event> find(long id);
    public boolean delete(long id);
    public Event update(Event event);
}
