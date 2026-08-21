import { useEffect, useState } from 'react';
import { useTicketData } from '../context/TicketDataContext';
import { getPagedTickets } from '../services/ticketService';
import { useAuth } from '../context/AuthContext';

export default function TicketsPage() {
  const { state, dispatch } = useTicketData();
  const { tickets, loading, error, filters } = state;
  
  // Local state for pagination controls
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sortBy, setSortBy] = useState('createdAt');
  const [direction, setDirection] = useState('desc');
  const [totalPages, setTotalPages] = useState(0);

  // Get the token safely from your Auth Provider
  const { token } = useAuth();

  useEffect(() => {
    // 1. SAFETY GUARD: Stop the function immediately if there is no token
    if (!token) {
      console.warn("No token found, skipping fetch.");
      return;
    }

    const fetchTickets = async () => {
      dispatch({ type: 'LOAD_START' });
      try {
        const response = await getPagedTickets(token, {
          page,
          size,
          sortBy,
          direction,
          searchText: filters.searchText,
          status: filters.status
        });
        
        // Update the context with the fetched tickets
        dispatch({ 
          type: 'LOAD_SUCCESS', 
          payload: { tickets: response.content || response } 
        });
        
        // Update total pages for the pagination controls
        if (response.totalPages) {
          setTotalPages(response.totalPages);
        }
      } catch (err) {
        dispatch({ type: 'LOAD_ERROR', payload: err.message });
      }
    };

    fetchTickets();
  }, [page, size, sortBy, direction, filters.searchText, filters.status, dispatch, token]);

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">🎫 Tickets Page</h1>

        {/* --- FILTERS & SORTING CONTROLS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input 
            type="text" 
            placeholder="Search..." 
            value={filters.searchText}
            onChange={(e) => dispatch({ type: 'SET_SEARCH_TEXT', payload: e.target.value })}
            className="border p-2 rounded"
          />
          <select 
            value={filters.status} 
            onChange={(e) => dispatch({ type: 'SET_STATUS_FILTER', payload: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="CLOSED">Closed</option>
          </select>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="createdAt">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
          </select>
          <select 
            value={size} 
            onChange={(e) => { setSize(Number(e.target.value)); setPage(0); }}
            className="border p-2 rounded"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>

        {/* --- TICKET LIST --- */}
        {loading && <p className="text-center text-blue-500">Loading tickets...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        <div className="space-y-4 mb-6">
          {!loading && tickets.length === 0 && (
            <p className="text-center text-gray-500">No tickets found.</p>
          )}
          {tickets.map(ticket => (
            <div key={ticket.id} className="border p-4 rounded flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="font-bold text-lg">{ticket.title}</h3>
                <p className="text-sm text-gray-600">{ticket.description}</p>
              </div>
              <div className="text-right">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-1 border border-blue-200">
                  {ticket.status}
                </span>
                <p className="text-xs text-gray-400">Priority: {ticket.priority}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- PAGINATION CONTROLS --- */}
        <div className="flex justify-between items-center border-t pt-4">
          <button 
            onClick={() => setPage(prev => Math.max(0, prev - 1))}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          
          <span className="text-gray-600">
            Page {page + 1} {totalPages > 0 ? `of ${totalPages}` : ''}
          </span>
          
          <button 
            onClick={() => setPage(prev => prev + 1)}
            disabled={totalPages > 0 && page >= totalPages - 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}