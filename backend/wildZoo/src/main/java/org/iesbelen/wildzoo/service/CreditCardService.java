package org.iesbelen.wildzoo.service;

import org.iesbelen.wildzoo.model.Continent;
import org.iesbelen.wildzoo.model.CreditCard;

import java.util.List;
import java.util.Optional;

public interface CreditCardService {
    public List<CreditCard> getAll();
    public Optional<CreditCard> find(long id);
    public boolean delete(long id);
    public CreditCard update(CreditCard creditCard);
}
