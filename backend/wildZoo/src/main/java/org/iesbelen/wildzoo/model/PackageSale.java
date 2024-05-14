package org.iesbelen.wildzoo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "Package_Sales")
@Data
@NoArgsConstructor
public class PackageSale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "package_sales_id")
    private long id;

    private Date date;
    private long guests;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false,foreignKey = @ForeignKey(name = "FK_USER_PACKAGESALE"))
    @JsonIgnoreProperties({"hibernateLazyInitializer", "packageSales"})
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "package_id", nullable = false,foreignKey = @ForeignKey(name = "FK_PACKAGE_PACKAGESALE"))
    @JsonIgnoreProperties({"hibernateLazyInitializer", "packageSales"})
    private Package aPackage;
}
