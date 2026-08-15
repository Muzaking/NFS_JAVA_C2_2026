package com.example.assettracker.controller;

import java.util.List; 

import org.springframework.http.HttpStatus; 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.assettracker.dto.TicketRequestDTO;
import com.example.assettracker.dto.TicketResponseDTO;
import com.example.assettracker.service.TicketService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // --- GET ALL TICKETS ---
    @GetMapping
    public ResponseEntity<List<TicketResponseDTO>> getAllTickets() {
        return ResponseEntity.ok(ticketService.getAllTickets());
    }

    // --- DAY 7 EXERCISE 4: POST ENDPOINT ---
    @PostMapping
    public ResponseEntity<TicketResponseDTO> createTicket(@Valid @RequestBody TicketRequestDTO requestDto) {
        TicketResponseDTO createdTicket = ticketService.createTicket(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTicket);
    }
}