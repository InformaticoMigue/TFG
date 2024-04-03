package org.iesbelen.wildzoo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@Table(name = "Class")
public class AClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_id")
    private long id;

    private String name;

    @OneToMany(mappedBy = "aClass", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "aclass"})
    private List<Animal> animals;

}


