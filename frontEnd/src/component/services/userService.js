const BASE_URL = 'http://localhost:5003/api';

const handleResponse = async (response) => {
  const data = await response.json();

  if (response.status === 401) {
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const getCurrentUser = async () => {
  const response = await fetch(`${BASE_URL}/user/me`, {
    method: 'GET',
    credentials: 'include',
  });
  return handleResponse(response);
};

export const getLeaveBalance = async () => {
  const response = await fetch(`${BASE_URL}/leaves/user`, {
    method: 'GET',
    credentials: 'include',
  });
  return handleResponse(response);
};

export const applyLeave = async (leaveData) => {
  const response = await fetch(`${BASE_URL}/leave-applications/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(leaveData),
  });
  return handleResponse(response);
};

export const getPendingLeaves = async () => {
  const response = await fetch(`${BASE_URL}/leave-applications/filter-by-statusUser?statuses=leaveApplied`, {
    method: 'GET',
    credentials: 'include',
  });
  return handleResponse(response);
};


// ✅ Get approved leaves for current user
export const getApprovedLeaves = async () => {
  const res = await fetch(`${BASE_URL}/leave-applications/filter-by-statusUser?statuses=approved`, {
    method: 'GET',
    credentials: 'include',
  });
  return handleResponse(res);
};




export const getRejectedLeaves = async () => {
  const res = await fetch(`${BASE_URL}/leave-applications/filter-by-statusUser?statuses=rejected`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch rejected leaves');
  return res.json();
};

export const reapplyLeave = async (id, body) => {
  const res = await fetch(`${BASE_URL}/leave-applications/reapply/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to reapply leave');
  return res.json();
};



// // src/services/userService.js

// const BASE_URL = 'http://localhost:5003/api';

// const handleResponse = async (response) => {
//   const data = await response.json();

//   if (response.status === 401) {
//     window.location.href = '/login';
//     throw new Error('Session expired. Please login again.');
//   }

//   if (!response.ok) {
//     throw new Error(data.message || 'Something went wrong');
//   }

//   return data;
// };

// // ✅ Get current user
// export const getCurrentUser = async () => {
//   const res = await fetch(`${BASE_URL}/user/me`, {
//     method: 'GET',
//     credentials: 'include',
//   });
//   return handleResponse(res);
// };

// // ✅ Get leave balance for the logged-in user
// export const fetchUserLeaveBalance = async () => {
//   const res = await fetch(`${BASE_URL}/leaves/user`, {
//     method: 'GET',
//     credentials: 'include',
//   });
//   return handleResponse(res);
// };

// // ✅ Apply for leave
// export const applyLeave = async (leaveData) => {
//   const res = await fetch(`${BASE_URL}/leave-applications/apply`, {
//     method: 'POST',
//     credentials: 'include',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(leaveData),
//   });
//   return handleResponse(res);
// };

// // ✅ Get user’s pending leaves (status: leaveApplied)
// export const fetchAppliedLeaves = async () => {
//   const res = await fetch(`${BASE_URL}/leave-applications/filter-by-statusUser?statuses=leaveApplied`, {
//     method: 'GET',
//     credentials: 'include',
//   });
//   return handleResponse(res);
// };



// // // src/services/userService.js

// // const BASE_URL = 'http://localhost:5003/api';

// // const handleResponse = async (response) => {
// //   const data = await response.json();

// //   if (response.status === 401) {
// //     window.location.href = '/login'; // Token expired or not logged in
// //     throw new Error('Session expired. Please login again.');
// //   }

// //   if (!response.ok) {
// //     throw new Error(data.message || 'Something went wrong');
// //   }

// //   return data;
// // };

// // // Fetch current user info
// // export const getCurrentUser = async () => {
// //   const res = await fetch(`${BASE_URL}/user/me`, {
// //     method: 'GET',
// //     credentials: 'include',
// //   });
// //   return handleResponse(res);
// // };

// // // Get leave balance for current user
// // export const getLeaveBalance = async () => {
// //   const res = await fetch(`${BASE_URL}/leaves/user`, {
// //     method: 'GET',
// //     credentials: 'include',
// //   });
// //   return handleResponse(res);
// // };

// // // Apply for a new leave
// // export const applyLeave = async (leaveData) => {
// //   const res = await fetch(`${BASE_URL}/leave-applications/apply`, {
// //     method: 'POST',
// //     credentials: 'include',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify(leaveData),
// //   });
// //   return handleResponse(res);
// // };

// // // Get all pending leaves for current user
// // export const getPendingLeaves = async () => {
// //   const res = await fetch(`${BASE_URL}/leave-applications/filter-by-statusUser?statuses=leaveApplied`, {
// //     method: 'GET',
// //     credentials: 'include',
// //   });
// //   return handleResponse(res);
// // };
