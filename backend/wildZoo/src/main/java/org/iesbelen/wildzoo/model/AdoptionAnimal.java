package org.iesbelen.wildzoo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "Adoption_Animal")
@Data
@NoArgsConstructor
public class AdoptionAnimal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adoption_animal_id")
    private long id;

    private BigDecimal price;

    @OneToOne
    @JoinColumn(name = "animal_id")
    private Animal animal;

    @OneToOne(
            mappedBy = "adoptionAnimal"
    )
    @JsonIgnoreProperties({"hibernateLazyInitializer", "adoptionAnimal"})
    private Adoption adoption;
}
