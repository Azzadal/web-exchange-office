package com.javaspring.proj.controller;

import com.javaspring.proj.Repository.RateRepository;
import com.javaspring.proj.config.HttpSessionHandshakeInterceptor_personalised;
import com.javaspring.proj.model.Rate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Map;

@RestController
public class RateController {
    @Autowired
    private RateRepository rateRepository;

    private final MessageSendingOperations<String> messagingTemplate;

    @Autowired
    public RateController(MessageSendingOperations<String> messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Scheduled(fixedDelay = 10000)
    public void addRateUR(){
        if (getCount() < 5000) {
            Map<String,BigDecimal> rateUR = genUR();
            Rate rate = new Rate();
            rate.setType("rateUR");
            rate.setRateBuy(rateUR.get("rateBuy"));
            rate.setRateSell(rateUR.get("rateSell"));
            rateRepository.save(rate);
            getRateLib("rateUR");
        }
        else{
            clearRate();
        }
    }

    @Scheduled(fixedDelay = 10000)
    public void addRateER(){
        if (getCount() < 5000) {
            Map<String, BigDecimal> rateER = genER();
            Rate rate = new Rate();
            rate.setType("rateER");
            rate.setRateBuy(rateER.get("rateBuy"));
            rate.setRateSell(rateER.get("rateSell"));
            rateRepository.save(rate);
            getRateLib("rateER");
        }
        else{
            clearRate();
        }
    }

    @Scheduled(fixedDelay = 10000)
    public void addRateUE(){
        if (getCount() < 5000) {
            Map<String,BigDecimal> rateUE = genUE();
            Rate rate = new Rate();
            rate.setType("rateUE");
            rate.setRateBuy(rateUE.get("rateBuy"));
            rate.setRateSell(rateUE.get("rateSell"));
            rateRepository.save(rate);
            getRateLib("rateUE");
        }
        else{
            clearRate();
        }
    }

    @Scheduled(fixedDelay = 10000)
    public void addRateEU(){
        if (getCount() < 5000) {
            Map<String,BigDecimal> rateEU = genEU();
            Rate rate = new Rate();
            rate.setType("rateEU");
            rate.setRateBuy(rateEU.get("rateBuy"));
            rate.setRateSell(rateEU.get("rateSell"));
            rateRepository.save(rate);
            getRateLib("rateEU");
        }
        else{
            clearRate();
        }
    }

    private void getRateLib(String pair){
        String destination = "/topic/" + pair;
        this.messagingTemplate.convertAndSend(destination, rateRepository.findFirst50ByTypeOrderByIdDesc(pair));
    }

    private Map<String, BigDecimal> genUR(){
        return Rate.generateRate(60,70,50,60);
    }

    private Map<String, BigDecimal> genER()
    {
        return Rate.generateRate(20,30,10,20);
    }

    private Map<String, BigDecimal> genUE(){
        return Rate.generateRate(22,28,15,22);
    }

    private Map<String, BigDecimal> genEU(){
        return Rate.generateRate(31,40,23,30);
    }

    @GetMapping(value = "clear_rate")
    private void clearRate(){
        rateRepository.clearRate();
    }

    @GetMapping(value = "count")
    private long getCount(){
        return rateRepository.count();
    }


}
