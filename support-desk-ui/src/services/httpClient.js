// src/services/httpClient.js

const BASE_URL = 'http://localhost:8080/api/v1';

export const apiRequest = async (path, options = {}) => {
  // 1. Extract options, setting defaults where necessary
  const { method = 'GET', body, token, ...customHeaders } = options;

  // 2. Set up the standard headers
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  // 3. Automatically inject the JWT token if one is provided
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  // 4. Automatically stringify JSON bodies
  if (body) {
    config.body = JSON.stringify(body);
  }

  // 5. Execute the fetch request
  const response = await fetch(`${BASE_URL}${path}`, config);

  // 6. Centralized error handling
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Request Failed: ${response.status}`);
  }

  // Handle completely empty responses (like a 204 No Content for DELETE requests)
  if (response.status === 204) {
    return null;
  }

  // 7. Parse and return the JSON
  return response.json();
};