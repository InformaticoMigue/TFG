package org.iesbelen.wildzoo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Continent")
public class Continent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "continent_id")
    private long id;

    private String name;
    private String description;

    @OneToMany(mappedBy = "continent", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "continent"})
    private List<Animal> animals;
}
