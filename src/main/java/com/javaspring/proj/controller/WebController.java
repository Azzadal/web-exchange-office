package com.javaspring.proj.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {
	
    @RequestMapping(value="/")
    public String homepage(){
        return "greeting.html";
    }

    @RequestMapping(value="/main")
    public String mainpage(){
        return "index.html";
    }
}