package com.example.assettracker.controller;

import com.example.assettracker.dto.TicketRequestDTO;
import com.example.assettracker.dto.TicketResponseDTO;
import com.example.assettracker.service.TicketService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tickets")
public class TicketV1Controller {

    private final TicketService ticketService;

    public TicketV1Controller(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // GET /api/v1/tickets
    @GetMapping
    public ResponseEntity<List<TicketResponseDTO>> getAllTicketsV1(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String category) {
        
        // Passing the 3 expected filter strings to your service
        return ResponseEntity.ok(ticketService.getAllTickets(status, priority, category)); 
    }

    // GET /api/v1/tickets/{id}
    @GetMapping("/{id}")
    public ResponseEntity<TicketResponseDTO> getTicketByIdV1(@PathVariable String id) {
        // NOTE: If this line still shows an error, check your TicketService.java file. 
        // You might have named the method getTicket(id) or findTicketById(id) instead!
        return ResponseEntity.ok(ticketService.getTicketById(id));
    }

    // POST /api/v1/tickets
    @PostMapping
    public ResponseEntity<TicketResponseDTO> createTicketV1(@Valid @RequestBody TicketRequestDTO requestDto) {
        // Using your DTOs instead of the raw Ticket model
        TicketResponseDTO createdTicket = ticketService.createTicket(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTicket);
    }
}