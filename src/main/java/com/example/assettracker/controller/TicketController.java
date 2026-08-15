package com.example.assettracker.controller;

import com.example.assettracker.dto.TicketRequestDTO;
import com.example.assettracker.dto.TicketResponseDTO;
import com.example.assettracker.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // --- DAY 8 EXERCISE 1: GET ENDPOINT WITH FILTERS ---
    @GetMapping
    public ResponseEntity<List<TicketResponseDTO>> getAllTickets(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String category) {
            
        List<TicketResponseDTO> tickets = ticketService.getFilteredTickets(status, priority, category);
        return ResponseEntity.ok(tickets);
    }

    // --- DAY 7 EXERCISE 4: POST ENDPOINT ---
    @PostMapping
    public ResponseEntity<TicketResponseDTO> createTicket(@Valid @RequestBody TicketRequestDTO requestDto) {
        TicketResponseDTO createdTicket = ticketService.createTicket(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTicket);
    }
}