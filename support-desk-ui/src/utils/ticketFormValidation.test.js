import { describe, it, expect } from 'vitest';
import { validateTicketFormStep, normalizeTicketFormPayload } from './ticketFormValidation';

describe('Ticket Form Validation & Normalization', () => {
  
  // 1. Required-field test
  it('returns specific validation errors when title or description are empty or contain only whitespace', () => {
    const invalidFormValues = { title: '   ', description: '' };
    const errors = validateTicketFormStep(invalidFormValues);
    
    expect(errors.title).toBe('Title is required');
    expect(errors.description).toBe('Description is required');
  });

  // 2. Invalid priority or status test
  it('flags invalid status or priority values that do not match accepted backend enums', () => {
    const invalidFormValues = { 
      title: 'Login Issue', 
      description: 'Cannot login',
      status: 'UNKNOWN_STATUS', // Invalid status
      priority: 'SUPER_URGENT'  // Invalid priority
    };
    
    // Assuming the validation utility is updated to check enums
    const errors = validateTicketFormStep(invalidFormValues);
    
    expect(errors.status).toBe('Invalid status selected');
    expect(errors.priority).toBe('Invalid priority level selected');
  });

  // 3. Payload normalization test
  it('normalizes the payload by aggressively trimming whitespace and applying default fallback values', () => {
    const rawFormValues = { 
      title: '  Network Down  ', 
      description: '   No Wi-Fi   ',
      status: '   ', // empty string should fallback to OPEN
      priority: null
    };
    
    const normalizedPayload = normalizeTicketFormPayload(rawFormValues);
    
    expect(normalizedPayload.title).toBe('Network Down');
    expect(normalizedPayload.description).toBe('No Wi-Fi');
    expect(normalizedPayload.status).toBe('OPEN');
    expect(normalizedPayload.priority).toBe('MEDIUM');
  });
});