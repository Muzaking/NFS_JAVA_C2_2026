// src/components/TicketSummaryCards.jsx

export default function TicketSummaryCards({ tickets = [] }) {
  const total = tickets.length;
  const open = tickets.filter(t => t.status === 'OPEN').length;
  const inProgress = tickets.filter(t => t.status === 'IN_PROGRESS').length;
  const closed = tickets.filter(t => t.status === 'CLOSED').length;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="p-4 border rounded bg-gray-50 text-center">
        <h3 className="font-bold text-gray-700">Total Tickets</h3>
        <p className="text-2xl font-black mt-2" data-testid="total-count">{total}</p>
      </div>
      <div className="p-4 border rounded bg-blue-50 text-center">
        <h3 className="font-bold text-blue-700">Open</h3>
        <p className="text-2xl font-black mt-2 text-blue-900" data-testid="open-count">{open}</p>
      </div>
      <div className="p-4 border rounded bg-yellow-50 text-center">
        <h3 className="font-bold text-yellow-700">In Progress</h3>
        <p className="text-2xl font-black mt-2 text-yellow-900" data-testid="in-progress-count">{inProgress}</p>
      </div>
      <div className="p-4 border rounded bg-green-50 text-center">
        <h3 className="font-bold text-green-700">Closed</h3>
        <p className="text-2xl font-black mt-2 text-green-900" data-testid="closed-count">{closed}</p>
      </div>
    </div>
  );
}