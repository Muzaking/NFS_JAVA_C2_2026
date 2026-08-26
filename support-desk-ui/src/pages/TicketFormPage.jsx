import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TicketFormWizard from '../components/TicketFormWizard';

const TicketFormPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth(); 

  const handleCreateTicket = async (ticketData) => {
    try {
      // Merge form data with all required backend fields to prevent 400 Bad Request
      const fullTicketPayload = {
        ...ticketData,           // Contains title and description from the wizard
        category: 'SOFTWARE',    // Required by your backend Ticket entity
        status: 'OPEN',          // Default status
        priority: 'MEDIUM',      // Default priority
      };

      const response = await fetch('http://localhost:8080/api/v1/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Passes Spring Security
        },
        body: JSON.stringify(fullTicketPayload),
      });

      if (response.ok) {
        // SUCCESS! Redirect the browser back to the Tickets Dashboard
        navigate('/app/tickets');
      } else {
        console.error('Failed to save ticket to the backend.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <TicketFormWizard onSubmit={handleCreateTicket} />
    </div>
  );
};

export default TicketFormPage;