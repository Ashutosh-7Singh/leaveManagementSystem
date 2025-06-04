import React, { useState } from 'react';
import { createLeaveType } from '../../services/adminService';
import { toast } from 'react-toastify';
import '../../styles/leaveInitializer.css'; // Add this import

const leaveTypes = [
  { type: 'sickLeaves', initialBalance: 7 },
  { type: 'casualLeaves', initialBalance: 5 },
  { type: 'earnedLeaves', initialBalance: 0 },
];

const LeaveInitializer = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  const handleCreateClick = (leave) => {
    setSelectedLeave(leave);
    setShowConfirm(true);
  };

  const handleConfirmCreate = async () => {
    try {
      await createLeaveType(selectedLeave);
      toast.success(`${selectedLeave.type} created successfully`);
    } catch (err) {
      toast.error(err.message || 'Failed to create leave');
    } finally {
      setShowConfirm(false);
      setSelectedLeave(null);
    }
  };

  return (
    <div className="leave-initializer">
      <h2>Initialize Leave Types</h2>
      <table className="leave-table">
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Initial Balance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveTypes.map((leave) => (
            <tr key={leave.type}>
              <td>{leave.type}</td>
              <td>{leave.initialBalance}</td>
              <td>
                <button 
                  className="action-button"
                  onClick={() => handleCreateClick(leave)}
                >
                  Create
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirm && selectedLeave && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>
              Are you sure you want to create <strong>{selectedLeave.type}</strong> with{' '}
              <strong>{selectedLeave.initialBalance}</strong> days?
            </p>
            <div className="modal-actions">
              <button className="confirm-button" onClick={handleConfirmCreate}>
                Yes
              </button>
              <button 
                className="cancel-button" 
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveInitializer;

// import React, { useState } from 'react';
// import { createLeaveType } from '../../services/adminService';
// import { toast } from 'react-toastify';

// const leaveTypes = [
//   { type: 'sickLeaves', initialBalance: 7 },
//   { type: 'casualLeaves', initialBalance: 5 },
//   { type: 'earnedLeaves', initialBalance: 0 },
// ];

// const LeaveInitializer = () => {
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [selectedLeave, setSelectedLeave] = useState(null);

//   const handleCreateClick = (leave) => {
//     setSelectedLeave(leave);
//     setShowConfirm(true);
//   };

//   const handleConfirmCreate = async () => {
//     try {
//       await createLeaveType(selectedLeave);
//       toast.success(`${selectedLeave.type} created successfully`);
//     } catch (err) {
//       toast.error(err.message || 'Failed to create leave');
//     } finally {
//       setShowConfirm(false);
//       setSelectedLeave(null);
//     }
//   };

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h2>Initialize Leave Types</h2>
//       <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '1rem' }}>
//         <thead>
//           <tr>
//             <th>Leave Type</th>
//             <th>Initial Balance</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaveTypes.map((leave) => (
//             <tr key={leave.type}>
//               <td>{leave.type}</td>
//               <td>{leave.initialBalance}</td>
//               <td>
//                 <button onClick={() => handleCreateClick(leave)}>Create</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showConfirm && selectedLeave && (
//         <div
//           className="modal"
//           style={{
//             background: '#fff',
//             border: '1px solid #ccc',
//             padding: '1rem',
//             borderRadius: '8px',
//             marginTop: '1rem',
//           }}
//         >
//           <p>
//             Are you sure you want to create <strong>{selectedLeave.type}</strong> with{' '}
//             <strong>{selectedLeave.initialBalance}</strong> days?
//           </p>
//           <button onClick={handleConfirmCreate}>Yes</button>
//           <button onClick={() => setShowConfirm(false)} style={{ marginLeft: '1rem' }}>
//             Cancel
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeaveInitializer;
