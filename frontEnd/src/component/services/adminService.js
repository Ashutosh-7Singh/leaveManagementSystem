// === Part 1: Fix CORS and Auto-Redirect on Cookie Expiry === //

// File: src/services/adminService.js
const BASE_URL = 'http://localhost:5003/api';

const handleResponse = async (res) => {
  if (res.status === 401) {
    window.location.href = '/login'; // Redirect to login on unauthorized
    throw new Error('Unauthorized. Redirecting to login.');
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

export const fetchLeavesByStatus = async (status) => {
  const res = await fetch(`${BASE_URL}/leave-applications/filter-by-status?statuses=${status}`, {
    credentials: 'include',
  });
  return handleResponse(res);
};

export const fetchPendingLeaves = async () => {
  const res = await fetch(`${BASE_URL}/leave-applications/pending`, {
    credentials: 'include',
  });
  return handleResponse(res);
};

export const approveLeave = async (id) => {
  const res = await fetch(`${BASE_URL}/leave-applications/approve/${id}`, {
    method: 'PUT',
    credentials: 'include',
  });
  return handleResponse(res);
};

export const rejectLeave = async (id, reason) => {
  const res = await fetch(`${BASE_URL}/leave-applications/reject/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ reason }),
  });
  return handleResponse(res);
};


export const fetchApprovedLeaves = async () => {
  const res = await fetch(`${BASE_URL}/leave-applications/filter-by-status?statuses=approved`, {
    credentials: 'include',
  });
  return handleResponse(res);
};

export const fetchRejectedLeaves = async () => {
  const res = await fetch(`${BASE_URL}/leave-applications/filter-by-status?statuses=rejected`, {
    credentials: 'include',
  });
  return handleResponse(res);
};

// export const createLeaveType = async (data) => {
//   const res = await fetch(`${BASE_URL}/leaves/create`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     credentials: 'include',
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) throw new Error('Failed to create leave type');
//   return res.json();
// };
// src/services/leaveService.js

export const createLeaveType = async (data) => {
  const res = await fetch(`${BASE_URL}/leaves/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    // Throw exact message from backend
    throw new Error(responseData.message || 'Failed to create leave type');
  }

  return responseData;
};
