package com.javaspring.proj.controller;

import com.javaspring.proj.Repository.BidRepository;
import com.javaspring.proj.Repository.UserRepo;
import com.javaspring.proj.config.HttpSessionHandshakeInterceptor_personalised;
import com.javaspring.proj.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import com.javaspring.proj.model.Bid;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("/")
public class BidController {
    @Autowired
    private BidRepository bidRepository;
    private Bid bid;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private SimpUserRegistry simpUserRegistry;
    private final MessageSendingOperations<String> messagingTemplate;

    private int userCount = 0;
    private ArrayList<Integer> users = new ArrayList<>();
    @Autowired
    public BidController(MessageSendingOperations<String> messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
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

    @MessageMapping("/id/withdraw")
    @SendTo("/topic/ids")
    public Iterable<Bid> withdraw(@RequestBody Bid bid){
        System.out.println(
                "Пользователь " + bid.getUserName() + " купил валюты на сумму " + bid.getTotal()
        );
        User client = userRepo.findByUsername(bid.getUserName());
        client.setCash(client.getCash().subtract(bid.getTotal()));
        userRepo.save(client);
        bidRepository.save(bid);
        return bidRepository.findByStatusOrderByDateDesc("done");
    }
    @MessageMapping("/id/deposit")
    @SendTo("/topic/ids")
    public Iterable<Bid> deposit(@RequestBody Bid bid){
        System.out.println(
                "Пользователь " + bid.getUserName() + " продал валюты на сумму " + bid.getTotal()
        );
        User client = userRepo.findByUsername(bid.getUserName());
        client.setCash(client.getCash().add(bid.getTotal()));
        userRepo.save(client);
        bidRepository.save(bid);
        return bidRepository.findByStatusOrderByDateDesc("done");
    }

    private void getUserCount2(){
        String destination = "/topic/users";
        System.out.println("Юзеров stomp " + userCount);
        this.messagingTemplate.convertAndSend(destination, userCount);
    }

    @GetMapping(value = "users")
    public int getUserCount(){
//        System.out.println("Юзеров " + simpUserRegistry.getUserCount());
//        return simpUserRegistry.getUserCount();
        System.out.println("Юзеров " + userCount);
        return userCount;
    }

    @EventListener(SessionConnectEvent.class)
    public void handleWebsocketConnectListener(SessionConnectEvent event) {
        User client = userRepo.findByUsername(Objects.requireNonNull(event.getUser()).getName());
        if (users.contains(Objects.requireNonNull(event.getUser()).getName().hashCode())){
            users.add(event.getUser().getName().hashCode());
            System.out.println("Вход в аккаунт с другого устройства");
        } else {
            users.add(event.getUser().getName().hashCode());
            userCount++;
            getUserCount2();
        }
    }

    @EventListener(SessionDisconnectEvent.class)
    public void handleWebsocketDisconnectListener(SessionDisconnectEvent event) {
        if ((Collections.frequency(users, Objects.requireNonNull(event.getUser()).getName().hashCode())) > 1){
            users.remove((Integer) Objects.requireNonNull(event.getUser()).getName().hashCode());
        } else {
            users.remove((Integer) Objects.requireNonNull(event.getUser()).getName().hashCode());
            userCount--;
            getUserCount2();
        }
    }

    @GetMapping(value = "tab_compl")
    public Iterable<Bid> getComplitTab(){
        return bidRepository.findByStatusOrderByDateDesc("done");
    }

    @GetMapping(value = "clear_bid")
    public void clear_bid(){
        bidRepository.deleteAll();
    }
}