import { useState } from 'react';
import Layout from "./components/Layout";
import TicketList from "./components/TicketList";
import TicketDetail from "./components/TicketDetail";
import { sampleTickets } from "./data/sampleTickets";

export default function App() {
  // State to track which ticket the user has clicked on
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <Layout>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <TicketList 
          tickets={sampleTickets} 
          onSelectTicket={setSelectedTicket} 
        />
        <TicketDetail 
          ticket={selectedTicket} 
        />
      </div>
    </Layout>
  );
}