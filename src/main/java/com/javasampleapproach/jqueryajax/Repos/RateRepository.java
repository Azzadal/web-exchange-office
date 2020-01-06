package com.javasampleapproach.jqueryajax.Repos;

import com.javasampleapproach.jqueryajax.model.Rate;
import org.springframework.data.repository.CrudRepository;

public interface RateRepository extends CrudRepository<Rate, Integer> {
    Iterable<Rate> findByType(String type);
}
