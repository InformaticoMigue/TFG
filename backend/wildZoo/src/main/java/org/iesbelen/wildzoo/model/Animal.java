package org.iesbelen.wildzoo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@Table(name = "Animal")
@Entity
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "animal_id")
    private long id;

    private String name;
    private int age;

    @Column(length = 1000)
    private String description;

    @Column(name = "feeding")
    private String feeding;
    private BigDecimal weight;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "specie_id", nullable = false, foreignKey = @ForeignKey(name = "FK_SPECIE_ANIMAL"))
    @JsonIgnoreProperties({"hibernateLazyInitializer", "animals"})
    private Specie specie;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "continent_id", nullable = false, foreignKey = @ForeignKey(name = "FK_CONTINENT_ANIMAL"))
    @JsonIgnoreProperties({"hibernateLazyInitializer", "animals"})
    private Continent continent;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "class_id", nullable = false, foreignKey = @ForeignKey(name = "FK_CLASS_ANIMAL"))
    @JsonIgnoreProperties({"hibernateLazyInitializer", "animals"})
    private AClass aClass;

    @ManyToMany(
            mappedBy = "animals"
    )
    @JsonIgnoreProperties({"hibernateLazyInitializer", "animals"})
    private List<Event> events;
    @OneToOne(
            mappedBy = "animal"
    )
    @JsonIgnore
    private SponsorAnimal sponsorAnimal;
    @OneToOne(
            mappedBy = "animal"
    )
    @JsonIgnore
    private Sponsor sponsor;
}
