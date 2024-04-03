package org.iesbelen.wildzoo.repository;

import org.iesbelen.wildzoo.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {
}
