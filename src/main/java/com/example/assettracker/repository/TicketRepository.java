package com.example.assettracker.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.assettracker.model.Ticket;

@Repository
public interface TicketRepository extends MongoRepository<Ticket, String> {
    
    // 1. Filter by Status only
    Page<Ticket> findByStatus(String status, Pageable pageable);

    // 2. Search by Title (ignores capitalization)
    Page<Ticket> findByTitleContainingIgnoreCase(String search, Pageable pageable);

    // 3. Search by Title AND filter by Status
    Page<Ticket> findByTitleContainingIgnoreCaseAndStatus(String search, String status, Pageable pageable);
}