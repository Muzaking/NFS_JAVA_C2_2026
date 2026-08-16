export default function TicketList({ tickets, onSelectTicket }) {
  return (
    <div style={{ flex: 1, borderRight: '1px solid #555', paddingRight: '20px' }}>
      <h2>All Tickets</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tickets.map(ticket => (
          <li 
            key={ticket.id} 
            onClick={() => onSelectTicket(ticket)}
            style={{ 
              padding: '10px', 
              marginBottom: '8px', 
              border: '1px solid #444', 
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            <strong>{ticket.title}</strong>
            <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>
              {ticket.id} • {ticket.status}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}