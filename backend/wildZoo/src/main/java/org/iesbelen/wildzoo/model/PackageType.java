package org.iesbelen.wildzoo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "Package_Type")
@Data
@NoArgsConstructor
public class PackageType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "package_type_id")
    private long id;

    private int min_size;
    private int max_size;
    private BigDecimal price_per_person;

    @OneToMany(mappedBy = "packageType", fetch = FetchType.EAGER)
    private List<Package> packages;
}
