package com.example.assettracker.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.assettracker.model.Ticket;

@Repository
public interface TicketRepository extends MongoRepository<Ticket, String> {
}