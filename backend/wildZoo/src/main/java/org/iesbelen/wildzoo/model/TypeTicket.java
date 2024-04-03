package org.iesbelen.wildzoo.model;

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

    @OneToMany(mappedBy = "typeTicket")
    private List<Ticket> ticket;

}
