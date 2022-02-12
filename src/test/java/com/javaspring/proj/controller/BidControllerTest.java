package com.javaspring.proj.controller;

import com.javaspring.proj.Repository.BidRepository;
import com.javaspring.proj.model.Bid;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
class BidControllerTest {
    @Autowired
    private BidController bidController;

    @MockBean
    private BidRepository bidRepository;


    void getComplitTab() {
        Bid bid = new Bid(
                new BigDecimal(20.4), 100, new BigDecimal(122.5), "ratebuy", "done", new Date(), "1", "2"
        );
        bidRepository.save(bid);
        Assert.assertNotNull(bidRepository.findByStatusOrderByDateDesc("done"));
    }
}