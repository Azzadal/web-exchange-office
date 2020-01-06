package com.javasampleapproach.jqueryajax.controller;

import com.javasampleapproach.jqueryajax.Repos.RateRepository;
import com.javasampleapproach.jqueryajax.model.Rate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
public class RateController {
    @Autowired
    private RateRepository rateRepository;

    @PostMapping(value = "rate")
    public void addRateBuy(@RequestBody Rate rate){
        rateRepository.save(rate);
    }

    @GetMapping(value = "rate/rateUR")
    public Iterable<Rate> getRateLib(){
        return rateRepository.findByType("rateUR");
    }

    @GetMapping(value = "rate/rateER")
    public Iterable<Rate> getRateERLib(){
        return rateRepository.findByType("rateER");
    }

    @GetMapping(value = "rate/rateUE")
    public Iterable<Rate> getRateUELib(){
        return rateRepository.findByType("rateUE");
    }

    @GetMapping(value = "rate/rateEU")
    public Iterable<Rate> getRateEULib(){
        return rateRepository.findByType("rateEU");
    }
    private Rate rate = new Rate();

    @GetMapping(value = "rateUR")
    public Map<String, BigDecimal> generateRateUR(){
        HashMap<String, BigDecimal> map = new HashMap<>();
        int minBuy = 50;
        int maxBuy = 60;
        int minSell = 45;
        int maxSell = 50;
        double randomBuy = (Math.random() * (maxBuy - minBuy)) + minBuy;
        double randomSell = (Math.random() * (maxSell - minSell)) + minSell;

        BigDecimal rateURBuy = new BigDecimal(randomBuy);
        BigDecimal rateURSell = new BigDecimal(randomSell);

        rate.setRateBuy(rateURBuy.setScale(2, BigDecimal.ROUND_CEILING));
        rate.setRateSell(rateURSell.setScale(2, BigDecimal.ROUND_CEILING));

        BigDecimal govno = rate.getRateBuy();
        BigDecimal parasha = rate.getRateSell();
        map.put("rateBuy", govno);
        map.put("rateSell", parasha);
        return map;
    }

    @GetMapping(value = "rateER")
    public Map<String, BigDecimal> generateRateER(){
        HashMap<String, BigDecimal> map = new HashMap<>();
        int minBuy = 10;
        int maxBuy = 20;
        int minSell = 5;
        int maxSell = 10;
        double randomBuy = (Math.random() * (maxBuy - minBuy)) + minBuy;
        double randomSell = (Math.random() * (maxSell - minSell)) + minSell;

        BigDecimal rateURBuy = new BigDecimal(randomBuy);
        BigDecimal rateURSell = new BigDecimal(randomSell);

        rate.setRateBuy(rateURBuy.setScale(2, BigDecimal.ROUND_CEILING));
        rate.setRateSell(rateURSell.setScale(2, BigDecimal.ROUND_CEILING));

        BigDecimal govno = rate.getRateBuy();
        BigDecimal parasha = rate.getRateSell();
        map.put("rateBuy", govno);
        map.put("rateSell", parasha);
        return map;
    }

    @GetMapping(value = "rateUE")
    public Map<String, BigDecimal> generateRateUE(){
        HashMap<String, BigDecimal> map = new HashMap<>();
        int minBuy = 15;
        int maxBuy = 22;
        int minSell = 10;
        int maxSell = 13;
        double randomBuy = (Math.random() * (maxBuy - minBuy)) + minBuy;
        double randomSell = (Math.random() * (maxSell - minSell)) + minSell;

        BigDecimal rateUEBuy = new BigDecimal(randomBuy);
        BigDecimal rateUESell = new BigDecimal(randomSell);

        rate.setRateBuy(rateUEBuy.setScale(2, BigDecimal.ROUND_CEILING));
        rate.setRateSell(rateUESell.setScale(2, BigDecimal.ROUND_CEILING));

        BigDecimal govno = rate.getRateBuy();
        BigDecimal parasha = rate.getRateSell();
        map.put("rateBuy", govno);
        map.put("rateSell", parasha);
        return map;
    }

}
