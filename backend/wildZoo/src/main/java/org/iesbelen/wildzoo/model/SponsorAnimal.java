package org.iesbelen.wildzoo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "Sponsor_Animal")
@Data
@NoArgsConstructor
public class SponsorAnimal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sponsor_animal_id")
    private long id;

    private BigDecimal price;

    @OneToOne
    @JoinColumn(name = "animal_id")
    private Animal animal;

    @OneToOne(
            mappedBy = "sponsorAnimal"
    )
    @JsonIgnoreProperties({"hibernateLazyInitializer", "sponsorAnimal"})
    private Sponsor sponsor;
}
