package com.javasampleapproach.jqueryajax.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {
	
    @RequestMapping(value="/")
    public String homepage(){
        return "index.html";
    }
}