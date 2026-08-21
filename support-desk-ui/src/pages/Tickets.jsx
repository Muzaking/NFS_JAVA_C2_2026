import { useEffect, useState } from 'react';
import { useTicketData } from '../context/TicketDataContext';
import { getPagedTickets } from '../services/ticketService';
import { useAuth } from '../context/AuthContext';

export default function TicketsPage() {
  const { state, dispatch } = useTicketData();
  
  // 1. Pull cache and dataSource from your global state
  const { tickets, loading, error, filters, cache, dataSource } = state; 
  
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sortBy, setSortBy] = useState('id');
  const [direction, setDirection] = useState('desc');
  const [totalPages, setTotalPages] = useState(0);

  const { token } = useAuth();

  // 2. Generate a unique cache key based on the exact parameters the user is requesting
  const cacheKey = `${page}|${size}|${sortBy}|${direction}|${filters.searchText}|${filters.status}`;

  // 3. Extract the fetch logic into its own function so the Refresh button can use it
  const fetchTicketsFromBackend = async () => {
    if (!token) return;
    dispatch({ type: 'LOAD_START' });
    
    try {
      const response = await getPagedTickets(token, {
        page, size, sortBy, direction, searchText: filters.searchText, status: filters.status
      });
      
      const fetchedTickets = response.content || response;
      const fetchedTotalPages = response.totalPages || 0;

      // Send the data AND the cacheKey to the reducer so it can be saved
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

  useEffect(() => {
    if (!token) return;

    // 4. THE CACHE CHECK: Do we already have this exact page in memory?
    if (cache[cacheKey]) {
      // Cache Hit! Load instantly without calling the backend.
      dispatch({ 
        type: 'LOAD_FROM_CACHE', 
        payload: { tickets: cache[cacheKey].tickets } 
      });
      setTotalPages(cache[cacheKey].totalPages);
    } else {
      // Cache Miss! Go get it from the Spring Boot backend.
      fetchTicketsFromBackend();
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, sortBy, direction, filters.searchText, filters.status, token]); 
  // (We intentionally exclude 'cache' and 'dispatch' from dependencies to prevent infinite loops)

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
        
        {/* --- HEADER & STATUS MESSAGES --- */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🎫 Tickets Page</h1>
          
          <div className="text-right">
            {/* Show the required UI message */}
            <p className={`text-sm font-semibold mb-2 ${dataSource === 'Loaded from cache' ? 'text-green-600' : 'text-blue-600'}`}>
              ⚡ {dataSource}
            </p>
            {/* Force refresh button */}
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