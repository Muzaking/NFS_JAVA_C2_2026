import { useState } from 'react';
import Layout from "./components/Layout";
import TicketList from "./components/TicketList";
import TicketDetail from "./components/TicketDetail";
import TicketFilterPanel from "./components/TicketFilterPanel";
import { sampleTickets } from "./data/sampleTickets";

export default function App() {
  // State for selected ticket
  const [selectedTicket, setSelectedTicket] = useState(null);

  // State for filtering
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  // Filter the tickets based on current state
  const filteredTickets = sampleTickets.filter((ticket) => {
    // Check if title OR category matches the search text (case-insensitive)
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchText.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchText.toLowerCase());

    // Check if status matches (or if no status filter is selected)
    const matchesStatus = statusFilter === "" || ticket.status === statusFilter;

    // Check if priority matches (or if no priority filter is selected)
    const matchesPriority = priorityFilter === "" || ticket.priority === priorityFilter;

    // A ticket must pass all selected filters to be displayed
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <Layout>
      {/* Pass state values and setter functions to the filter panel */}
      <TicketFilterPanel 
        searchText={searchText}
        onSearchChange={setSearchText}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
      />
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {/* Pass the FILTERED tickets to the list, not the whole sample data */}
        <TicketList 
          tickets={filteredTickets} 
          onSelectTicket={setSelectedTicket} 
        />
        <TicketDetail 
          ticket={selectedTicket} 
        />
      </div>
    </Layout>
  );
}