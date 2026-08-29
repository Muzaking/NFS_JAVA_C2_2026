package com.example.assettracker.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.assettracker.repository.AssetRepository;

@RestController
@RequestMapping("/api/readiness")
public class ReadinessController {

    private final AssetRepository assetRepository;

    public ReadinessController(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    @GetMapping
    public ResponseEntity<Map<String, String>> readiness() {
        Map<String, String> response = new LinkedHashMap<>();

        try {
            // Perform a lightweight database operation to verify connectivity
            assetRepository.count();
            
            // Strictly match the required Exercise 2 JSON output
            response.put("service", "support-desk-api");
            response.put("status", "READY");
            response.put("database", "CONNECTED");
            
            return ResponseEntity.ok(response);
            
        } catch (RuntimeException exception) {
            
            response.put("service", "support-desk-api");
            response.put("status", "NOT_READY");
            response.put("error", "Database readiness check failed.");
            
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
        }
    }
}