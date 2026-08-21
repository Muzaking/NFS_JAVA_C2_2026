import { useEffect, useState } from 'react';
import { useTicketData } from '../context/TicketDataContext';
import { getPagedTickets, updateTicket } from '../services/ticketService'; 
import { useAuth } from '../context/AuthContext';

export default function TicketsPage() {
  const { state, dispatch } = useTicketData();
  const { tickets, loading, error, filters, cache, dataSource } = state; 
  
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sortBy, setSortBy] = useState('id');
  const [direction, setDirection] = useState('desc');
  const [totalPages, setTotalPages] = useState(0);

  const { token } = useAuth();
  
  // 1. Generate unique cache key based on all active parameters
  const cacheKey = `${page}|${size}|${sortBy}|${direction}|${filters.searchText}|${filters.status}`;

  // 2. Extract fetch logic for initial load, cache misses, and manual refreshes
  const fetchTicketsFromBackend = async () => {
    if (!token) return;
    dispatch({ type: 'LOAD_START' });
    
    try {
      const response = await getPagedTickets(token, {
        page, size, sortBy, direction, searchText: filters.searchText, status: filters.status
      });
      
      const fetchedTickets = response.content || response;
      const fetchedTotalPages = response.totalPages || 0;

      dispatch({ 
        type: 'LOAD_SUCCESS', 
        payload: { 
          cacheKey: cacheKey,
          tickets: fetchedTickets,
          totalPages: fetchedTotalPages
        } 
      });
      
      setTotalPages(fetchedTotalPages);
    } catch (err) {
      dispatch({ type: 'LOAD_ERROR', payload: err.message });
    }
  };

  // 3. Effect hook checks the cache first whenever dependencies change
  useEffect(() => {
    if (!token) return;

    if (cache[cacheKey]) {
      // Cache Hit
      dispatch({ 
        type: 'LOAD_FROM_CACHE', 
        payload: { tickets: cache[cacheKey].tickets } 
      });
      setTotalPages(cache[cacheKey].totalPages);
    } else {
      // Cache Miss
      fetchTicketsFromBackend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, sortBy, direction, filters.searchText, filters.status, token]);

  // 4. Optimistic Update Logic
  const handleStatusChange = async (ticket, newStatus) => {
    if (ticket.status === newStatus) return; 

    // A. Backup the current state
    const backupTicket = { ...ticket };

    // B. Optimistically update the UI instantly
    const optimisticTicket = { ...ticket, status: newStatus };
    dispatch({ type: 'UPDATE_TICKET', payload: optimisticTicket });

    try {
      // C. Send PUT request to backend (Corrected parameter order: id, token, payload)
      const confirmedTicket = await updateTicket(ticket.id, token, optimisticTicket);
      
      // D. Sync perfectly with backend response
      dispatch({ type: 'UPDATE_TICKET', payload: confirmedTicket });
    } catch (err) {
      // E. Rollback if the server fails
      console.error("Update failed, rolling back UI...", err);
      dispatch({ type: 'UPDATE_TICKET', payload: backupTicket });
      alert("Failed to update status. The ticket has been reverted.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
        
        {/* --- HEADER & STATUS MESSAGES --- */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🎫 Tickets Page</h1>
          
          <div className="text-right">
            <p className={`text-sm font-semibold mb-2 ${dataSource === 'Loaded from cache' ? 'text-green-600' : 'text-blue-600'}`}>
              ⚡ {dataSource}
            </p>
            <button 
              onClick={fetchTicketsFromBackend}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              🔄 Force Refresh
            </button>
          </div>
        </div>

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
            <option value="id">Sort by Date</option>
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
        {loading && <p className="text-center text-blue-500 py-4">Loading tickets...</p>}
        {error && <p className="text-center text-red-500 py-4">Error: {error}</p>}

        <div className="space-y-4 mb-6">
          {!loading && tickets.length === 0 && (
            <p className="text-center text-gray-500 py-4">No tickets found.</p>
          )}
          {tickets.map(ticket => (
            <div key={ticket.id} className="border p-4 rounded flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50">
              <div className="mb-4 md:mb-0">
                <h3 className="font-bold text-lg">{ticket.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                
                {/* --- QUICK STATUS BUTTONS --- */}
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => handleStatusChange(ticket, 'OPEN')}
                    className={`text-xs px-3 py-1 rounded border transition-colors ${ticket.status === 'OPEN' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    OPEN
                  </button>
                  <button 
                    onClick={() => handleStatusChange(ticket, 'IN_PROGRESS')}
                    className={`text-xs px-3 py-1 rounded border transition-colors ${ticket.status === 'IN_PROGRESS' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    IN PROGRESS
                  </button>
                  <button 
                    onClick={() => handleStatusChange(ticket, 'CLOSED')}
                    className={`text-xs px-3 py-1 rounded border transition-colors ${ticket.status === 'CLOSED' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    CLOSED
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className={`inline-block text-xs px-2 py-1 rounded mb-1 border font-semibold
                  ${ticket.status === 'OPEN' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                  ${ticket.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''}
                  ${ticket.status === 'CLOSED' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                `}>
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
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors"
          >
            Previous
          </button>
          
          <span className="text-gray-600 font-medium">
            Page {page + 1} {totalPages > 0 ? `of ${totalPages}` : ''}
          </span>
          
          <button 
            onClick={() => setPage(prev => prev + 1)}
            disabled={totalPages > 0 && page >= totalPages - 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}