package com.javaspring.proj.Repository;

import com.javaspring.proj.model.Rate;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface RateRepository extends CrudRepository<Rate, Integer> {
    Iterable<Rate> findByType(String type);
    Iterable<Rate> findFirst50ByTypeOrderByIdDesc(String type);
    @Modifying
    @Transactional
    @Query(value="TRUNCATE TABLE rate RESTART IDENTITY;", nativeQuery=true) void clearRate();
//    @Query(value="SELECT rateBuy FROM rate WHERE type=type ORDER BY id ASC LIMIT 1;", nativeQuery = true) Rate test(String type);
    @Transactional
    @Override
    <S extends Rate> S save(S s);
}
