package com.example.assettracker.controller;

import com.example.assettracker.dto.TicketResponse;
import com.example.assettracker.service.TicketService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TicketController {

    private final TicketService ticketService;

    // Dependency Injection: Spring Boot automatically provides the service here
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping("/tickets")
    public List<TicketResponse> getTickets() {
        // We call the service to get the data, keeping the controller clean
        return ticketService.getAllTickets();
    }
}