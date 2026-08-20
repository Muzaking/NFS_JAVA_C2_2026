package com.example.assettracker.service;

import com.example.assettracker.dto.TicketResponse;
import com.example.assettracker.dto.UpdateTicketRequest;
import com.example.assettracker.model.Ticket; // Make sure this matches your actual Ticket model import
import com.example.assettracker.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

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