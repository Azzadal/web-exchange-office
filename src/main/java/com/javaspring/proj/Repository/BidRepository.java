package com.javaspring.proj.Repository;

import com.javaspring.proj.model.Bid;
import org.springframework.data.repository.CrudRepository;

public interface BidRepository extends CrudRepository<Bid, Long> {
    Iterable<Bid> findByTypeAndStatus(String type, String status);
    Iterable<Bid> findByType(String type);
    Iterable<Bid> findByStatusOrderByDateDesc(String status);
}
