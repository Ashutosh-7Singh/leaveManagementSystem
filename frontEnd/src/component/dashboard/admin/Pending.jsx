import React, { useState } from 'react';
import { approveLeave, rejectLeave } from '../../services/adminService';
import { toast } from 'react-toastify';
import '../../styles/pending.css'; // Add this import

const Pending = ({ leaves, setLeaves }) => {
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState('');

  const handleApprove = async () => {
    try {
      await approveLeave(selectedLeaveId);
      toast.success('Leave approved');
      setLeaves(leaves.filter((leave) => leave._id !== selectedLeaveId));
      setSelectedLeaveId(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openRejectModal = () => {
    if (!selectedLeaveId) return toast.error('Select a leave first');
    setShowModal(true);
  };

  const handleReject = async () => {
    if (!reason) return toast.error('Please provide a reason');
    try {
      await rejectLeave(selectedLeaveId, reason);
      toast.success('Leave rejected');
      setLeaves(leaves.filter((leave) => leave._id !== selectedLeaveId));
      setSelectedLeaveId(null);
      setReason('');
      setShowModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="pending-container">
      <h2>Pending Leaves</h2>
      <table className="pending-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Type</th>
            <th>Date</th>
            <th>Slot</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td>
                <input
                  type="radio"
                  name="selectedLeave"
                  onChange={() => setSelectedLeaveId(leave._id)}
                  checked={selectedLeaveId === leave._id}
                />
              </td>
              <td>{leave.user?.name}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.date?.split('T')[0]}</td>
              <td>{leave.slot}</td>
              <td>{leave.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="action-buttons">
        <button onClick={handleApprove} disabled={!selectedLeaveId}>
          Approve
        </button>
        <button onClick={openRejectModal} disabled={!selectedLeaveId}>
          Reject
        </button>
      </div>

      {/* Rejection Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Reject Leave</h3>
            <textarea
              placeholder="Enter rejection reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleReject}>Submit</button>
              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pending;

// // File: src/component/dashboard/admin/Pending.jsx
// import React, { useState,  } from 'react';
// import {approveLeave, rejectLeave } from '../../services/adminService';
// import { toast } from 'react-toastify';

// const Pending = ({ leaves, setLeaves }) => {
//   const [selectedLeaveId, setSelectedLeaveId] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [reason, setReason] = useState('');

//   const handleApprove = async () => {
//     try {
//       await approveLeave(selectedLeaveId);
//       toast.success('Leave approved');
//       setLeaves(leaves.filter((leave) => leave._id !== selectedLeaveId));
//       setSelectedLeaveId(null);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const openRejectModal = () => {
//     if (!selectedLeaveId) return toast.error('Select a leave first');
//     setShowModal(true);
//   };

//   const handleReject = async () => {
//     if (!reason) return toast.error('Please provide a reason');
//     try {
//       await rejectLeave(selectedLeaveId, reason);
//       toast.success('Leave rejected');
//       setLeaves(leaves.filter((leave) => leave._id !== selectedLeaveId));
//       setSelectedLeaveId(null);
//       setReason('');
//       setShowModal(false);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Pending Leaves</h2>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Select</th>
//             <th>Name</th>
//             <th>Type</th>
//             <th>Date</th>
//             <th>Slot</th>
//             <th>Reason</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaves.map((leave) => (
//             <tr key={leave._id}>
//               <td>
//                 <input
//                   type="radio"
//                   name="selectedLeave"
//                   onChange={() => setSelectedLeaveId(leave._id)}
//                   checked={selectedLeaveId === leave._id}
//                 />
//               </td>
//               <td>{leave.user?.name}</td>
//               <td>{leave.leaveType}</td>
//               <td>{leave.date?.split('T')[0]}</td>
//               <td>{leave.slot}</td>
//               <td>{leave.reason}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div style={{ marginTop: '20px' }}>
//         <button onClick={handleApprove} disabled={!selectedLeaveId}>Approve</button>
//         <button onClick={openRejectModal} disabled={!selectedLeaveId}>Reject</button>
//       </div>

//       {/* Rejection Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <h3>Reject Leave</h3>
//             <textarea
//               rows="3"
//               cols="40"
//               placeholder="Enter rejection reason..."
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//             />
//             <div style={{ marginTop: '10px' }}>
//               <button onClick={handleReject}>Submit</button>
//               <button onClick={() => setShowModal(false)} style={{ marginLeft: '10px' }}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Pending;








// // File: src/component/dashboard/admin/Pending.jsx
// import React, { useState, useEffect } from 'react';
// import { fetchPendingLeaves, approveLeave, rejectLeave } from '../../services/adminService';
// import { toast } from 'react-toastify';

// const Pending = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [selectedLeaveId, setSelectedLeaveId] = useState(null);
//   const [reason, setReason] = useState('');

//   useEffect(() => {
//     const loadLeaves = async () => {
//       try {
//         const data = await fetchPendingLeaves();
//         setLeaves(data.data);
//       } catch (error) {
//         toast.error(error.message);
//       }
//     };
//     loadLeaves();
//   }, []);

//   const handleApprove = async () => {
//     try {
//       await approveLeave(selectedLeaveId);
//       toast.success('Leave approved');
//       setLeaves(leaves.filter(leave => leave._id !== selectedLeaveId));
//       setSelectedLeaveId(null);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const handleReject = async () => {
//     if (!reason) return toast.error('Please provide a reason');
//     try {
//       await rejectLeave(selectedLeaveId, reason);
//       toast.success('Leave rejected');
//       setLeaves(leaves.filter(leave => leave._id !== selectedLeaveId));
//       setSelectedLeaveId(null);
//       setReason('');
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Pending Leaves</h2>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Select</th>
//             <th>Name</th>
//             <th>Type</th>
//             <th>Date</th>
//             <th>Slot</th>
//             <th>Reason</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaves.map((leave) => (
//             <tr key={leave._id}>
//               <td>
//                 <input
//                   type="radio"
//                   name="selectedLeave"
//                   onChange={() => setSelectedLeaveId(leave._id)}
//                   checked={selectedLeaveId === leave._id}
//                 />
//               </td>
//               <td>{leave.user?.name}</td>
//               <td>{leave.leaveType}</td>
//               <td>{leave.date?.split('T')[0]}</td>
//               <td>{leave.slot}</td>
//               <td>{leave.reason}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div style={{ marginTop: '20px' }}>
//         <textarea
//           rows="2"
//           cols="40"
//           placeholder="Rejection reason"
//           value={reason}
//           onChange={(e) => setReason(e.target.value)}
//           disabled={!selectedLeaveId}
//         />
//         <br />
//         <button onClick={handleApprove} disabled={!selectedLeaveId}>Approve</button>
//         <button onClick={handleReject} disabled={!selectedLeaveId}>Reject</button>
//       </div>
//     </div>
//   );
// };

// export default Pending;



// // src/component/dashboard/admin/Pending.jsx
// import React, { useState } from 'react';

// const Pending = ({ leaves, setLeaves, setRejectedReasons }) => {
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [rejectReason, setRejectReason] = useState('');

//   const handleCheckboxChange = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
//     );
//   };

//   const handleApprove = async () => {
//     try {
//       for (let id of selectedIds) {
//         await fetch(`http://localhost:5003/api/leave-applications/approve/${id}`, {
//           method: 'PATCH',
//           credentials: 'include',
//         });
//       }

//       const updatedLeaves = leaves.map((leave) =>
//         selectedIds.includes(leave._id)
//           ? { ...leave, status: 'approved' }
//           : leave
//       );

//       setLeaves(updatedLeaves);
//       setSelectedIds([]);
//     } catch (error) {
//       console.error('Approval error:', error);
//     }
//   };

//   const handleRejectSubmit = async () => {
//     try {
//       for (let id of selectedIds) {
//         await fetch(`http://localhost:5003/api/leave-applications/reject/${id}`, {
//           method: 'PATCH',
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ reason: rejectReason }),
//         });
//       }

//       const updatedLeaves = leaves.map((leave) =>
//         selectedIds.includes(leave._id)
//           ? { ...leave, status: 'rejected' }
//           : leave
//       );

//       const reasons = {};
//       selectedIds.forEach((id) => {
//         reasons[id] = rejectReason;
//       });

//       setRejectedReasons((prev) => ({ ...prev, ...reasons }));
//       setLeaves(updatedLeaves);
//       setShowModal(false);
//       setSelectedIds([]);
//       setRejectReason('');
//     } catch (error) {
//       console.error('Rejection error:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Pending Leaves</h2>
//       <div style={{ marginBottom: '1rem' }}>
//         <button onClick={handleApprove}>Approve</button>
//         <button onClick={() => setShowModal(true)}>Reject</button>
//       </div>

//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Select</th>
//             <th>Name</th>
//             <th>Leave Type</th>
//             <th>Date</th>
//             <th>Slot</th>
//             <th>Reason</th>
//             <th>Remaining Leave</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.isArray(leaves) &&
//             leaves
//               .filter((leave) => leave.status === 'leaveApplied')
//               .map((leave) => (
//                 <tr key={leave._id}>
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={selectedIds.includes(leave._id)}
//                       onChange={() => handleCheckboxChange(leave._id)}
//                     />
//                   </td>
//                   <td>{leave.user.name}</td>
//                   <td>{leave.leaveType}</td>
//                   <td>{leave.date.split('T')[0]}</td>
//                   <td>{leave.slot}</td>
//                   <td>{leave.reason}</td>
//                   <td>
//                     {leave.leaveType === 'sickLeaves'
//                       ? leave.user.sickLeaves
//                       : leave.leaveType === 'casualLeaves'
//                       ? leave.user.casualLeaves
//                       : 'N/A'}
//                   </td>
//                   <td>Pending</td>
//                 </tr>
//               ))}
//         </tbody>
//       </table>

//       {/* Reject Modal */}
//       {showModal && (
//         <div className="modal">
//           <h3>Enter Reason for Rejection</h3>
//           <textarea
//             value={rejectReason}
//             onChange={(e) => setRejectReason(e.target.value)}
//           />
//           <br />
//           <button onClick={handleRejectSubmit}>Submit</button>
//           <button onClick={() => setShowModal(false)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Pending;



// // src/component/dashboard/Pending.jsx
// import React, { useState } from 'react';

// const Pending = ({ leaves, setLeaves, setRejectedReasons }) => {
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [rejectReason, setRejectReason] = useState('');

//   const handleCheckboxChange = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
//     );
//   };

//   const handleApprove = () => {
//     const updated = leaves.map((leave) =>
//       selectedIds.includes(leave._id)
//         ? { ...leave, status: 'approved' }
//         : leave
//     );
//     setLeaves(updated);
//     setSelectedIds([]);
//   };

//   const handleRejectSubmit = () => {
//     const updated = leaves.map((leave) =>
//       selectedIds.includes(leave._id)
//         ? { ...leave, status: 'rejected' }
//         : leave
//     );

//     const reasons = {};
//     selectedIds.forEach((id) => {
//       reasons[id] = rejectReason;
//     });

//     setRejectedReasons((prev) => ({ ...prev, ...reasons }));
//     setLeaves(updated);
//     setShowModal(false);
//     setSelectedIds([]);
//     setRejectReason('');
//   };

//   return (
//     <div>
//       <h2>Pending Leaves</h2>
//       <div style={{ marginBottom: '1rem' }}>
//         <button onClick={handleApprove}>Approve</button>
//         <button onClick={() => setShowModal(true)}>Reject</button>
//       </div>

//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Select</th>
//             <th>Name</th>
//             <th>Leave Type</th>
//             <th>Date</th>
//             <th>Slot</th>
//             <th>Reason</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaves
//             .filter((leave) => leave.status === 'leaveApplied')
//             .map((leave) => (
//               <tr key={leave._id}>
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={selectedIds.includes(leave._id)}
//                     onChange={() => handleCheckboxChange(leave._id)}
//                   />
//                 </td>
//                 <td>{leave.user.name}</td>
//                 <td>{leave.leaveType}</td>
//                 <td>{leave.date}</td>
//                 <td>{leave.slot}</td>
//                 <td>{leave.reason}</td>
//                 <td>Pending</td>
//               </tr>
//             ))}
//         </tbody>
//       </table>

//       {/* Reject Modal */}
//       {showModal && (
//         <div className="modal">
//           <h3>Enter Reason for Rejection</h3>
//           <textarea
//             value={rejectReason}
//             onChange={(e) => setRejectReason(e.target.value)}
//           />
//           <br />
//           <button onClick={handleRejectSubmit}>Submit</button>
//           <button onClick={() => setShowModal(false)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Pending;
