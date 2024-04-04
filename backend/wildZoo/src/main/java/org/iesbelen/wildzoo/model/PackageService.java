package org.iesbelen.wildzoo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
@Table(name = "Package_Service")
@NoArgsConstructor
public class PackageService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "package_service_id")
    private long id;

    private String name;
    private boolean include;

    @ManyToMany
    @JoinTable(
            name = "Package_Details",
            joinColumns = @JoinColumn(name = "package_service_id", referencedColumnName = "package_service_id"),
            inverseJoinColumns = @JoinColumn(name = "package_id", referencedColumnName = "package_id")
    )
    @JsonIgnore
    private List<Package> packages;
}
