package com.javasampleapproach.jqueryajax.Repos;

import com.javasampleapproach.jqueryajax.model.Bid;
import org.springframework.data.repository.CrudRepository;

import java.math.BigDecimal;

public interface BidRepository extends CrudRepository<Bid, Integer> {
    Iterable<Bid> findByTypeAndStatus(String type, String status);
    Iterable<Bid> findByType(String type);
}
