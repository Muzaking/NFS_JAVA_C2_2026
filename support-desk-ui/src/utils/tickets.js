// src/utils/tickets.js

export const filterTickets = (tickets, searchText = '', statusFilter = 'ALL') => {
  if (!tickets) return [];

  return tickets.filter(ticket => {
    // 1. Check if the title includes the search text (ignoring case)
    const matchesSearch = searchText 
      ? ticket.title.toLowerCase().includes(searchText.toLowerCase())
      : true;

    // 2. Check if the status matches (unless it's 'ALL' or empty)
    const matchesStatus = (statusFilter && statusFilter !== 'ALL') 
      ? ticket.status === statusFilter 
      : true;

    // 3. Keep the ticket only if it matches both conditions
    return matchesSearch && matchesStatus;
  });
};