package com.javaspring.proj.controller;

import com.javaspring.proj.Repository.UserRepo;
import com.javaspring.proj.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.Collections;
import java.util.Objects;

@RestController
public class UserController {
    @Autowired
    private UserRepo userRepository;
    private SimpUserRegistry simpUserRegistry;
    public UserController() {
    }

    @GetMapping(value = "cash")
    public BigDecimal getUserCash(Principal principal){
        User client = userRepository.findByUsername(principal.getName());
        System.out.println("cash " + client.getCash());
        return client.getCash();
    }

    @GetMapping(value = "user_name")
//    @EventListener(SessionConnectEvent.class)
    public String getUserName(Principal principal){
        User client = userRepository.findByUsername(principal.getName());
        return client.getUsername();
    }
}
