import React from 'react';

export default function TicketSummaryCards({ tickets = [] }) {
  // Calculate the counts based on the ticket array
  const total = tickets.length;
  const openCount = tickets.filter(ticket => ticket.status === 'Open').length;
  const inProgressCount = tickets.filter(ticket => ticket.status === 'In Progress').length;
  const closedCount = tickets.filter(ticket => ticket.status === 'Closed').length;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="card summary-card">
        <h3>Total Tickets</h3>
        <p data-testid="count-total">{total}</p>
      </div>
      
      <div className="card summary-card">
        <h3>Open</h3>
        <p data-testid="count-open">{openCount}</p>
      </div>
      
      <div className="card summary-card">
        <h3>In Progress</h3>
        <p data-testid="count-in-progress">{inProgressCount}</p>
      </div>
      
      <div className="card summary-card">
        <h3>Closed</h3>
        <p data-testid="count-closed">{closedCount}</p>
      </div>
    </div>
  );
}