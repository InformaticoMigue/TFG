package org.iesbelen.wildzoo.service;

import org.iesbelen.wildzoo.model.Specie;
import org.iesbelen.wildzoo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public List<User> getAll();
    public Optional<User> find(long id);
    public boolean delete(long id);
    public Specie update(User user);
}
