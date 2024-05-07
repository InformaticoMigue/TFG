package org.iesbelen.wildzoo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "Adoption")
@Data
@NoArgsConstructor
public class Adoption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adoption_id")
    private long id;

    private LocalDate date;

    @OneToOne
    @JoinColumn(name = "adoption_animal_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "animal","adoption"})
    private AdoptionAnimal adoptionAnimal;

    @OneToOne
    @JoinColumn(name = "animal_id")
    private Animal animal;

    @ManyToOne(fetch = FetchType.EAGER,optional = false)
    @JoinColumn(name = "user_id", nullable = false,foreignKey = @ForeignKey(name = "FK_USER_ADOPTION"))
    private User user;
}
