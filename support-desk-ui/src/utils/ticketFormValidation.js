// src/utils/ticketFormValidation.js

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
  
  // Note: stepToValidate and reviewConfirmed are included for future wizard expansion
  return errors;
};

export const normalizeTicketFormPayload = (formValues) => {
  return {
    title: formValues.title ? formValues.title.trim() : '',
    description: formValues.description ? formValues.description.trim() : '',
  };
};