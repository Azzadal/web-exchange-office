package com.javasampleapproach.jqueryajax.Repos;

import com.javasampleapproach.jqueryajax.model.Bid;
import org.springframework.data.repository.CrudRepository;

public interface BidRepository extends CrudRepository<Bid, Integer> {
    Iterable<Bid> findByType(String type);
}
