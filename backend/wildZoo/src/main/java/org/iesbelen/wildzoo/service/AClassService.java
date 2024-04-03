package org.iesbelen.wildzoo.service;


import org.iesbelen.wildzoo.model.AClass;

import java.util.List;
import java.util.Optional;

public interface AClassService {
    public List<AClass> getAll();
    public Optional<AClass> find(long id);
    public boolean delete(long id);
    public AClass update(AClass aClass);

}
