package org.iesbelen.wildzoo.service.impl;

import org.iesbelen.wildzoo.model.CreditCard;
import org.iesbelen.wildzoo.repository.CreditCardRepository;
import org.iesbelen.wildzoo.service.CreditCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CreditCardServiceImpl implements CreditCardService {

    @Autowired
    CreditCardRepository creditCardRepository;

    @Override
    public List<CreditCard> getAll() {
        return null;
    }

    @Override
    public Optional<CreditCard> find(long id) {
        return Optional.empty();
    }

    @Override
    public boolean delete(long id) {
        Optional<CreditCard> creditCard = this.creditCardRepository.findById(id);
        if (creditCard.isPresent()) {
            this.creditCardRepository.delete(creditCard.get());
            return true;
        }
        return false;
    }


    @Override
    public CreditCard update(CreditCard creditCard) {
        return creditCardRepository.save(creditCard);
    }
}
