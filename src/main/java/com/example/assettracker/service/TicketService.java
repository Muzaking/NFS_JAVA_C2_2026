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
import com.example.assettracker.util.InputSanitizer; // Imported the new utility class

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
        // REFACTORED: Using InputSanitizer via helpers
        ticket.setTitle(normalizeText(request.getTitle()));
        ticket.setDescription(normalizeText(request.getDescription()));
        ticket.setCategory(normalizeText(request.getCategory()));
        ticket.setPriority(normalizePriority(request.getPriority()));
        ticket.setStatus(normalizeStatus(request.getStatus()));

        Ticket savedTicket = ticketRepository.save(ticket);
        return mapToResponse(savedTicket);
    }

    public TicketResponse updateTicket(String id, UpdateTicketRequest request) {
        // REFACTORED: Using helper method
        Ticket ticket = findTicketOrThrow(id);

        ticket.setTitle(normalizeText(request.getTitle()));
        ticket.setDescription(normalizeText(request.getDescription()));
        ticket.setCategory(normalizeText(request.getCategory()));
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

    private String normalizeText(String value) {
        // Uses the new utility class to strip control chars and trim spaces
        return InputSanitizer.cleanText(value);
    }

    private String normalizeStatus(String status) {
        // Uses the new utility class to clean and uppercase code-like fields
        String cleaned = InputSanitizer.upperCode(status);
        return (cleaned == null) ? "OPEN" : cleaned;
    }

    private String normalizePriority(String priority) {
        String cleaned = InputSanitizer.upperCode(priority);
        return (cleaned == null) ? "MEDIUM" : cleaned;
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