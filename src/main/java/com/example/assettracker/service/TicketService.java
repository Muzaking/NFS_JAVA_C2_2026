package com.example.assettracker.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.assettracker.dto.TicketRequestDTO;
import com.example.assettracker.dto.TicketResponseDTO;
import com.example.assettracker.model.Ticket;
import com.example.assettracker.repository.TicketRepository;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    // --- GET ALL TICKETS ---
    public List<TicketResponseDTO> getAllTickets() {
        List<Ticket> tickets = ticketRepository.findAll();
        return tickets.stream().map(this::mapToResponseDto).collect(Collectors.toList());
    }

    // --- DAY 7 EXERCISE 4: CREATE TICKET ---
    public TicketResponseDTO createTicket(TicketRequestDTO requestDto) {
        // 1. Create a new Ticket entity from the DTO
        Ticket ticket = new Ticket();
        ticket.setTitle(requestDto.getTitle());
        ticket.setDescription(requestDto.getDescription());
        ticket.setCategory(requestDto.getCategory());
        ticket.setPriority(requestDto.getPriority());
        ticket.setCreatedBy(requestDto.getCreatedBy());
        
        // 2. Set default values
        ticket.setStatus("OPEN");
        // FIXED: Passing LocalDateTime directly instead of converting to String
        ticket.setCreatedAt(LocalDateTime.now()); 

        // 3. Save to MongoDB
        Ticket savedTicket = ticketRepository.save(ticket);

        // 4. Convert saved entity back to Response DTO
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
        
        // FIXED: Since both use LocalDateTime, we can just pass it directly!
        dto.setCreatedAt(ticket.getCreatedAt());
        
        return dto;
    }
}