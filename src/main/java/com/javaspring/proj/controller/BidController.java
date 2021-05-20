package com.javaspring.proj.controller;

import com.javaspring.proj.Repository.BidRepository;
import com.javaspring.proj.Repository.UserRepo;
import com.javaspring.proj.model.Bid;
import com.javaspring.proj.model.User;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class BidController {
    private final BidRepository bidRepository;
    private final UserRepo userRepo;

    public BidController(BidRepository bidRepository, UserRepo userRepo) {
        this.bidRepository = bidRepository;
        this.userRepo = userRepo;
    }

    @MessageMapping("/URBuy")
    @SendTo("/topic/buys")
    public Iterable<Bid> addNewBidURBuy(@RequestBody Bid bid){
        bidRepository.save(bid);
        return bidRepository.findByTypeAndStatus("URBuy", "not_done");
    }

    @GetMapping(value = "URBuy")
    public Iterable<Bid> getURBuyTab(){
        return bidRepository.findByTypeAndStatus("URBuy", "not_done");
    }

    @MessageMapping("/ERBuy")
    @SendTo("/topic/buys")
    public Iterable<Bid> addNewBidERBuy(@RequestBody Bid bid){
        bidRepository.save(bid);
        return bidRepository.findByTypeAndStatus("ERBuy", "not_done");
    }

    @GetMapping(value = "ERBuy")
    public Iterable<Bid> getERBuyTab(){
        return bidRepository.findByTypeAndStatus("ERBuy", "not_done");
    }

    @MessageMapping("/UEBuy")
    @SendTo("/topic/buys")
    public Iterable<Bid> addNewBidUEBuy(@RequestBody Bid bid){
        bidRepository.save(bid);
        return bidRepository.findByTypeAndStatus("UEBuy", "not_done");
    }

    @GetMapping(value = "UEBuy")
    public Iterable<Bid> getUEBuyTab(){
        return bidRepository.findByTypeAndStatus("UEBuy", "not_done");
    }

    @MessageMapping("/EUBuy")
    @SendTo("/topic/buys")
    public Iterable<Bid> addNewBidEUBuy(@RequestBody Bid bid){
        bidRepository.save(bid);
        return bidRepository.findByTypeAndStatus("EUBuy", "not_done");
    }

    @GetMapping(value = "EUBuy")
    public Iterable<Bid> getEUBuyTab(){
        return bidRepository.findByTypeAndStatus("EUBuy", "not_done");
    }

    @MessageMapping("/URSell")
    @SendTo("/topic/sells")
    public Iterable<Bid> addNewBidURSell(@RequestBody Bid bid){
        bidRepository.save(bid);
        return bidRepository.findByTypeAndStatus("URSell", "not_done");
    }

    @GetMapping(value = "URSell")
    public Iterable<Bid> getURSellTab(){
        return bidRepository.findByTypeAndStatus("URSell", "not_done");
    }

    @MessageMapping("/ERSell")
    @SendTo("/topic/sells")
    public Iterable<Bid> addNewBidERSell(@RequestBody Bid bid){
        bidRepository.save(bid);
        return bidRepository.findByTypeAndStatus("ERSell", "not_done");
    }

    @GetMapping(value = "ERSell")
    public Iterable<Bid> getERSellTab(){
        return bidRepository.findByTypeAndStatus("ERSell", "not_done");
    }

    @MessageMapping("/UESell")
    @SendTo("/topic/sells")
    public Iterable<Bid> addNewBidUESell(@RequestBody Bid bid){
        bidRepository.save(bid);
        return bidRepository.findByTypeAndStatus("UESell", "not_done");
    }

    @GetMapping(value = "UESell")
    public Iterable<Bid> getUESellTab(){
        return bidRepository.findByTypeAndStatus("UESell", "not_done");
    }

    @MessageMapping("/EUSell")
    @SendTo("/topic/sells")
    public Iterable<Bid> addNewBidEUSell(@RequestBody Bid bid){
        bidRepository.save(bid);
        return bidRepository.findByTypeAndStatus("EUSell", "not_done");
    }

    @GetMapping(value = "EUSell")
    public Iterable<Bid> getEUSellTab(){
        return bidRepository.findByTypeAndStatus("EUSell", "not_done");
    }

    @MessageMapping("/id/execute_deal")
    @SendTo("/topic/ids")
    public Iterable<Bid> executeDeal(@RequestBody Bid bid){
        User buyer = userRepo.findByUsername(bid.getBuyer());
        User seller = userRepo.findByUsername(bid.getSeller());
        buyer.setCash(buyer.getCash().subtract(bid.getTotal()));
        seller.setCash(seller.getCash().add(bid.getTotal()));
        userRepo.save(buyer);
        userRepo.save(seller);
        bidRepository.save(bid);
        return bidRepository.findByStatusOrderByDateDesc("done");
    }

    @GetMapping(value = "tab_compl")
    public Iterable<Bid> getComplitTab(){
        return bidRepository.findByStatusOrderByDateDesc("done");
    }

    @GetMapping(value = "clear_bid")
    public void clear_bid(){
        bidRepository.deleteAll();
    }

    @MessageMapping("/id/testws")
    @SendTo("/topic/testws")
    public void testws(String s){
//        return " okey";
    }
}