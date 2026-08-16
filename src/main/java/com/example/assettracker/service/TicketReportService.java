package com.example.assettracker.service;

import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;

import com.example.assettracker.dto.ReportCountResponse;
import com.example.assettracker.model.Ticket;

@Service
public class TicketReportService {

    private final MongoTemplate mongoTemplate;

    public TicketReportService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<ReportCountResponse> getTicketCountByStatus() {
        // Build the aggregation pipeline
        Aggregation aggregation = Aggregation.newAggregation(
                // 1. Group by the 'status' field and count them
                Aggregation.group("status").count().as("count"),
                // 2. Map the resulting group ID to 'label' to match our DTO
                Aggregation.project("count").and("_id").as("label")
        );

        // Execute the aggregation against the Ticket collection
        AggregationResults<ReportCountResponse> results = mongoTemplate.aggregate(
                aggregation, Ticket.class, ReportCountResponse.class
        );

        return results.getMappedResults();
    }

    // NEW EXERCISE 3 METHOD: Group by priority
    public List<ReportCountResponse> countTicketsByPriority() {
        Aggregation aggregation = Aggregation.newAggregation(
                // 1. Group by the 'priority' field and count them
                Aggregation.group("priority").count().as("count"),
                // 2. Map the resulting group ID to 'label' to match our DTO
                Aggregation.project("count").and("_id").as("label")
        );

        // Execute the aggregation against the Ticket collection
        AggregationResults<ReportCountResponse> results = mongoTemplate.aggregate(
                aggregation, Ticket.class, ReportCountResponse.class
        );

        return results.getMappedResults();
    }
}