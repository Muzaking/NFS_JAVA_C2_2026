package com.example.assettracker.service;

import com.example.assettracker.dto.TicketResponse;
import com.example.assettracker.exception.ResourceNotFoundException; // ADDED: Import for the 404 exception
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TicketService {

    private final List<TicketResponse> tickets = new ArrayList<>();

    public TicketService() {
        // Hardcoding our 3 initial tickets
        tickets.add(new TicketResponse("T001", "Cannot access email", "User cannot login to company email account.", "Email", "HIGH", "OPEN", "amir@example.com", "2026-07-03"));
        tickets.add(new TicketResponse("T002", "Laptop is slow", "Takes 10 minutes to boot up and freezes constantly.", "Hardware", "MEDIUM", "IN_PROGRESS", "sara@example.com", "2026-07-04"));
        tickets.add(new TicketResponse("T003", "VPN connection not working", "Fails to connect to the internal network from home.", "Network", "HIGH", "OPEN", "john@example.com", "2026-07-10"));
    }

    public List<TicketResponse> getAllTickets() {
        return tickets;
    }

    // ADDED: New method to find a specific ticket by ID or throw our custom exception
    public TicketResponse getTicketById(String id) {
        return tickets.stream()
                .filter(ticket -> ticket.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Ticket " + id + " was not found"));
    }
}