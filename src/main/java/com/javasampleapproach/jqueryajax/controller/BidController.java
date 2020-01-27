package com.javasampleapproach.jqueryajax.controller;

import com.javasampleapproach.jqueryajax.Repos.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.javasampleapproach.jqueryajax.model.Bid;

@RestController
@RequestMapping("/")
public class BidController {
    @Autowired
    private BidRepository bidRepository;

    @PostMapping(value = "URBuy")
    public Iterable<Bid> addNewBidURBuy(@RequestBody Bid bid){
        bidRepository.save(bid);
        return bidRepository.findByType("URBuy");
    }

    @GetMapping(value = "URBuy")
    public Iterable<Bid> getURBuyTab(){
        return bidRepository.findByType("URBuy");
    }

    @PostMapping(value = "ERBuy")
    public Iterable<Bid> addNewBidERBuy(@RequestBody Bid bid){
        bidRepository.save(bid);
        return bidRepository.findByType("ERBuy");
    }

    @PostMapping(value = "UEBuy")
    public Iterable<Bid> addNewBidUEBuy(@RequestBody Bid bid){
        bidRepository.save(bid);
        return bidRepository.findByType("UEBuy");
    }

    @PostMapping(value = "EUBuy")
    public Iterable<Bid> addNewBidEUBuy(@RequestBody Bid bid){
        bidRepository.save(bid);
        return bidRepository.findByType("EUBuy");
    }


    @PostMapping(value = "URSell")
    public Iterable<Bid> addNewBidURSell(@RequestBody Bid bid){
        bidRepository.save(bid);
        return bidRepository.findByType("URSell");
    }

    @GetMapping(value = "URSell")
    public Iterable<Bid> getURSellTab(){
        return bidRepository.findByType("URSell");
    }

    @PostMapping(value = "ERSell")
    public Iterable<Bid> addNewBidERSell(@RequestBody Bid bid){
        bidRepository.save(bid);
        return bidRepository.findByType("ERSell");
    }

    @PostMapping(value = "UESell")
    public Iterable<Bid> addNewBidUESell(@RequestBody Bid bid){
        bidRepository.save(bid);
        return bidRepository.findByType("UESell");
    }

    @PostMapping(value = "EUSell")
    public Iterable<Bid> addNewBidEUSell(@RequestBody Bid bid){
        bidRepository.save(bid);
        return bidRepository.findByType("EUSell");
    }




}