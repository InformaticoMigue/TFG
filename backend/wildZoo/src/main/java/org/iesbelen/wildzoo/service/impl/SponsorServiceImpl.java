package org.iesbelen.wildzoo.service.impl;

import org.iesbelen.wildzoo.model.Sponsor;
import org.iesbelen.wildzoo.repository.SponsorRepository;
import org.iesbelen.wildzoo.service.SponsorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SponsorServiceImpl implements SponsorService {

    @Autowired
    SponsorRepository sponsorRepository;
    @Override
    public List<Sponsor> getAll() {
        return (List<Sponsor>) this.sponsorRepository.findAll();
    }

    @Override
    public Sponsor save(Sponsor sponsor) {
        return sponsorRepository.save(sponsor);
    }
}
