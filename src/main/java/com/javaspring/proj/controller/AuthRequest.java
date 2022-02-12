package com.javaspring.proj.controller;

import lombok.Data;

@Data
class AuthRequest {
    private String login;
    private String password;
}
