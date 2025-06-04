import React, { useEffect, useState } from 'react';
import {
  getLeaveBalance,
  applyLeave,
  getPendingLeaves,
} from '../../services/userService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../../styles/userPending.css'; // Add this import

const leaveOptions = [
  { type: 'sickLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
  { type: 'earnedLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
  { type: 'casualLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
];

const UserPending = () => {
  const [leaves, setLeaves] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: '',
    slot: '',
    date: '',
    reason: '',
  });

  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const leaveBal = await getLeaveBalance();
      const leaveBalObj = {};
      leaveBal.leaves.forEach((item) => {
        leaveBalObj[item.type] = item.balance;
      });
      setLeaveBalance(leaveBalObj);

      const submitted = await getPendingLeaves();
      const formattedLeaves = submitted.data.map((l) => ({
        ...l,
        status: 'Submitted',
        balance: leaveBalObj[l.leaveType] ?? 'N/A',
      }));
      setLeaves(formattedLeaves);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error('Session expired. Redirecting to login...');
      navigate('/login');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyLeave(formData);
      toast.success('Leave submitted successfully');
      setShowModal(false);
      setFormData({ leaveType: '', slot: '', date: '', reason: '' });
      loadData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="user-pending-container">
     <div className="header-container">
      <h2>Pending Leaves</h2>
      <button className="apply-leave-btn" onClick={() => setShowModal(true)}>
        + Apply Leave
      </button>
    </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Apply for Leave</h3>
            <form className="leave-form" onSubmit={handleSubmit}>
              <label>
                Leave Type:
                <select name="leaveType" value={formData.leaveType} onChange={handleChange} required>
                  <option value="">Select</option>
                  {leaveOptions.map((opt) => (
                    <option key={opt.type} value={opt.type}>
                      {opt.type} (Remaining: {leaveBalance[opt.type] ?? 0})
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Slot:
                <select name="slot" value={formData.slot} onChange={handleChange} required>
                  <option value="">Select</option>
                  {formData.leaveType &&
                    leaveOptions
                      .find((opt) => opt.type === formData.leaveType)
                      ?.slots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                </select>
              </label>
              <label>
                Date:
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              </label>
              <label>
                Reason:
                <textarea name="reason" value={formData.reason} onChange={handleChange} required />
              </label>
              <div className="form-actions">
                <button type="submit" className="submit-btn">Submit</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="pending-table">
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Remaining</th>
            <th>Date</th>
            <th>Slot</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length > 0 ? (
            leaves.map((leave, idx) => (
              <tr key={idx}>
                <td>{leave.leaveType}</td>
                <td>{leave.balance}</td>
                <td>{leave.date?.split('T')[0]}</td>
                <td>{leave.slot}</td>
                <td>{leave.reason}</td>
                <td className="status-pending">{leave.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-leaves">
                No leaves applied yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserPending;

// import React, { useEffect, useState } from 'react';
// import {
//   getLeaveBalance,
//   applyLeave,
//   getPendingLeaves,
// } from '../../services/userService';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const leaveOptions = [
//   { type: 'sickLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
//   { type: 'earnedLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
//   { type: 'casualLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
// ];

// const UserPending = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [leaveBalance, setLeaveBalance] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     leaveType: '',
//     slot: '',
//     date: '',
//     reason: '',
//   });

//   const navigate = useNavigate();

//   const loadData = async () => {
//     try {
//       const leaveBal = await getLeaveBalance();
//       const leaveBalObj = {};
//       leaveBal.leaves.forEach((item) => {
//         leaveBalObj[item.type] = item.balance;
//       });
//       setLeaveBalance(leaveBalObj);

//       const submitted = await getPendingLeaves();
//       const formattedLeaves = submitted.data.map((l) => ({
//         ...l,
//         status: 'Submitted',
//         balance: leaveBalObj[l.leaveType] ?? 'N/A',
//       }));
//       setLeaves(formattedLeaves);
//     // eslint-disable-next-line no-unused-vars
//     } catch (err) {
//       toast.error('Session expired. Redirecting to login...');
//       navigate('/login');
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await applyLeave(formData);
//       toast.success('Leave submitted successfully');
//       setShowModal(false);
//       setFormData({ leaveType: '', slot: '', date: '', reason: '' });
//       loadData();
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="user-pending-container" style={{ padding: '1rem' }}>
//       <h2>Pending Leaves</h2>
//       <button onClick={() => setShowModal(true)}>+ Apply Leave</button>

//       {showModal && (
//         <div className="modal" style={{ background: '#eee', padding: '1rem', margin: '1rem 0' }}>
//           <h3>Apply for Leave</h3>
//           <form onSubmit={handleSubmit}>
//             <label>
//               Leave Type:
//               <select name="leaveType" value={formData.leaveType} onChange={handleChange} required>
//                 <option value="">Select</option>
//                 {leaveOptions.map((opt) => (
//                   <option key={opt.type} value={opt.type}>
//                     {opt.type} (Remaining: {leaveBalance[opt.type] ?? 0})
//                   </option>
//                 ))}
//               </select>
//             </label>
//             <br />
//             <label>
//               Slot:
//               <select name="slot" value={formData.slot} onChange={handleChange} required>
//                 <option value="">Select</option>
//                 {formData.leaveType &&
//                   leaveOptions
//                     .find((opt) => opt.type === formData.leaveType)
//                     ?.slots.map((slot) => (
//                       <option key={slot} value={slot}>
//                         {slot}
//                       </option>
//                     ))}
//               </select>
//             </label>
//             <br />
//             <label>
//               Date:
//               <input type="date" name="date" value={formData.date} onChange={handleChange} required />
//             </label>
//             <br />
//             <label>
//               Reason:
//               <textarea name="reason" value={formData.reason} onChange={handleChange} required />
//             </label>
//             <br />
//             <button type="submit">Submit</button>
//             <button type="button" onClick={() => setShowModal(false)} style={{ marginLeft: '1rem' }}>
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}

//       <table border="1" cellPadding="8" style={{ marginTop: '1rem', width: '100%' }}>
//         <thead>
//           <tr>
//             <th>Leave Type</th>
//             <th>Remaining</th>
//             <th>Date</th>
//             <th>Slot</th>
//             <th>Reason</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaves.length > 0 ? (
//             leaves.map((leave, idx) => (
//               <tr key={idx}>
//                 <td>{leave.leaveType}</td>
//                 <td>{leave.balance}</td>
//                 <td>{leave.date?.split('T')[0]}</td>
//                 <td>{leave.slot}</td>
//                 <td>{leave.reason}</td>
//                 <td>{leave.status}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" align="center">
//                 No leaves applied yet.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserPending;






// // src/components/UserPending.jsx
// import React, { useEffect, useState } from 'react';
// import {
//   fetchUserLeaveBalance,
//   fetchAppliedLeaves,
//   // applyLeave,
// } from '../../services/authService'
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const leaveOptions = [
//   { type: 'sickLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
//   { type: 'earnedLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
//   { type: 'casualLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
// ];

// const UserPending = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [leaveBalance, setLeaveBalance] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     leaveType: '',
//     slot: '',
//     date: '',
//     reason: '',
//   });

//   const navigate = useNavigate();

//   const loadData = async () => {
//     try {
//       const leaveBal = await fetchUserLeaveBalance();
//       const leaveBalObj = {};
//       leaveBal.leaves.forEach((item) => {
//         leaveBalObj[item.type] = item.balance;
//       });
//       setLeaveBalance(leaveBalObj);

//       const submitted = await fetchAppliedLeaves();
//       const formattedLeaves = submitted.data.map((l) => ({
//         ...l,
//         status: 'Submitted',
//         balance: leaveBalObj[l.leaveType] ?? 'N/A'
//       }));
//       setLeaves(formattedLeaves);
//     // eslint-disable-next-line no-unused-vars
//     } catch (err) {
//       toast.error('Session expired. Redirecting to login...');
//       navigate('/login');
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await applyLeave(formData);
//       toast.success('Leave submitted successfully');
//       setShowModal(false);
//       setFormData({ leaveType: '', slot: '', date: '', reason: '' });
//       loadData();
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="user-pending-container" style={{ padding: '1rem' }}>
//       <h2>Pending Leaves</h2>
//       <button onClick={() => setShowModal(true)}>+ Apply Leave</button>

//       {showModal && (
//         <div className="modal" style={{ background: '#eee', padding: '1rem', margin: '1rem 0' }}>
//           <h3>Apply for Leave</h3>
//           <form onSubmit={handleSubmit}>
//             <label>
//               Leave Type:
//               <select name="leaveType" value={formData.leaveType} onChange={handleChange} required>
//                 <option value="">Select</option>
//                 {leaveOptions.map((opt) => (
//                   <option key={opt.type} value={opt.type}>
//                     {opt.type} (Remaining: {leaveBalance[opt.type] ?? 0})
//                   </option>
//                 ))}
//               </select>
//             </label>
//             <br />
//             <label>
//               Slot:
//               <select name="slot" value={formData.slot} onChange={handleChange} required>
//                 <option value="">Select</option>
//                 {formData.leaveType &&
//                   leaveOptions
//                     .find((opt) => opt.type === formData.leaveType)
//                     ?.slots.map((slot) => (
//                       <option key={slot} value={slot}>
//                         {slot}
//                       </option>
//                     ))}
//               </select>
//             </label>
//             <br />
//             <label>
//               Date:
//               <input type="date" name="date" value={formData.date} onChange={handleChange} required />
//             </label>
//             <br />
//             <label>
//               Reason:
//               <textarea name="reason" value={formData.reason} onChange={handleChange} required />
//             </label>
//             <br />
//             <button type="submit">Submit</button>
//             <button type="button" onClick={() => setShowModal(false)} style={{ marginLeft: '1rem' }}>
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}

//       <table border="1" cellPadding="8" style={{ marginTop: '1rem', width: '100%' }}>
//         <thead>
//           <tr>
//             <th>Leave Type</th>
//             <th>Remaining</th>
//             <th>Date</th>
//             <th>Slot</th>
//             <th>Reason</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaves.length > 0 ? (
//             leaves.map((leave, idx) => (
//               <tr key={idx}>
//                 <td>{leave.leaveType}</td>
//                 <td>{leave.balance}</td>
//                 <td>{leave.date?.split('T')[0]}</td>
//                 <td>{leave.slot}</td>
//                 <td>{leave.reason}</td>
//                 <td>{leave.status}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" align="center">
//                 No leaves applied yet.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserPending;



// // // src/component/UserPending.jsx
// // import React, { useState } from 'react';

// // const initialLeaves = []; // this will hold submitted leaves

// // const leaveOptions = [
// //   { type: 'sickLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
// //   { type: 'earnedLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
// //   { type: 'casualLeaves', slots: ['full', 'firstHalf', 'secondHalf'] },
// // ];

// // const UserPending = () => {
// //   const [leaves, setLeaves] = useState(initialLeaves);
// //   const [showModal, setShowModal] = useState(false);
// //   const [formData, setFormData] = useState({
// //     leaveType: '',
// //     slot: '',
// //     date: '',
// //     reason: '',
// //   });

// //   const handleChange = (e) => {
// //     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const newLeave = {
// //       ...formData,
// //       user: 'Moni Singh',
// //       status: 'leaveApplied',
// //     };
// //     setLeaves((prev) => [...prev, newLeave]);
// //     setShowModal(false);
// //     setFormData({ leaveType: '', slot: '', date: '', reason: '' });
// //   };

// //   return (
// //     <div className="user-pending-container" style={{ padding: '1rem' }}>
// //       <h2>Pending Leaves</h2>
// //       <button onClick={() => setShowModal(true)}>+ Apply Leave</button>

// //       {showModal && (
// //         <div className="modal" style={{ background: '#eee', padding: '1rem', margin: '1rem 0' }}>
// //           <h3>Apply for Leave</h3>
// //           <form onSubmit={handleSubmit}>
// //             <label>
// //               Leave Type:
// //               <select name="leaveType" value={formData.leaveType} onChange={handleChange} required>
// //                 <option value="">Select</option>
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
// //               <select name="slot" value={formData.slot} onChange={handleChange} required>
// //                 <option value="">Select</option>
// //                 {formData.leaveType &&
// //                   leaveOptions
// //                     .find((opt) => opt.type === formData.leaveType)
// //                     ?.slots.map((slot) => (
// //                       <option key={slot} value={slot}>
// //                         {slot}
// //                       </option>
// //                     ))}
// //               </select>
// //             </label>
// //             <br />
// //             <label>
// //               Date:
// //               <input type="date" name="date" value={formData.date} onChange={handleChange} required />
// //             </label>
// //             <br />
// //             <label>
// //               Reason:
// //               <textarea name="reason" value={formData.reason} onChange={handleChange} required />
// //             </label>
// //             <br />
// //             <button type="submit">Submit</button>
// //             <button type="button" onClick={() => setShowModal(false)} style={{ marginLeft: '1rem' }}>
// //               Cancel
// //             </button>
// //           </form>
// //         </div>
// //       )}

// //       <table border="1" cellPadding="8" style={{ marginTop: '1rem', width: '100%' }}>
// //         <thead>
// //           <tr>
// //             <th>Leave Type</th>
// //             <th>Date</th>
// //             <th>Slot</th>
// //             <th>Reason</th>
// //             <th>Status</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {leaves.length > 0 ? (
// //             leaves.map((leave, idx) => (
// //               <tr key={idx}>
// //                 <td>{leave.leaveType}</td>
// //                 <td>{leave.date}</td>
// //                 <td>{leave.slot}</td>
// //                 <td>{leave.reason}</td>
// //                 <td>{leave.status}</td>
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan="5" align="center">
// //                 No leaves applied yet.
// //               </td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default UserPending;
