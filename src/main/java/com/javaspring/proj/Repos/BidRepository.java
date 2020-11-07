package com.javaspring.proj.Repos;

import com.javaspring.proj.model.Bid;
import org.springframework.data.repository.CrudRepository;

public interface BidRepository extends CrudRepository<Bid, Integer> {
    Iterable<Bid> findByTypeAndStatus(String type, String status);
    Iterable<Bid> findByType(String type);
    Iterable<Bid> findByStatusOrderByDate(String status);
}
