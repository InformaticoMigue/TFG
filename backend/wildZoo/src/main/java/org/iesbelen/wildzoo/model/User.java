package org.iesbelen.wildzoo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Table(name = "User")
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long id;

    private String email;
    private String password;
    private String name;
    @Column(name = "first_surname")
    private String firstSurname;
    @Column(name = "second_surname")
    private String lastSurname;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "user"})
    private List<CreditCard> creditCardList;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "user"})
    private List<Ticket> tickets;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "user"})
    private List<Adoption> adoptions;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "user"})
    private List<PackageSales> packageSales;
}
