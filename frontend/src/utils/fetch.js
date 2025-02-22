export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('authToken');  // Get the stored token
    
    if (!token) {
      throw new Error('No token found');
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

  
    return response;  // Return the parsed JSON response
  };
  