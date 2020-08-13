package com.javaspring.proj.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Entity
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private BigDecimal rateBuy;
    private BigDecimal rateSell;
    private String type;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getRateBuy() {
        return rateBuy;
    }

    public void setRateBuy(BigDecimal rateBuy) {
        this.rateBuy = rateBuy;
    }

    public BigDecimal getRateSell() {
        return rateSell;
    }

    public void setRateSell(BigDecimal rateSell) {
        this.rateSell = rateSell;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    public Map<String, BigDecimal> generateRate(int minBuy, int maxBuy, int minSell, int maxSell){
        HashMap<String, BigDecimal> map = new HashMap<>();
        double randomBuy = (Math.random() * (maxBuy - minBuy)) + minBuy;
        double randomSell = (Math.random() * (maxSell - minSell)) + minSell;
        BigDecimal rateBuy = new BigDecimal(randomBuy);
        BigDecimal rateSell = new BigDecimal(randomSell);
        setRateBuy(rateBuy.setScale(2, BigDecimal.ROUND_CEILING));
        setRateSell(rateSell.setScale(2, BigDecimal.ROUND_CEILING));
        BigDecimal buy = getRateBuy();
        BigDecimal sell = getRateSell();
        map.put("rateBuy", buy);
        map.put("rateSell", sell);
        return map;
    }
}
