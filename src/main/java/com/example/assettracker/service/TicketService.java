package com.example.assettracker.service;

import com.example.assettracker.dto.TicketRequestDTO;
import com.example.assettracker.dto.TicketResponseDTO;
import com.example.assettracker.model.Ticket;
import com.example.assettracker.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    // --- DAY 8 EXERCISE 1: GET ALL TICKETS WITH FILTERS ---
    public List<TicketResponseDTO> getFilteredTickets(String status, String priority, String category) {
        List<Ticket> tickets;

        // Check which filter is being used and call the matching repository method
        if (status != null && !status.trim().isEmpty()) {
            tickets = ticketRepository.findByStatus(status);
        } else if (priority != null && !priority.trim().isEmpty()) {
            tickets = ticketRepository.findByPriority(priority);
        } else if (category != null && !category.trim().isEmpty()) {
            tickets = ticketRepository.findByCategory(category);
        } else {
            // No filters provided, return everything
            tickets = ticketRepository.findAll();
        }

        return tickets.stream().map(this::mapToResponseDto).collect(Collectors.toList());
    }

    // --- DAY 7 EXERCISE 4: CREATE TICKET ---
    public TicketResponseDTO createTicket(TicketRequestDTO requestDto) {
        Ticket ticket = new Ticket();
        ticket.setTitle(requestDto.getTitle());
        ticket.setDescription(requestDto.getDescription());
        ticket.setCategory(requestDto.getCategory());
        ticket.setPriority(requestDto.getPriority());
        ticket.setCreatedBy(requestDto.getCreatedBy());
        
        ticket.setStatus("OPEN");
        ticket.setCreatedAt(LocalDateTime.now()); 

        Ticket savedTicket = ticketRepository.save(ticket);
        return mapToResponseDto(savedTicket);
    }

    // Helper method
    private TicketResponseDTO mapToResponseDto(Ticket ticket) {
        TicketResponseDTO dto = new TicketResponseDTO();
        dto.setId(ticket.getId());
        dto.setTitle(ticket.getTitle());
        dto.setDescription(ticket.getDescription());
        dto.setCategory(ticket.getCategory());
        dto.setPriority(ticket.getPriority());
        dto.setCreatedBy(ticket.getCreatedBy());
        dto.setStatus(ticket.getStatus());
        dto.setCreatedAt(ticket.getCreatedAt());
        
        return dto;
    }
}