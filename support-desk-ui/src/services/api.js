// src/services/api.js

export async function fetchApiInfo() {
  const response = await fetch('/api/v1/info');
  
  if (!response.ok) {
    throw new Error('Failed to connect to backend server');
  }
  
  return response.json();
}