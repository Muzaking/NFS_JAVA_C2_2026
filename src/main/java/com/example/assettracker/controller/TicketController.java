package com.example.assettracker.controller;

import com.example.assettracker.dto.TicketResponse;
import com.example.assettracker.service.TicketService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable; // ADDED: Required to read the URL
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    // ADDED: New endpoint to get a single ticket by its ID
    @GetMapping("/tickets/{id}")
    public TicketResponse getTicket(@PathVariable String id) {
        return ticketService.getTicketById(id);
    }
}