export const loginUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:5003/api/login', {
      method: 'POST',
      credentials: 'include', // crucial for cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};