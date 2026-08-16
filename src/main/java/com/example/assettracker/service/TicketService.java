package com.example.assettracker.service;

import com.example.assettracker.dto.TicketRequestDTO;
import com.example.assettracker.dto.TicketResponseDTO;
import com.example.assettracker.model.Ticket;
import com.example.assettracker.repository.TicketRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

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

    // --- DAY 8 EXERCISE 2: GET PAGINATED TICKETS ---
    public Page<TicketResponseDTO> getPagedTickets(int page, int size, String sortBy, String direction) {
        
        // 1. Determine sort direction
        Sort sort = direction.equalsIgnoreCase("asc") 
            ? Sort.by(sortBy).ascending() 
            : Sort.by(sortBy).descending();

        // 2. Create the Pageable object
        Pageable pageable = PageRequest.of(page, size, sort);

        // 3. Fetch from repository using Pageable
        Page<Ticket> ticketPage = ticketRepository.findAll(pageable);

        // 4. Map the Page of Ticket entities to a Page of DTOs
        return ticketPage.map(this::mapToResponseDto);
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