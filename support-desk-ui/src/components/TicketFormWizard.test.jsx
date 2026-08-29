import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TicketFormWizard from './TicketFormWizard';
import React from 'react';

describe('TicketFormWizard Component', () => {

  it('shows inline errors when required fields are empty and blocks submit', async () => {
    const mockSubmit = vi.fn();
    render(<TicketFormWizard onSubmit={mockSubmit} />);
    const user = userEvent.setup();

    // 1. User clicks save without typing anything
    const saveButton = screen.getByRole('button', { name: /save/i });
    await user.click(saveButton);

    // 2. Verify backend was NOT called
    expect(mockSubmit).not.toHaveBeenCalled();

    // 3. Verify inline errors appeared
    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(screen.getByText('Description is required')).toBeInTheDocument();
  });

  it('calls the submit handler with clean payload data when form is valid', async () => {
    const mockSubmit = vi.fn().mockResolvedValue({});
    render(<TicketFormWizard onSubmit={mockSubmit} />);
    const user = userEvent.setup();

    // 1. User fills out the form
    await user.type(screen.getByLabelText(/title/i), 'Network Issue');
    await user.type(screen.getByLabelText(/description/i), 'Cannot connect to the VPN.');

    // 2. User clicks save
    await user.click(screen.getByRole('button', { name: /save/i }));

    // 3. Verify backend was called EXACTLY once with the correct data payload
    expect(mockSubmit).toHaveBeenCalledWith({
  title: 'Network Issue',
  description: 'Cannot connect to the VPN.',
  status: 'OPEN',
  priority: 'MEDIUM'
});
  });

  it('shows a saving state when the form is submitting', async () => {
    // 1. Create a fake backend that takes 100 milliseconds to load
    const mockSubmit = vi.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    render(<TicketFormWizard onSubmit={mockSubmit} />);
    const user = userEvent.setup();

    // 2. Fill out the form
    await user.type(screen.getByLabelText(/title/i), 'Software Bug');
    await user.type(screen.getByLabelText(/description/i), 'App crashes on launch.');

    // 3. Click save
    const saveButton = screen.getByRole('button', { name: /save/i });
    await user.click(saveButton);

    // 4. Verify the button immediately changed to "Saving..." and locked the user out
    const savingButton = screen.getByRole('button', { name: /saving/i });
    expect(savingButton).toBeInTheDocument();
    expect(savingButton).toBeDisabled();

    // 5. Wait for the fake backend to finish, then verify the button reset
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /save/i })).not.toBeDisabled();
    });
  });
});