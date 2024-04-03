package org.iesbelen.wildzoo.service.impl;

import org.iesbelen.wildzoo.model.Specie;
import org.iesbelen.wildzoo.model.User;
import org.iesbelen.wildzoo.repository.UserRepository;
import org.iesbelen.wildzoo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Override
    public List<User> getAll() {
       return (List<User>) this.userRepository.findAll();
    }

    @Override
    public Optional<User> find(long id) {
        return this.userRepository.findById(id);
    }

    @Override
    public boolean delete(long id) {
        return false;
    }

    @Override
    public Specie update(User user) {
        return null;
    }
}
