package com.javaspring.proj.controller;

import com.javaspring.proj.Repository.UserRepo;
import com.javaspring.proj.model.Role;
import com.javaspring.proj.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collections;

@Controller
public class WebController {
	@Autowired
    private UserRepo userRepo;
    @Autowired
    PasswordEncoder passwordEncoder;

    @RequestMapping(value="/")
    public String mainpage(){
        return "index.html";
    }

    @GetMapping("/registration")
    public String registration(){return "registration.html";}

    @PostMapping("/registration")
    public String addUser(User user){
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        User userFromDb = userRepo.findByUsername(user.getUsername());
        if (userFromDb != null){
            return "registration.html";
        }
        user.setPassword(encodedPassword);
        user.setActive(true);
        user.setRoles(Collections.singleton(Role.USER));
        userRepo.save(user);
        return "redirect:/login";
    }
}