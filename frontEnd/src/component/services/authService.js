// File: src/services/authService.js

const BASE_URL = 'http://localhost:5003/api'; // Login backend
const REGISTER_URL = 'http://localhost:5004/api'; // Register backend

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${REGISTER_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Something went wrong during registration');
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      credentials: 'include', // important for cookies
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Something went wrong during login');
  }
};




// const BASE_URL = 'http://localhost:5004/api';

// export const registerUser = async (userData) => {
//   try {
//     const response = await fetch(`${BASE_URL}/register`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(userData)
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || 'Registration failed');
//     }

//     return data;
//   } catch (error) {
//     throw new Error(error.message || 'Something went wrong during registration');
//   }
// };
