package org.iesbelen.wildzoo.service.impl;

import jakarta.transaction.Transactional;
import org.iesbelen.wildzoo.exception.ErrorNotFound;
import org.iesbelen.wildzoo.exception.NotFoundException;
import org.iesbelen.wildzoo.model.Specie;
import org.iesbelen.wildzoo.model.User;
import org.iesbelen.wildzoo.repository.UserRepository;
import org.iesbelen.wildzoo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
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
    @Transactional
    public User update(User updatedUser) {
        User existingUser = userRepository.findById(updatedUser.getId())
                .orElseThrow(() -> new NotFoundException(new ErrorNotFound("No existe ningun usuario", LocalDate.now())));

        if (updatedUser.getName() != null) existingUser.setName(updatedUser.getName());
        if (updatedUser.getEmail() != null) existingUser.setEmail(updatedUser.getEmail());
        if (updatedUser.getPassword() != null) existingUser.setPassword(updatedUser.getPassword());
        if (updatedUser.getFirstSurname() != null) existingUser.setFirstSurname(updatedUser.getFirstSurname());
        if (updatedUser.getLastSurname() != null) existingUser.setLastSurname(updatedUser.getLastSurname());
        if (updatedUser.getUsername() != null) existingUser.setUsername(updatedUser.getUsername());

        return userRepository.save(existingUser);
    }
    @Override
    @Transactional
    public User createUser(User newUser) {
        return userRepository.save(newUser);
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
