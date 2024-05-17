package org.iesbelen.wildzoo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Table(name = "Event_Sale")
public class EventSale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDate registrationDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false,foreignKey = @ForeignKey(name = "FK_USER_EVENTSALE"))
    @JsonIgnoreProperties({"hibernateLazyInitializer", "eventSales"})
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false, foreignKey = @ForeignKey(name = "EVENT_EVENTSALE"))
    @JsonIgnoreProperties({"hibernateLazyInitializer", "eventSales"})
    private Event event;

}