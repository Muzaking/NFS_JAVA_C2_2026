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

    // --- UPDATED: FETCH PAGINATED TICKETS WITH FILTERS ---
    public Page<TicketResponse> getPagedTickets(String search, String status, Pageable pageable) {
        Page<Ticket> ticketPage;

        // 1. Check which filters the user actually filled out
        boolean hasSearch = search != null && !search.trim().isEmpty();
        boolean hasStatus = status != null && !status.trim().isEmpty();

        // 2. Route to the correct MongoDB query based on active filters
        if (hasSearch && hasStatus) {
            ticketPage = ticketRepository.findByTitleContainingIgnoreCaseAndStatus(search, status, pageable);
        } else if (hasSearch) {
            ticketPage = ticketRepository.findByTitleContainingIgnoreCase(search, pageable);
        } else if (hasStatus) {
            ticketPage = ticketRepository.findByStatus(status, pageable);
        } else {
            // Default: User didn't type anything, return all tickets
            ticketPage = ticketRepository.findAll(pageable);
        }
        
        // 3. Map the entity Page to a DTO Page
        return ticketPage.map(ticket -> {
            TicketResponse response = new TicketResponse();
            response.setId(ticket.getId());
            response.setTitle(ticket.getTitle());
            response.setDescription(ticket.getDescription());
            response.setCategory(ticket.getCategory());
            response.setPriority(ticket.getPriority());
            response.setStatus(ticket.getStatus());
            return response;
        });
    }

    // --- EXISTING: FETCH TICKET BY ID METHOD ---
    public TicketResponse getTicketById(String id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));

        TicketResponse response = new TicketResponse();
        response.setId(ticket.getId());
        response.setTitle(ticket.getTitle());
        response.setDescription(ticket.getDescription());
        response.setCategory(ticket.getCategory());
        response.setPriority(ticket.getPriority());
        response.setStatus(ticket.getStatus());
        
        return response;
    }

    // --- EXISTING: CREATE TICKET METHOD ---
    public TicketResponse createTicket(CreateTicketRequest request) {
        Ticket ticket = new Ticket();
        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setCategory(request.getCategory());
        ticket.setPriority(request.getPriority());
        ticket.setStatus(request.getStatus());

        Ticket savedTicket = ticketRepository.save(ticket);

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
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));

        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setCategory(request.getCategory());
        ticket.setPriority(request.getPriority());
        ticket.setStatus(request.getStatus());

        Ticket updatedTicket = ticketRepository.save(ticket);

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