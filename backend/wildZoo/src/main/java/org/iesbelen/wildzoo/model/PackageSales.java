package org.iesbelen.wildzoo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "Package_Sales")
@Data
@NoArgsConstructor
public class PackageSales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "package_sales_id")
    private long id;

    private Date date;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false,foreignKey = @ForeignKey(name = "FK_USER_PACKAGESALES"))
    private User user;

}
