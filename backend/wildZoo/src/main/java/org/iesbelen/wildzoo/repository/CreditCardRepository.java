package org.iesbelen.wildzoo.repository;

import org.iesbelen.wildzoo.model.CreditCard;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CreditCardRepository extends CrudRepository<CreditCard,Long> {
    Optional<CreditCard> findByNumber(String number);
}
