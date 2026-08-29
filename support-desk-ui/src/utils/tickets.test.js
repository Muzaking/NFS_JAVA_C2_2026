// src/utils/tickets.test.js

import { describe, it, expect } from 'vitest';
import { filterTickets } from './tickets';

const sampleTickets = [
  { id: 'T001', title: 'Cannot access email', category: 'Email', status: 'OPEN', priority: 'HIGH' },
  { id: 'T002', title: 'Laptop running slowly', category: 'Hardware', status: 'IN_PROGRESS', priority: 'MEDIUM' },
  { id: 'T003', title: 'Password reset request', category: 'Account', status: 'CLOSED', priority: 'LOW' }
];

describe('filterTickets Utility', () => {
  
  it('filters by search text', () => {
    const result = filterTickets(sampleTickets, 'laptop', 'ALL');
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('T002');
  });

  it('filters by status', () => {
    const result = filterTickets(sampleTickets, '', 'OPEN');
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('T001');
  });

  it('filters by search text and status together', () => {
    const result = filterTickets(sampleTickets, 'reset', 'CLOSED');
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('T003');
  });

  it('returns all tickets when search is empty and status is ALL', () => {
    const result = filterTickets(sampleTickets, '', 'ALL');
    expect(result.length).toBe(3);
  });
  
});