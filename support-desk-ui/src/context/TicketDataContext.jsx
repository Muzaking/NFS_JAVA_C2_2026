import { createContext, useReducer, useContext } from 'react';

// 1. Define the initial state blueprint
const initialState = {
  tickets: [],
  selectedTicketId: null,
  loading: false,
  error: null,
  pageInfo: { page: 0, size: 10, totalElements: 0, totalPages: 0 },
  filters: { searchText: '', status: '' },
  cache: {},         // <--- NEW: Stores the cached pages
  dataSource: ''     // <--- NEW: Tracks where the data came from
};

// 2. The Reducer: the only place where state is actually changed
const ticketReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loading: true, error: null };
      
    case 'LOAD_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        tickets: action.payload.tickets,
        pageInfo: action.payload.pageInfo || state.pageInfo,
        dataSource: 'Fetched from backend', // <--- NEW UI Message
        cache: {
          ...state.cache,
          // Save the tickets AND total pages using the unique key
          [action.payload.cacheKey]: {
            tickets: action.payload.tickets,
            totalPages: action.payload.totalPages
          }
        }
      };

    // --- NEW CASE: Handle loading from cache ---
    case 'LOAD_FROM_CACHE':
      return {
        ...state,
        loading: false,
        tickets: action.payload.tickets,
        dataSource: 'Loaded from cache',
        error: null
      };
      
    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.payload };
      
    case 'SET_SEARCH_TEXT':
      return { ...state, filters: { ...state.filters, searchText: action.payload } };
      
    case 'SET_STATUS_FILTER':
      return { ...state, filters: { ...state.filters, status: action.payload } };
      
    case 'SELECT_TICKET':
      return { ...state, selectedTicketId: action.payload };
      
    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
};

// 3. Create the Context
const TicketDataContext = createContext();

// 4. Create the Provider Component to wrap around your application
export const TicketDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  return (
    <TicketDataContext.Provider value={{ state, dispatch }}>
      {children}
    </TicketDataContext.Provider>
  );
};

// 5. Custom Hook for easy access in your components
export const useTicketData = () => {
  const context = useContext(TicketDataContext);
  if (!context) {
    throw new Error('useTicketData must be used within a TicketDataProvider');
  }
  return context;
};