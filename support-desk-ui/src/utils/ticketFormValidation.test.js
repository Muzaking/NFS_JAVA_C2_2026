// src/utils/ticketFormValidation.test.js
import { describe, it, expect } from 'vitest';
import { 
  validateTicketFormStep, 
  normalizeTicketFormPayload, 
  formatTicketFormLabel 
} from './ticketFormValidation';

describe('ticketFormValidation', () => {
  
  it('formats field labels to start with an uppercase letter', () => {
    expect(formatTicketFormLabel('title')).toBe('Title');
    expect(formatTicketFormLabel('description')).toBe('Description');
  });

  it('returns errors when required fields are empty or only whitespace', () => {
    const formValues = { title: '   ', description: '' };
    const errors = validateTicketFormStep(formValues);
    
    expect(errors.title).toBe('Title is required');
    expect(errors.description).toBe('Description is required');
  });

  it('returns an empty errors object when fields are valid', () => {
    const formValues = { title: 'Network Down', description: 'Cannot connect to Wi-Fi' };
    const errors = validateTicketFormStep(formValues);
    
    expect(Object.keys(errors).length).toBe(0);
  });

  it('normalizes the payload by trimming whitespace from all fields', () => {
    const formValues = { title: '  My Bug  ', description: '  Fix it please  ' };
    const payload = normalizeTicketFormPayload(formValues);
    
    expect(payload.title).toBe('My Bug');
    expect(payload.description).toBe('Fix it please');
  });
});