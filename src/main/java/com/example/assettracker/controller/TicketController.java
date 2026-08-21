package com.example.assettracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping; // <-- Added GetMapping import
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.assettracker.dto.CreateTicketRequest;
import com.example.assettracker.dto.TicketResponse; 
import com.example.assettracker.dto.UpdateTicketRequest;
import com.example.assettracker.service.TicketService; 

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    // --- NEW: GET ENDPOINT TO FETCH A SINGLE TICKET ---
    @GetMapping("/{id}")
    public ResponseEntity<TicketResponse> getTicketById(@PathVariable String id) {
        TicketResponse ticket = ticketService.getTicketById(id);
        return ResponseEntity.ok(ticket);
    }

    // --- EXISTING: POST ENDPOINT TO CREATE TICKETS ---
    @PostMapping
    public ResponseEntity<TicketResponse> createTicket(
            @Valid @RequestBody CreateTicketRequest request) {
        
        TicketResponse newTicket = ticketService.createTicket(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(newTicket);
    }

    // --- EXISTING: PUT ENDPOINT TO UPDATE TICKETS ---
    @PutMapping("/{id}")
    public ResponseEntity<TicketResponse> updateTicket(
            @PathVariable String id,
            @Valid @RequestBody UpdateTicketRequest request) {
        
        TicketResponse updatedTicket = ticketService.updateTicket(id, request);
        return ResponseEntity.ok(updatedTicket);
    }
}