package org.iesbelen.wildzoo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@Table(name = "Specie")
public class Specie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "specie_id")
    private long id;

    private String name;

    @OneToMany(mappedBy = "specie", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "specie"})
    private List<Animal> animals;
}
