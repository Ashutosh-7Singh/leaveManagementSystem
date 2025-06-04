import React, { useEffect, useState } from 'react';
import { getRejectedLeaves, reapplyLeave } from '../../services/userService';
import { toast } from 'react-toastify';
import '../../styles/userRejected.css';

const leaveOptions = [
  { type: 'sickLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
  { type: 'earnedLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
  { type: 'casualLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
];

const UserRejected = () => {
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  const fetchLeaves = async () => {
    try {
      const res = await getRejectedLeaves();
      setLeaves(res.data || []);
    } catch (err) {
      toast.error(err.message || 'Failed to load rejected leaves');
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const openModal = (leave) => {
    setSelectedLeave({
      ...leave,
      date: leave.date.split('T')[0],
      reason: '',
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedLeave((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        reason: selectedLeave.reason,
        leaveType: selectedLeave.leaveType,
        date: selectedLeave.date,
        slot: selectedLeave.slot,
      };
      await reapplyLeave(selectedLeave._id, payload);
      toast.success('Leave reapplied successfully');
      setShowModal(false);
      fetchLeaves();
    } catch (err) {
      toast.error(err.message || 'Failed to reapply');
    }
  };

  return (
    <div className="user-rejected-container">
      <h2>Rejected Leaves</h2>
      <table className="rejected-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Leave Type</th>
            <th>Applied At</th>
            <th>Slot</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Admin Remarks</th>
            <th>Remaining Leaves</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.user?.name}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.appliedAt ? new Date(leave.appliedAt).toLocaleDateString() : '—'}</td>
              <td>{leave.slot}</td>
              <td>{leave.reason}</td>
              <td className="status-rejected">{leave.status}</td>
              <td>{leave.adminRemarks || '—'}</td>
              <td>
                {leave.leaveType === 'sickLeaves' && leave.user?.sickLeaves}
                {leave.leaveType === 'casualLeaves' && leave.user?.casualLeaves}
                {leave.leaveType === 'earnedLeaves' && leave.user?.earnedLeaves}
              </td>
              <td>
                <button className="reapply-btn" onClick={() => openModal(leave)}>
                  Reapply
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedLeave && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Reapply for Leave</h3>
            <form className="reapply-form" onSubmit={handleSubmit}>
              <label>
                Leave Type:
                <select
                  name="leaveType"
                  value={selectedLeave.leaveType}
                  onChange={handleChange}
                  required
                >
                  {leaveOptions.map((opt) => (
                    <option key={opt.type} value={opt.type}>
                      {opt.type}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Slot:
                <select
                  name="slot"
                  value={selectedLeave.slot}
                  onChange={handleChange}
                  required
                >
                  {leaveOptions
                    .find((opt) => opt.type === selectedLeave.leaveType)
                    ?.slots.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                </select>
              </label>
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={selectedLeave.date}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Updated Reason:
                <textarea
                  name="reason"
                  value={selectedLeave.reason}
                  onChange={handleChange}
                  required
                />
              </label>
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Resubmit
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRejected;



// import React, { useEffect, useState } from 'react';
// import { getRejectedLeaves, reapplyLeave } from '../../services/userService';
// import { toast } from 'react-toastify';

// const leaveOptions = [
//   { type: 'sickLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
//   { type: 'earnedLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
//   { type: 'casualLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
// ];

// const UserRejected = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedLeave, setSelectedLeave] = useState(null);

//   const fetchLeaves = async () => {
//     try {
//       const res = await getRejectedLeaves();
//       setLeaves(res.data || []);
//     } catch (err) {
//       toast.error(err.message || 'Failed to load rejected leaves');
//     }
//   };

//   useEffect(() => {
//     fetchLeaves();
//   }, []);

//   const openModal = (leave) => {
//     setSelectedLeave({
//       ...leave,
//       date: leave.date.split('T')[0],
//       reason: '', // let user input updated reason
//     });
//     setShowModal(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedLeave((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         reason: selectedLeave.reason,
//         leaveType: selectedLeave.leaveType,
//         date: selectedLeave.date,
//         slot: selectedLeave.slot,
//       };
//       await reapplyLeave(selectedLeave._id, payload);
//       toast.success('Leave reapplied successfully');
//       setShowModal(false);
//       fetchLeaves(); // Refresh table
//     } catch (err) {
//       toast.error(err.message || 'Failed to reapply');
//     }
//   };

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h2>Rejected Leaves</h2>
//       <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '1rem' }}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Leave Type</th>
//             <th>Applied At</th>
//             <th>Slot</th>
//             <th>Reason</th>
//             <th>Status</th>
//             <th>Admin Remarks</th>
//             <th>Remaining Leaves</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaves.map((leave) => (
//             <tr key={leave._id}>
//               <td>{leave.user?.name}</td>
//               <td>{leave.leaveType}</td>
//               <td>{leave.appliedAt ? new Date(leave.appliedAt).toLocaleDateString() : '—'}</td>
//               <td>{leave.slot}</td>
//               <td>{leave.reason}</td>
//               <td>{leave.status}</td>
//               <td>{leave.adminRemarks || '—'}</td>
//               <td>
//                 {leave.leaveType === 'sickLeaves' && leave.user?.sickLeaves}
//                 {leave.leaveType === 'casualLeaves' && leave.user?.casualLeaves}
//                 {leave.leaveType === 'earnedLeaves' && leave.user?.earnedLeaves}
//               </td>
//               <td>
//                 <button onClick={() => openModal(leave)}>Reapply</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showModal && selectedLeave && (
//         <div
//           className="modal"
//           style={{
//             background: '#f9f9f9',
//             padding: '1rem',
//             marginTop: '1rem',
//             border: '1px solid #ccc',
//             borderRadius: '8px',
//           }}
//         >
//           <h3>Reapply for Leave</h3>
//           <form onSubmit={handleSubmit}>
//             <label>
//               Leave Type:
//               <select
//                 name="leaveType"
//                 value={selectedLeave.leaveType}
//                 onChange={handleChange}
//                 required
//               >
//                 {leaveOptions.map((opt) => (
//                   <option key={opt.type} value={opt.type}>
//                     {opt.type}
//                   </option>
//                 ))}
//               </select>
//             </label>
//             <br />
//             <label>
//               Slot:
//               <select
//                 name="slot"
//                 value={selectedLeave.slot}
//                 onChange={handleChange}
//                 required
//               >
//                 {leaveOptions
//                   .find((opt) => opt.type === selectedLeave.leaveType)
//                   ?.slots.map((s) => (
//                     <option key={s} value={s}>
//                       {s}
//                     </option>
//                   ))}
//               </select>
//             </label>
//             <br />
//             <label>
//               Date:
//               <input
//                 type="date"
//                 name="date"
//                 value={selectedLeave.date}
//                 onChange={handleChange}
//                 required
//               />
//             </label>
//             <br />
//             <label>
//               Updated Reason:
//               <textarea
//                 name="reason"
//                 value={selectedLeave.reason}
//                 onChange={handleChange}
//                 required
//               />
//             </label>
//             <br />
//             <button type="submit">Resubmit</button>
//             <button
//               type="button"
//               onClick={() => setShowModal(false)}
//               style={{ marginLeft: '1rem' }}
//             >
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserRejected;



// import React, { useState } from 'react';

// // Hardcoded leave types with slot options
// const leaveOptions = [
//   { type: 'sickLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
//   { type: 'earnedLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
//   { type: 'casualLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
// ];

// // Initial rejected leave data
// const initialData = [
//   {
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
//     status: 'rejected',
//     appliedAt: '2025-06-04T09:07:19.366Z',
//     adminRemarks: 'Insufficient leave balance',
//   },
// ];

// const UserRejected = () => {
//   const [leaves, setLeaves] = useState(initialData);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedLeave, setSelectedLeave] = useState(null);

//   const openModal = (leave) => {
//     setSelectedLeave({ ...leave, date: leave.date.split('T')[0] }); // format date
//     setShowModal(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedLeave((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedLeaves = leaves.map((leave) =>
//       leave._id === selectedLeave._id
//         ? {
//             ...selectedLeave,
//             status: 'leaveApplied',
//             adminRemarks: '',
//             appliedAt: new Date().toISOString(),
//           }
//         : leave
//     );
//     setLeaves(updatedLeaves);
//     setShowModal(false);
//   };

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h2>Rejected Leaves</h2>
//       <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '1rem' }}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Leave Type</th>
//             <th>Applied At</th>
//             <th>Slot</th>
//             <th>Reason</th>
//             <th>Status</th>
//             <th>Admin Remarks</th>
//             <th>Remaining Leaves</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaves.map((leave) => (
//             <tr key={leave._id}>
//               <td>{leave.user.name}</td>
//               <td>{leave.leaveType}</td>
//               <td>{new Date(leave.appliedAt).toLocaleDateString()}</td>
//               <td>{leave.slot}</td>
//               <td>{leave.reason}</td>
//               <td>{leave.status}</td>
//               <td>{leave.adminRemarks}</td>
//               <td>
//                 {leave.leaveType === 'sickLeaves' && leave.user.sickLeaves}
//                 {leave.leaveType === 'casualLeaves' && leave.user.casualLeaves}
//                 {leave.leaveType === 'earnedLeaves' && leave.user.earnedLeaves}
//               </td>
//               <td>
//                 <button onClick={() => openModal(leave)}>Reply</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showModal && selectedLeave && (
//         <div
//           className="modal"
//           style={{
//             background: '#f9f9f9',
//             padding: '1rem',
//             marginTop: '1rem',
//             border: '1px solid #ccc',
//             borderRadius: '8px',
//           }}
//         >
//           <h3>Reply to Leave Request</h3>
//           <form onSubmit={handleSubmit}>
//             <label>
//               Leave Type:
//               <select name="leaveType" value={selectedLeave.leaveType} onChange={handleChange} required>
//                 {leaveOptions.map((opt) => (
//                   <option key={opt.type} value={opt.type}>
//                     {opt.type}
//                   </option>
//                 ))}
//               </select>
//             </label>
//             <br />
//             <label>
//               Slot:
//               <select name="slot" value={selectedLeave.slot} onChange={handleChange} required>
//                 {leaveOptions
//                   .find((opt) => opt.type === selectedLeave.leaveType)
//                   ?.slots.map((s) => (
//                     <option key={s} value={s}>
//                       {s}
//                     </option>
//                   ))}
//               </select>
//             </label>
//             <br />
//             <label>
//               Date:
//               <input type="date" name="date" value={selectedLeave.date} onChange={handleChange} required />
//             </label>
//             <br />
//             <label>
//               Reason:
//               <textarea name="reason" value={selectedLeave.reason} readOnly />
//             </label>
//             <br />
//             <button type="submit">Resubmit</button>
//             <button type="button" onClick={() => setShowModal(false)} style={{ marginLeft: '1rem' }}>
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserRejected;



// // import React, { useState } from 'react';

// // // Hardcoded leave types with slot options
// // const leaveOptions = [
// //   { type: 'sickLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
// //   { type: 'earnedLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
// //   { type: 'casualLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
// // ];

// // // Initial rejected leave data
// // const initialData = [
// //   {
// //     _id: '68400cc7a9dc8d2d927b4b73',
// //     user: {
// //       _id: '683f6761013cb828de3195b1',
// //       name: 'Ashutosh Singh',
// //       casualLeaves: 5,
// //       sickLeaves: 5,
// //     },
// //     leaveType: 'sickLeaves',
// //     date: '2025-06-05T00:00:00.000Z',
// //     slot: 'firstHalf',
// //     reason: 'Feeling unwell',
// //     status: 'rejected',
// //     appliedAt: '2025-06-04T09:07:19.366Z',
// //     adminRemarks: 'Insufficient leave balance',
// //   },
// // ];

// // const UserRejected = () => {
// //   const [leaves, setLeaves] = useState(initialData);
// //   const [showModal, setShowModal] = useState(false);
// //   const [selectedLeave, setSelectedLeave] = useState(null);

// //   const openModal = (leave) => {
// //     setSelectedLeave({ ...leave });
// //     setShowModal(true);
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setSelectedLeave((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const updatedLeaves = leaves.map((leave) =>
// //       leave._id === selectedLeave._id
// //         ? { ...selectedLeave, status: 'leaveApplied', adminRemarks: '' }
// //         : leave
// //     );
// //     setLeaves(updatedLeaves);
// //     setShowModal(false);
// //   };

// //   return (
// //     <div style={{ padding: '1rem' }}>
// //       <h2>Rejected Leaves</h2>
// //       <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '1rem' }}>
// //         <thead>
// //           <tr>
// //             <th>Name</th>
// //             <th>Leave Type</th>
// //             <th>Applied At</th>
// //             <th>Slot</th>
// //             <th>Reason</th>
// //             <th>Status</th>
// //             <th>Admin Remarks</th>
// //             <th>Remaining Leaves</th>
// //             <th>Action</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {leaves.map((leave) => (
// //             <tr key={leave._id}>
// //               <td>{leave.user.name}</td>
// //               <td>{leave.leaveType}</td>
// //               <td>{new Date(leave.appliedAt).toLocaleDateString()}</td>
// //               <td>{leave.slot}</td>
// //               <td>{leave.reason}</td>
// //               <td>{leave.status}</td>
// //               <td>{leave.adminRemarks}</td>
// //               <td>
// //                 {leave.leaveType === 'sickLeaves' && leave.user.sickLeaves}
// //                 {leave.leaveType === 'casualLeaves' && leave.user.casualLeaves}
// //                 {leave.leaveType === 'earnedLeaves' && leave.user.earnedLeaves}
// //               </td>
// //               <td>
// //                 <button onClick={() => openModal(leave)}>Reply</button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {showModal && selectedLeave && (
// //         <div
// //           className="modal"
// //           style={{
// //             background: '#f2f2f2',
// //             padding: '1rem',
// //             marginTop: '1rem',
// //             border: '1px solid #ccc',
// //           }}
// //         >
// //           <h3>Reply to Leave Request</h3>
// //           <form onSubmit={handleSubmit}>
// //             <label>
// //               Leave Type:
// //               <select name="leaveType" value={selectedLeave.leaveType} onChange={handleChange} required>
// //                 {leaveOptions.map((opt) => (
// //                   <option key={opt.type} value={opt.type}>
// //                     {opt.type}
// //                   </option>
// //                 ))}
// //               </select>
// //             </label>
// //             <br />
// //             <label>
// //               Slot:
// //               <select name="slot" value={selectedLeave.slot} onChange={handleChange} required>
// //                 {leaveOptions
// //                   .find((opt) => opt.type === selectedLeave.leaveType)
// //                   ?.slots.map((s) => (
// //                     <option key={s} value={s}>
// //                       {s}
// //                     </option>
// //                   ))}
// //               </select>
// //             </label>
// //             <br />
// //             <label>
// //               Date:
// //               <input type="date" name="date" value={selectedLeave.date.split('T')[0]} readOnly />
// //             </label>
// //             <br />
// //             <label>
// //               Reason:
// //               <textarea name="reason" value={selectedLeave.reason} readOnly />
// //             </label>
// //             <br />
// //             <button type="submit">Resubmit</button>
// //             <button type="button" onClick={() => setShowModal(false)} style={{ marginLeft: '1rem' }}>
// //               Cancel
// //             </button>
// //           </form>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default UserRejected;
