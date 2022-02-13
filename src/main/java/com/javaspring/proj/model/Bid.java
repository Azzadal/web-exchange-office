package com.javaspring.proj.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@Entity
public class Bid extends EntityIIdentifier {
    private BigDecimal rate;
    private int quantity;
    private BigDecimal total;
    private String type;
    private String status;
    private Date date;
    private String seller;
    private String buyer;

    public Bid(BigDecimal rate, int quantity, BigDecimal total, String type, String status, Date date, String seller, String buyer) {
        this.rate = rate;
        this.quantity = quantity;
        this.total = total;
        this.type = type;
        this.status = status;
        this.date = date;
        this.seller = seller;
        this.buyer = buyer;
    }

    public Bid() {
    }
}