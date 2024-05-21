package org.iesbelen.wildzoo.service;

import org.hibernate.sql.Update;
import org.iesbelen.wildzoo.model.Specie;
import org.iesbelen.wildzoo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public List<User> getAll();
    public Optional<User> find(long id);
    public User findByUserName (String username);
    public boolean delete(long id);
    public User update(User user);
    public User createUser(User newUser);
    public User authenticate(String username, String password);
}
