import React, { useEffect, useState } from 'react';
import { getApprovedLeaves } from '../../services/userService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../../styles/userApproved.css'; // Add this import

const UserApproved = () => {
  const [leaves, setLeaves] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovedLeave = async () => {
      try {
        const res = await getApprovedLeaves();
        setLeaves(res.data || []);
      } catch (error) {
        toast.error(error.message || 'Failed to load approved leaves');
        navigate('/login');
      }
    };

    fetchApprovedLeave();
  }, [navigate]);

  const getRemainingLeaves = (leave) => {
    if (leave.leaveType === 'sickLeaves') return leave.user?.sickLeaves ?? 0;
    if (leave.leaveType === 'casualLeaves') return leave.user?.casualLeaves ?? 0;
    if (leave.leaveType === 'earnedLeaves') return leave.user?.earnedLeaves ?? 0;
    return 0;
  };

  return (
    <div className="user-approved-container">
      <h2>Approved Leaves</h2>

      {leaves.length === 0 ? (
        <p className="no-leaves-message">No approved leaves found.</p>
      ) : (
        <table className="user-approved-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Leave Type</th>
              <th>Date</th>
              <th>Applied At</th>
              <th>Slot</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Remaining Leaves</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.user?.name || 'N/A'}</td>
                <td>{leave.leaveType}</td>
                <td>{new Date(leave.date).toLocaleDateString()}</td>
                <td>{leave.appliedAt ? new Date(leave.appliedAt).toLocaleDateString() : '—'}</td>
                <td>{leave.slot}</td>
                <td>{leave.reason}</td>
                <td className="status-approved">{leave.status}</td>
                <td className="remaining-leaves">{getRemainingLeaves(leave)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserApproved;


// import React, { useEffect, useState } from 'react';
// import { getApprovedLeaves } from '../../services/userService';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const UserApproved = () => {
//   const [leaves, setLeaves] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchApprovedLeave = async () => {
//       try {
//         const res = await getApprovedLeaves();
//         setLeaves(res.data || []);
//       } catch (error) {
//         toast.error(error.message || 'Failed to load approved leaves');
//         navigate('/login');
//       }
//     };

//     fetchApprovedLeave();
//   }, [navigate]);

//   const getRemainingLeaves = (leave) => {
//     if (leave.leaveType === 'sickLeaves') return leave.user?.sickLeaves ?? 0;
//     if (leave.leaveType === 'casualLeaves') return leave.user?.casualLeaves ?? 0;
//     if (leave.leaveType === 'earnedLeaves') return leave.user?.earnedLeaves ?? 0;
//     return 0;
//   };

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h2>Approved Leaves</h2>

//       {leaves.length === 0 ? (
//         <p>No approved leaves found.</p>
//       ) : (
//         <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '1rem' }}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Leave Type</th>
//               <th>Date</th>
//               <th>Applied At</th>
//               <th>Slot</th>
//               <th>Reason</th>
//               <th>Status</th>
//               {/* <th>Admin Remarks</th> */}
//               <th>Remaining Leaves</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaves.map((leave) => (
//               <tr key={leave._id}>
//                 <td>{leave.user?.name || 'N/A'}</td>
//                 <td>{leave.leaveType}</td>
//                 <td>{new Date(leave.date).toLocaleDateString()}</td>
//                 <td>{leave.appliedAt ? new Date(leave.appliedAt).toLocaleDateString() : '—'}</td>
//                 <td>{leave.slot}</td>
//                 <td>{leave.reason}</td>
//                 <td>{leave.status}</td>
//                 {/* <td>{leave.adminRemarks || '—'}</td> */}
//                 <td>{getRemainingLeaves(leave)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default UserApproved;







// // src/components/UserApproved.jsx
// import React, { useEffect, useState } from 'react';
// import { getApprovedLeaves } from '../../services/userService';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const UserApproved = () => {
//   const [leave, setLeave] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchApprovedLeave = async () => {
//       try {
//         const res = await getApprovedLeaves();
//         setLeave(res.data);
//       } catch (error) {
//         toast.error(error.message || 'Failed to load approved leave');
//         navigate('/login');
//       }
//     };

//     fetchApprovedLeave();
//   }, [navigate]);

//   const getRemainingLeaves = () => {
//     if (!leave) return 0;
//     if (leave.leaveType === 'sickLeaves') return leave.user.sickLeaves;
//     if (leave.leaveType === 'casualLeaves') return leave.user.casualLeaves;
//     if (leave.leaveType === 'earnedLeaves') return leave.user.earnedLeaves;
//     return 0;
//   };

//   if (!leave) {
//     return <div style={{ padding: '1rem' }}>Loading approved leave data...</div>;
//   }

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h2>Approved Leaves</h2>
//       <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '1rem' }}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Leave Type</th>
//             <th>Date</th>
//             <th>Applied At</th>
//             <th>Slot</th>
//             <th>Reason</th>
//             <th>Status</th>
//             <th>Admin Remarks</th>
//             <th>Remaining Leaves</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>{leave?.user?.name}</td>
//             <td>{leave.leaveType}</td>
//             <td>{new Date(leave.date).toLocaleDateString()}</td>
//             <td>{new Date(leave.appliedAt).toLocaleDateString()}</td>
//             <td>{leave.slot}</td>
//             <td>{leave.reason}</td>
//             <td>{leave.status}</td>
//             {/* <td>{leave.adminRemarks}</td> */}
//             <td>{getRemainingLeaves()}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserApproved;




// import React, { useState } from 'react';

// const approvedLeaveData = {
//   data: {
//     _id: '68400cc7a9dc8d2d927b4b73',
//     user: {
//       _id: '683f6761013cb828de3195b1',
//       name: 'Ashutosh Singh',
//       casualLeaves: 5,
//       sickLeaves: 5,
//       earnedLeaves: 0,
//     },
//     leaveType: 'sickLeaves',
//     date: '2025-06-05T00:00:00.000Z',
//     slot: 'firstHalf',
//     reason: 'Feeling unwell',
//     status: 'approved',
//     appliedAt: '2025-06-04T09:07:19.366Z',
//     adminRemarks: 'Insufficient leave balance',
//   },
// };

// const UserApproved = () => {
//   const [leave] = useState(approvedLeaveData.data);

//   const getRemainingLeaves = () => {
//     if (leave.leaveType === 'sickLeaves') return leave.user.sickLeaves;
//     if (leave.leaveType === 'casualLeaves') return leave.user.casualLeaves;
//     if (leave.leaveType === 'earnedLeaves') return leave.user.earnedLeaves;
//     return 0;
//   };

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h2>Approved Leaves</h2>
//       <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '1rem' }}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Leave Type</th>
//             <th>Date</th>
//             <th>Applied At</th>
//             <th>Slot</th>
//             <th>Reason</th>
//             <th>Status</th>
//             <th>Admin Remarks</th>
//             <th>Remaining Leaves</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>{leave.user.name}</td>
//             <td>{leave.leaveType}</td>
//             <td>{new Date(leave.date).toLocaleDateString()}</td>
//             <td>{new Date(leave.appliedAt).toLocaleDateString()}</td>
//             <td>{leave.slot}</td>
//             <td>{leave.reason}</td>
//             <td>{leave.status}</td>
//             <td>{leave.adminRemarks}</td>
//             <td>{getRemainingLeaves()}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserApproved;
