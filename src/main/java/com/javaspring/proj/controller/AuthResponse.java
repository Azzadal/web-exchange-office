package com.javaspring.proj.controller;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
class AuthResponse {
    private String token;
}
