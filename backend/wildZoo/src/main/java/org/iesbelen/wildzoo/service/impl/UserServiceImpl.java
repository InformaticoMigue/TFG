package org.iesbelen.wildzoo.service.impl;

import org.iesbelen.wildzoo.model.Specie;
import org.iesbelen.wildzoo.model.User;
import org.iesbelen.wildzoo.repository.UserRepository;
import org.iesbelen.wildzoo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

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
    public User update(User user) {
        return this.userRepository.save(user);
    }

    @Override
    public User authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && password.equals(user.getPassword())) {
            return user;
        }
        return null;
    }

    public User findByUserName(String username) {
        return this.userRepository.findByUsername(username);
    }
}
