package com.example.assettracker.service;

import org.springframework.beans.factory.annotation.Autowired; // <-- Added the new DTO import
import org.springframework.stereotype.Service;

import com.example.assettracker.dto.CreateTicketRequest;
import com.example.assettracker.dto.TicketResponse;
import com.example.assettracker.dto.UpdateTicketRequest;
import com.example.assettracker.model.Ticket; 
import com.example.assettracker.repository.TicketRepository;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    // --- NEW: CREATE TICKET METHOD ---
    public TicketResponse createTicket(CreateTicketRequest request) {
        // 1. Create a brand new Ticket entity
        Ticket ticket = new Ticket();
        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setCategory(request.getCategory());
        ticket.setPriority(request.getPriority());
        ticket.setStatus(request.getStatus());

        // 2. Save it to MongoDB
        Ticket savedTicket = ticketRepository.save(ticket);

        // 3. Convert back to a response DTO to send to React
        TicketResponse response = new TicketResponse();
        response.setId(savedTicket.getId());
        response.setTitle(savedTicket.getTitle());
        response.setDescription(savedTicket.getDescription());
        response.setCategory(savedTicket.getCategory());
        response.setPriority(savedTicket.getPriority());
        response.setStatus(savedTicket.getStatus());
        
        return response;
    }

    // --- EXISTING: UPDATE TICKET METHOD ---
    public TicketResponse updateTicket(String id, UpdateTicketRequest request) {
        // 1. Find the existing ticket
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));

        // 2. Update the fields with the new data
        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setCategory(request.getCategory());
        ticket.setPriority(request.getPriority());
        ticket.setStatus(request.getStatus());

        // 3. Save to MongoDB
        Ticket updatedTicket = ticketRepository.save(ticket);

        // 4. Convert back to response DTO manually
        TicketResponse response = new TicketResponse();
        response.setId(updatedTicket.getId());
        response.setTitle(updatedTicket.getTitle());
        response.setDescription(updatedTicket.getDescription());
        response.setCategory(updatedTicket.getCategory());
        response.setPriority(updatedTicket.getPriority());
        response.setStatus(updatedTicket.getStatus());
        
        return response;
    }
}