package org.iesbelen.wildzoo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "Sponsor")
@Data
@NoArgsConstructor

public class Sponsor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sponsor_id")
    private long id;

    private LocalDate date;

    @OneToOne
    @JoinColumn(name = "sponsor_animal_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "animal","sponsor"})
    private SponsorAnimal sponsorAnimal;

    @OneToOne
    @JoinColumn(name = "animal_id")
    private Animal animal;

    @ManyToOne(fetch = FetchType.EAGER,optional = false)
    @JoinColumn(name = "user_id", nullable = false,foreignKey = @ForeignKey(name = "FK_USER_ADOPTION"))
    private User user;
}
