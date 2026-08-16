package com.example.assettracker.service;

import com.example.assettracker.dto.TicketRequestDTO;
import com.example.assettracker.dto.TicketResponseDTO;
import com.example.assettracker.model.Ticket;
import com.example.assettracker.repository.TicketRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketService {

    // Initialize the logger
    private static final Logger logger = LoggerFactory.getLogger(TicketService.class);

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    // --- DAY 8 EXERCISE 1: GET ALL TICKETS WITH FILTERS ---
    public List<TicketResponseDTO> getAllTickets(String status, String priority, String category) {
        logger.info("Fetching tickets with filters - status: {}, priority: {}, category: {}", status, priority, category);
        
        List<Ticket> tickets;

        if (status != null && !status.trim().isEmpty()) {
            tickets = ticketRepository.findByStatus(status);
        } else if (priority != null && !priority.trim().isEmpty()) {
            tickets = ticketRepository.findByPriority(priority);
        } else if (category != null && !category.trim().isEmpty()) {
            tickets = ticketRepository.findByCategory(category);
        } else {
            tickets = ticketRepository.findAll();
        }

        return tickets.stream().map(this::mapToResponseDto).collect(Collectors.toList());
    }

    // --- DAY 8 EXERCISE 2: GET PAGINATED TICKETS ---
    public Page<TicketResponseDTO> getPagedTickets(int page, int size, String sortBy, String direction) {
        logger.info("Fetching paginated tickets - page: {}, size: {}, sortBy: {}, direction: {}", page, size, sortBy, direction);
        
        Sort sort = direction.equalsIgnoreCase("asc") 
            ? Sort.by(sortBy).ascending() 
            : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Ticket> ticketPage = ticketRepository.findAll(pageable);

        return ticketPage.map(this::mapToResponseDto);
    }

    // --- ADDED: GET TICKET BY ID ---
    public TicketResponseDTO getTicketById(String id) {
        logger.info("Fetching ticket with ID: {}", id);
        
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found with id: " + id));
                
        return mapToResponseDto(ticket);
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
        
        // Log the newly created ID
        logger.info("Successfully created new ticket with ID: {}", savedTicket.getId());
        
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