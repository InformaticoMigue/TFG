package org.iesbelen.wildzoo.service;

import org.iesbelen.wildzoo.model.Sponsor;

import java.util.List;

public interface SponsorService {
    public List<Sponsor> getAll();
    public Sponsor save(Sponsor sponsor);

}
