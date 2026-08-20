package com.example.assettracker.controller;

// --- ALL YOUR IMPORTS MUST BE AT THE TOP ---
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.assettracker.dto.TicketResponse;
import com.example.assettracker.dto.UpdateTicketRequest;
import com.example.assettracker.service.TicketService; 

import jakarta.validation.Valid;

// --- YOUR CLASS WRAPPER MUST BE HERE ---
@RestController
@RequestMapping("/api/v1/tickets") // (Change this if your base URL is different)
public class TicketController {

    @Autowired
    private TicketService ticketService;

    // ... (Keep any of your older GET/POST endpoints here) ...

    // --- YOUR NEW PUT ENDPOINT GOES INSIDE THE CLASS ---
    @PutMapping("/{id}")
    public ResponseEntity<TicketResponse> updateTicket(
            @PathVariable String id,
            @Valid @RequestBody UpdateTicketRequest request) {
        
        TicketResponse updatedTicket = ticketService.updateTicket(id, request);
        return ResponseEntity.ok(updatedTicket);
    }
} // <-- DO NOT FORGET THIS FINAL CLOSING BRACE