package org.iesbelen.wildzoo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Date;


@Entity
@NoArgsConstructor
@Data
@Table(name = "Credit_Card")
@ToString(exclude = "user")
public class CreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "credit_card_id")
    private long id;

    private String titular;
    private long number;
    @Column(name = "expiration_date", length = 5)
    private String expirationDate;
    private long cvv;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
