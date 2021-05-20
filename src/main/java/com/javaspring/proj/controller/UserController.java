package com.javaspring.proj.controller;

import com.javaspring.proj.Repository.UserRepo;
import com.javaspring.proj.model.User;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Objects;

@RestController
@RequestMapping("/")
public class UserController {
    private final UserRepo userRepository;
    private int userCount = 0;
    private ArrayList<Integer> users = new ArrayList<>();
    private final MessageSendingOperations<String> messagingTemplate;

    private int loginCount = 0;
    public UserController(MessageSendingOperations<String> messagingTemplate, UserRepo userRepository) {
        this.messagingTemplate = messagingTemplate;
        this.userRepository = userRepository;
    }

    @GetMapping(value = "getusers")
    public Iterable<User> getUsers(){
        return userRepository.findAll();
    }

    @GetMapping(value = "login_count")
    public int getLoginCount(){
        return loginCount;
    }

    @GetMapping(value = "cash")
    public BigDecimal getUserCash(Principal principal){
        User client = userRepository.findByUsername(principal.getName());
        return client.getCash();
    }

    @GetMapping(value = "user_name")
    public String getUserName(Principal principal){
        User client = userRepository.findByUsername(principal.getName());
        return client.getUsername();
    }

    private void getUserCountWS(){
        String destination = "/topic/users";
        this.messagingTemplate.convertAndSend(destination, userCount);
    }

    @GetMapping(value = "users")
    public int getUserCountHTTP(){
        return userCount;
    }


    @EventListener(SessionConnectEvent.class)
    public void handleWebsocketConnectListener(SessionConnectEvent event) {
        if (users.contains(Objects.requireNonNull(event.getUser()).getName().hashCode())){
            users.add(event.getUser().getName().hashCode());
            System.out.println("Вход в аккаунт с другого устройства");
        } else {
            users.add(event.getUser().getName().hashCode());
            userCount++;
            loginCount++;
            getUserCountWS();
        }
    }

    @EventListener(SessionDisconnectEvent.class)
    public void handleWebsocketDisconnectListener(SessionDisconnectEvent event) {
        if ((Collections.frequency(users, Objects.requireNonNull(event.getUser()).getName().hashCode())) > 1){
            users.remove((Integer) Objects.requireNonNull(event.getUser()).getName().hashCode());
        } else {
            users.remove((Integer) Objects.requireNonNull(event.getUser()).getName().hashCode());
            userCount--;
            getUserCountWS();
        }
    }
}
