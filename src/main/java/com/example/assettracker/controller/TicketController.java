package com.example.assettracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest; // <-- Added
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;        // <-- Added
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    // --- NEW: GET ENDPOINT FOR PAGINATION (WITH SORT FIX) ---
    // This MUST go above the /{id} mapping so "paged" isn't mistaken for an ID!
    @GetMapping("/paged")
    public ResponseEntity<Page<TicketResponse>> getPagedTickets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy, 
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status) {
        
        // 1. Safety Check: If React asks for 'createdAt', fallback to 'id' to prevent database crash
        if ("createdAt".equals(sortBy)) {
            sortBy = "id"; 
        }

        // 2. Safely parse the direction (ASC or DESC)
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        
        // 3. Manually build the Pageable object with the safe parameters
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        
        // 4. Fetch the data
        Page<TicketResponse> tickets = ticketService.getPagedTickets(search, status, pageable);
        return ResponseEntity.ok(tickets);
    }

    // --- EXISTING: GET ENDPOINT TO FETCH A SINGLE TICKET ---
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