import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TicketSummaryCards from './TicketSummaryCards';
import React from 'react';

describe('TicketSummaryCards Component', () => {
  // 1. Create sample data
  const sampleTickets = [
    { id: 1, status: 'Open' },
    { id: 2, status: 'Open' },
    { id: 3, status: 'In Progress' },
    { id: 4, status: 'Closed' },
    { id: 5, status: 'Closed' },
    { id: 6, status: 'Closed' },
  ];

  it('renders the correct headers and calculates the correct counts for each status', () => {
    // 2. Render the component with the sample data
    render(<TicketSummaryCards tickets={sampleTickets} />);

    // 3. Test that the specific text labels display correctly
    expect(screen.getByText('Total Tickets')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Closed')).toBeInTheDocument();

    // 4. Test that the calculated numbers are correct based on the sample array
    // Total should be 6
    expect(screen.getByTestId('count-total')).toHaveTextContent('6');
    // Open should be 2
    expect(screen.getByTestId('count-open')).toHaveTextContent('2');
    // In Progress should be 1
    expect(screen.getByTestId('count-in-progress')).toHaveTextContent('1');
    // Closed should be 3
    expect(screen.getByTestId('count-closed')).toHaveTextContent('3');
  });
});