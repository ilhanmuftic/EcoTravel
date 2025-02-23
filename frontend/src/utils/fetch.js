export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('authToken');  // Get the stored token

  if (!token) {
    window.location.href = "/login"; // Redirect to login page
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers, // Spread any custom headers
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("authToken"); // Clear token
    window.location.href = "/login"; // Redirect to login page
  }


  return response;  // Return the parsed JSON response
};
