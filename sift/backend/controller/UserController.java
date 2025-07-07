package com.sift.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/api/public/ping")
    public String ping() {
        return "Server is alive and public!";
    }

    @GetMapping("/api/protected/userinfo")
    public String userInfo() {
        return "This is a protected endpoint!";
    }
}
