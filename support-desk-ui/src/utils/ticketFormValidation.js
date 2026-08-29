export const formatTicketFormLabel = (key) => {
  if (!key) return '';
  return key.charAt(0).toUpperCase() + key.slice(1);
};

export const validateTicketFormStep = (formValues, stepToValidate = 1, reviewConfirmed = false) => {
  const errors = {};
  
  if (!formValues.title || !formValues.title.trim()) {
    errors.title = `${formatTicketFormLabel('title')} is required`;
  }
  
  if (!formValues.description || !formValues.description.trim()) {
    errors.description = `${formatTicketFormLabel('description')} is required`;
  }

  // Check against valid backend enums
  const validStatuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
  const validPriorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  if (formValues.status && !validStatuses.includes(formValues.status)) {
    errors.status = 'Invalid status selected';
  }

  if (formValues.priority && !validPriorities.includes(formValues.priority)) {
    errors.priority = 'Invalid priority level selected';
  }
  
  return errors;
};

export const normalizeTicketFormPayload = (formValues) => {
  return {
    title: formValues.title ? formValues.title.trim() : '',
    description: formValues.description ? formValues.description.trim() : '',
    // Apply defaults if empty, matching the backend expectations
    status: formValues.status && formValues.status.trim() ? formValues.status.trim() : 'OPEN',
    priority: formValues.priority && formValues.priority.trim() ? formValues.priority.trim() : 'MEDIUM',
  };
};