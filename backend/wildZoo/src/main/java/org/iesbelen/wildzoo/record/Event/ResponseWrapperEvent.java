package org.iesbelen.wildzoo.record.Event;

import org.iesbelen.wildzoo.model.Event;

import java.util.List;

public record ResponseWrapperEvent(List<Event> data) {
}
