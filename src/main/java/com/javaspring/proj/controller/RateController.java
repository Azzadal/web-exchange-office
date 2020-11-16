package com.javaspring.proj.controller;

import com.javaspring.proj.Repos.RateRepository;
import com.javaspring.proj.model.Rate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Map;

@RestController
public class RateController {
    @Autowired
    private RateRepository rateRepository;

    @Scheduled(fixedDelay = 10000)
    public void addRateUR(){
        if (getCount() < 9999) {
            Map<String,BigDecimal> rateUR = genUR();
            Rate rate = new Rate();
            rate.setType("rateUR");
            rate.setRateBuy(rateUR.get("rateBuy"));
            rate.setRateSell(rateUR.get("rateSell"));
            rateRepository.save(rate);
        }
        else{
            clear_rate();
        }
    }

    @Scheduled(fixedDelay = 10000)
    public void addRateER(){
        if (getCount() < 9999) {
            Map<String, BigDecimal> rateER = genER();
            Rate rate = new Rate();
            rate.setType("rateER");
            rate.setRateBuy(rateER.get("rateBuy"));
            rate.setRateSell(rateER.get("rateSell"));
            rateRepository.save(rate);
        }
        else{
            clear_rate();
        }
    }

    @Scheduled(fixedDelay = 10000)
    public void addRateUE(){
        if (getCount() < 9999) {
            Map<String,BigDecimal> rateUE = genUE();
            Rate rate = new Rate();
            rate.setType("rateUE");
            rate.setRateBuy(rateUE.get("rateBuy"));
            rate.setRateSell(rateUE.get("rateSell"));
            rateRepository.save(rate);
        }
        else{
            clear_rate();
        }
    }

    @Scheduled(fixedDelay = 10000)
    public void addRateEU(){
        if (getCount() < 9999) {
            Map<String,BigDecimal> rateEU = genEU();
            Rate rate = new Rate();
            rate.setType("rateEU");
            rate.setRateBuy(rateEU.get("rateBuy"));
            rate.setRateSell(rateEU.get("rateSell"));
            rateRepository.save(rate);
        }
        else{
            clear_rate();
        }
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

    @GetMapping(value = "rateUR")
    public Map<String, BigDecimal> genUR(){
        return Rate.generateRate(30,160,100,135);
    }

    @GetMapping(value = "rateER")

    public Map<String, BigDecimal> genER()
    {
        return Rate.generateRate(10,20,5,10);
    }

    @GetMapping(value = "rateUE")

    public Map<String, BigDecimal> genUE(){
        return Rate.generateRate(15,22,10,13);
    }

    @GetMapping(value = "rateEU")

    public Map<String, BigDecimal> genEU(){
        return Rate.generateRate(27,50,30,150);
    }

    @GetMapping(value = "clear_rate")
    private void clear_rate(){
        rateRepository.clearRate();
    }

    @GetMapping(value = "count")
    private long getCount(){
        return rateRepository.count();
    }

}
