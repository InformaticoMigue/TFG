package org.iesbelen.wildzoo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "Type_Tour")
@Data
@NoArgsConstructor
public class TypeTour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_tour_id")
    private long id;

    private String name;

    @OneToMany(mappedBy = "typeTour", fetch = FetchType.EAGER)
    private List<Package> packages;
}
