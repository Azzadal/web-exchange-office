package com.javaspring.proj.Repository;

import com.javaspring.proj.model.Rate;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface RateRepository extends CrudRepository<Rate, Integer> {
    Iterable<Rate> findByType(String type);
    @Modifying
    @Transactional
    @Query(value="TRUNCATE TABLE rate RESTART IDENTITY;", nativeQuery=true)
    void clearRate();
}