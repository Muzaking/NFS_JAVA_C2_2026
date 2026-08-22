// src/components/TicketSummaryCards.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TicketSummaryCards from './TicketSummaryCards';

// We add an extra OPEN ticket here to test the math properly!
const sampleTickets = [
  { id: 'T001', title: 'Cannot access email', status: 'OPEN' },
  { id: 'T002', title: 'Laptop running slowly', status: 'IN_PROGRESS' },
  { id: 'T003', title: 'Password reset request', status: 'CLOSED' },
  { id: 'T004', title: 'Server is down', status: 'OPEN' }
];

describe('TicketSummaryCards Component', () => {
  it('renders labels and exact calculations based on props', () => {
    // 1. Render the component with our fake data
    render(<TicketSummaryCards tickets={sampleTickets} />);

    // 2. Verify all the labels are physically present on the screen
    expect(screen.getByText('Total Tickets')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Closed')).toBeInTheDocument();

    // 3. Verify the math is correct using our data-testids
    // With our sample data, there should be 4 Total, 2 Open, 1 In Progress, 1 Closed
    expect(screen.getByTestId('total-count')).toHaveTextContent('4');
    expect(screen.getByTestId('open-count')).toHaveTextContent('2');
    expect(screen.getByTestId('in-progress-count')).toHaveTextContent('1');
    expect(screen.getByTestId('closed-count')).toHaveTextContent('1');
  });
});