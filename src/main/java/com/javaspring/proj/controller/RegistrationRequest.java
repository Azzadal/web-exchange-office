package com.javaspring.proj.controller;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class RegistrationRequest {
    @NotEmpty
    private String login;
    @NotEmpty
    private String username;
    @NotEmpty
    private String password;
}
