package org.iesbelen.wildzoo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "Package")
@Data
@NoArgsConstructor
public class Package {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "package_id")
    private long id;

    private String name;
    @Column(length = 500)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "type_tour_id", nullable = false,foreignKey = @ForeignKey(name = "FK_PACKAGE_TYPE_TOUR"))
    @JsonIgnoreProperties({"hibernateLazyInitializer", "packages"})
    private TypeTour typeTour;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "package_type_id", nullable = false,foreignKey = @ForeignKey(name = "FK_PACKAGE_PACKAGE_TOUR"))
    @JsonIgnoreProperties({"hibernateLazyInitializer", "packages"})
    private PackageType packageType;

    @ManyToMany(
            mappedBy = "packages"
    )
    @JsonIgnoreProperties({"hibernateLazyInitializer, packages"})
    private List<PackageService> packageServices;

    @OneToMany(mappedBy = "aPackage", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"hibernateLazyInitializer, aPackage"})
    private List<PackageSale> packageSales;
}
