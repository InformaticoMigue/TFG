package org.iesbelen.wildzoo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "Event")
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private long id;

    private String name;
    private LocalDate date;
    @Column(name = "initial_hour")
    private long initialHour;
    @Column(name = "finish_hour")
    private long finishHour;
    @Column(length = 2000)
    private String description;
    private BigDecimal capacity;
    @ManyToMany
    @JoinTable(
            name = "Event_Animal",
            joinColumns = @JoinColumn(name = "event_id", referencedColumnName = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "animal_id", referencedColumnName = "animal_id")
    )
    @JsonIgnoreProperties({"hibernateLazyInitializer", "events"})
    private List<Animal> animals;

    @OneToMany(mappedBy = "event", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<EventSale> eventSales;

}
