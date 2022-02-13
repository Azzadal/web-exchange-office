package com.javaspring.proj.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Rate extends EntityIIdentifier {
    private BigDecimal rateBuy;
    private BigDecimal rateSell;
    private String type;

    public static Map<String, BigDecimal> generateRate(int minBuy, int maxBuy, int minSell, int maxSell){
        HashMap<String, BigDecimal> map = new HashMap<>();
        double randomBuy = (Math.random() * (maxBuy - minBuy)) + minBuy;
        double randomSell = (Math.random() * (maxSell - minSell)) + minSell;
        BigDecimal buy = new BigDecimal(randomBuy).setScale(2, RoundingMode.CEILING);
        BigDecimal sell = new BigDecimal(randomSell).setScale(2, RoundingMode.CEILING);
        map.put("rateBuy", buy);
        map.put("rateSell", sell);
        return map;
    }
}
