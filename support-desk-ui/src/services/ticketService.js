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

export const getPagedTickets = async (token, params = {}) => {
  // Extract parameters with default values
  const { 
    page = 0, 
    size = 5, 
    sortBy = 'createdAt', 
    direction = 'desc', 
    searchText = '', 
    status = '' 
  } = params;
  
  // URLSearchParams automatically formats the ?page=0&size=5 syntax safely
  const queryParams = new URLSearchParams({
    page,
    size,
    sortBy,
    direction
  });

  // Only add search and status if they are not empty
  if (searchText) queryParams.append('search', searchText);
  if (status) queryParams.append('status', status);

  // Use your new apiRequest helper!
  return await apiRequest(`/tickets/paged?${queryParams.toString()}`, {
    method: 'GET',
    token: token
  });
};