import { useState } from 'react';
import Layout from "./components/Layout";
import TicketList from "./components/TicketList";
import TicketDetail from "./components/TicketDetail";
import TicketFilterPanel from "./components/TicketFilterPanel";
import ApiInfoCard from "./components/ApiInfoCard"; // <-- 1. MAKE SURE THIS IS IMPORTED
import { sampleTickets } from "./data/sampleTickets";

export default function App() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const filteredTickets = sampleTickets.filter((ticket) => {
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchText.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === "" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "" || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <Layout>
      
      {/* 2. DROP THE NEW COMPONENT RIGHT HERE */}
      <ApiInfoCard /> 
      
      <TicketFilterPanel 
        searchText={searchText}
        onSearchChange={setSearchText}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
      />
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
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