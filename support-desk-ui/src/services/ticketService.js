// src/services/ticketService.js
import { apiRequest } from './httpClient';

// We just pass the specific path, method, token, and body to our new helper!

export const createTicket = async (token, payload) => {
  return await apiRequest('/tickets', {
    method: 'POST',
    token: token,
    body: payload
  });
};

export const updateTicket = async (id, token, payload) => {
  return await apiRequest(`/tickets/${id}`, {
    method: 'PUT',
    token: token,
    body: payload
  });
};

export const getTicketById = async (id, token) => {
  return await apiRequest(`/tickets/${id}`, {
    method: 'GET',
    token: token
  });
};