import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';

export default function TicketDetail({ ticket }) {
  // If no ticket is selected yet, show a placeholder message
  if (!ticket) {
    return (
      <div style={{ flex: 2, paddingLeft: '20px', color: '#aaa' }}>
        <h3>Select a ticket to view details</h3>
      </div>
    );
  }

  // If a ticket is selected, show its full details
  return (
    <div style={{ flex: 2, paddingLeft: '20px' }}>
      <h2>{ticket.title}</h2>
      <p><strong>ID:</strong> {ticket.id}</p>
      <p><strong>Category:</strong> {ticket.category}</p>
      <p><strong>Created By:</strong> {ticket.createdBy}</p>
      <p><strong>Created At:</strong> {ticket.createdAt}</p>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <PriorityBadge priority={ticket.priority} />
        <StatusBadge status={ticket.status} />
      </div>
    </div>
  );
}