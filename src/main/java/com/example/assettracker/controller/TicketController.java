package com.example.assettracker.controller;

import com.example.assettracker.dto.CreateTicketRequest; // ADDED
import com.example.assettracker.dto.TicketResponse;
import com.example.assettracker.service.TicketService;
import jakarta.validation.Valid; // ADDED
import org.springframework.http.HttpStatus; // ADDED
import org.springframework.web.bind.annotation.*; // Covers GetMapping, PostMapping, PathVariable, RequestBody, ResponseStatus

import java.util.List;

@RestController
@RequestMapping("/api")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping("/tickets")
    public List<TicketResponse> getTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/tickets/{id}")
    public TicketResponse getTicket(@PathVariable String id) {
        return ticketService.getTicketById(id);
    }

    // ADDED: POST endpoint to create tickets
    @PostMapping("/tickets")
    @ResponseStatus(HttpStatus.CREATED) // Forces a 201 Created status instead of 200 OK
    public TicketResponse createTicket(@Valid @RequestBody CreateTicketRequest request) {
        return ticketService.createTicket(request);
    }
}