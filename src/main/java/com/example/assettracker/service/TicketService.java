package com.example.assettracker.service;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    // --- PUBLIC METHODS ---

    public Page<TicketResponse> getPagedTickets(String search, String status, Pageable pageable) {
        Page<Ticket> ticketPage;

        boolean hasSearch = search != null && !search.trim().isEmpty();
        boolean hasStatus = status != null && !status.trim().isEmpty();

        if (hasSearch && hasStatus) {
            ticketPage = ticketRepository.findByTitleContainingIgnoreCaseAndStatus(search, status, pageable);
        } else if (hasSearch) {
            ticketPage = ticketRepository.findByTitleContainingIgnoreCase(search, pageable);
        } else if (hasStatus) {
            ticketPage = ticketRepository.findByStatus(status, pageable);
        } else {
            ticketPage = ticketRepository.findAll(pageable);
        }
        
        // REFACTORED: Using the helper method to map the page
        return ticketPage.map(this::mapToResponse);
    }

    public TicketResponse getTicketById(String id) {
        // REFACTORED: Using helper methods
        Ticket ticket = findTicketOrThrow(id);
        return mapToResponse(ticket);
    }

    public TicketResponse createTicket(CreateTicketRequest request) {
        Ticket ticket = new Ticket();
        // REFACTORED: Using normalization helpers
        ticket.setTitle(normalizeRequired(request.getTitle()));
        ticket.setDescription(normalizeRequired(request.getDescription()));
        ticket.setCategory(normalizeRequired(request.getCategory()));
        ticket.setPriority(normalizePriority(request.getPriority()));
        ticket.setStatus(normalizeStatus(request.getStatus()));

        Ticket savedTicket = ticketRepository.save(ticket);
        return mapToResponse(savedTicket);
    }

    public TicketResponse updateTicket(String id, UpdateTicketRequest request) {
        // REFACTORED: Using helper method
        Ticket ticket = findTicketOrThrow(id);

        ticket.setTitle(normalizeRequired(request.getTitle()));
        ticket.setDescription(normalizeRequired(request.getDescription()));
        ticket.setCategory(normalizeRequired(request.getCategory()));
        ticket.setPriority(normalizePriority(request.getPriority()));
        ticket.setStatus(normalizeStatus(request.getStatus()));

        Ticket updatedTicket = ticketRepository.save(ticket);
        return mapToResponse(updatedTicket);
    }

    // --- PRIVATE HELPER METHODS ---

    private Ticket findTicketOrThrow(String id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));
    }

    private String normalizeRequired(String value) {
        return (value != null) ? value.trim() : null;
    }

    private String normalizeStatus(String status) {
        if (status == null || status.trim().isEmpty()) return "OPEN";
        return status.trim().toUpperCase();
    }

    private String normalizePriority(String priority) {
        if (priority == null || priority.trim().isEmpty()) return "MEDIUM";
        return priority.trim().toUpperCase();
    }

    private TicketResponse mapToResponse(Ticket ticket) {
        TicketResponse response = new TicketResponse();
        response.setId(ticket.getId());
        response.setTitle(ticket.getTitle());
        response.setDescription(ticket.getDescription());
        response.setCategory(ticket.getCategory());
        response.setPriority(ticket.getPriority());
        response.setStatus(ticket.getStatus());
        return response;
    }
}