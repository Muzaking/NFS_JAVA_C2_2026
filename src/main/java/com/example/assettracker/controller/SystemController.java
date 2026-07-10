package com.example.assettracker.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class SystemController {

    @GetMapping("/health")
    public Map<String, String> getHealth() {
        return Map.of(
            "status", "UP",
            "service", "support-desk-api"
        );
    }

    @GetMapping("/about")
    public Map<String, String> getAbout() {
        return Map.of(
            "appName", "Support Desk API",
            "version", "1.0.0",
            "description", "API for managing IT support tickets"
        );
    }
}