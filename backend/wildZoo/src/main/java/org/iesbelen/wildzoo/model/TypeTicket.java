package org.iesbelen.wildzoo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "Type_ticket")
@Data
@NoArgsConstructor
public class TypeTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_ticket_id")
    private long id;

    private String name;
    private BigDecimal price;
    private String description;

    @OneToMany(mappedBy = "typeTicket")
    @JsonIgnore
    private List<Ticket> tickets;

}
