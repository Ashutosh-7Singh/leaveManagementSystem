import React, { useEffect, useState } from 'react';
import { fetchApprovedLeaves } from '../../services/adminService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../styles/approved.css'; // Add this import

const Approved = () => {
  const [leaves, setLeaves] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const data = await fetchApprovedLeaves();
        setLeaves(data.data);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error('Session expired or failed to fetch. Redirecting to login.');
        navigate('/login');
      }
    };

    fetchLeaves();
  }, [navigate]);

  return (
    <div className="approved-container">
      <h2>Approved Leaves</h2>
      <table className="approved-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Leave Type</th>
            <th>Date</th>
            <th>Slot</th>
            <th>Reason</th>
            <th>Remaining Leave</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(leaves) &&
            leaves.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.user?.name}</td>
                <td>{leave.leaveType}</td>
                <td>{leave.date?.split('T')[0]}</td>
                <td>{leave.slot}</td>
                <td>{leave.reason}</td>
                <td>
                  {leave.leaveType === 'sickLeaves'
                    ? leave.user?.sickLeaves
                    : leave.leaveType === 'casualLeaves'
                    ? leave.user?.casualLeaves
                    : 'N/A'}
                </td>
                <td className="status-approved">Approved</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Approved;

// // src/component/dashboard/Approved.jsx
// import React, { useEffect, useState } from 'react';
// import { fetchApprovedLeaves } from '../../services/adminService';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import '../../styles/approved.css'

// const Approved = () => {
//   const [leaves, setLeaves] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLeaves = async () => {
//       try {
//         const data = await fetchApprovedLeaves();
//         setLeaves(data.data);
//       // eslint-disable-next-line no-unused-vars
//       } catch (error) {
//         toast.error('Session expired or failed to fetch. Redirecting to login.');
//         navigate('/login');
//       }
//     };

//     fetchLeaves();
//   }, [navigate]);
// return (
//   <div className="approved-leaves-container">
//     <h2>Approved Leaves</h2>
//     <table className="approved-table">
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Leave Type</th>
//           <th>Date</th>
//           <th>Slot</th>
//           <th>Reason</th>
//           <th>Remaining Leave</th>
//           <th>Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {Array.isArray(leaves) &&
//           leaves.map((leave) => (
//             <tr key={leave._id}>
//               <td>{leave.user?.name}</td>
//               <td>{leave.leaveType}</td>
//               <td>{leave.date?.split('T')[0]}</td>
//               <td>{leave.slot}</td>
//               <td>{leave.reason}</td>
//               <td>
//                 {leave.leaveType === 'sickLeaves'
//                   ? leave.user?.sickLeaves
//                   : leave.leaveType === 'casualLeaves'
//                   ? leave.user?.casualLeaves
//                   : 'N/A'}
//               </td>
//               <td>Approved</td>
//             </tr>
//           ))}
//       </tbody>
//     </table>
//   </div>
// );


//   // return (
//   //   <div>
//   //     <h2>Approved Leaves</h2>
//   //     <table border="1" cellPadding="10">
//   //       <thead>
//   //         <tr>
//   //           <th>Name</th>
//   //           <th>Leave Type</th>
//   //           <th>Date</th>
//   //           <th>Slot</th>
//   //           <th>Reason</th>
//   //           <th>Remaining Leave</th>
//   //           <th>Status</th>
//   //         </tr>
//   //       </thead>
//   //       <tbody>
//   //         {Array.isArray(leaves) &&
//   //           leaves.map((leave) => (
//   //             <tr key={leave._id}>
//   //               <td>{leave.user?.name}</td>
//   //               <td>{leave.leaveType}</td>
//   //               <td>{leave.date?.split('T')[0]}</td>
//   //               <td>{leave.slot}</td>
//   //               <td>{leave.reason}</td>
//   //               <td>
//   //                 {leave.leaveType === 'sickLeaves'
//   //                   ? leave.user?.sickLeaves
//   //                   : leave.leaveType === 'casualLeaves'
//   //                   ? leave.user?.casualLeaves
//   //                   : 'N/A'}
//   //               </td>
//   //               <td>Approved</td>
//   //             </tr>
//   //           ))}
//   //       </tbody>
//   //     </table>
//   //   </div>
//   // );
// };

// export default Approved;




// // src/component/dashboard/Approved.jsx
// import React, { useEffect, useState } from 'react';

// const Approved = () => {
//   const [leaves, setLeaves] = useState([]);

//   useEffect(() => {
//     const fetchApprovedLeaves = async () => {
//       try {
//         const res = await fetch(
//           'http://localhost:5003/api/leave-applications/filter-by-status?statuses=approved',
//           {
//             credentials: 'include',
//           }
//         );
//         const data = await res.json();
//         setLeaves(data.data);
//       } catch (error) {
//         console.error('Error fetching approved leaves:', error);
//       }
//     };

//     fetchApprovedLeaves();
//   }, []);

//   return (
//     <div>
//       <h2>Approved Leaves</h2>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
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
//             leaves.map((leave) => (
//               <tr key={leave._id}>
//                 <td>{leave.user?.name}</td>
//                 <td>{leave.leaveType}</td>
//                 <td>{leave.date?.split('T')[0]}</td>
//                 <td>{leave.slot}</td>
//                 <td>{leave.reason}</td>
//                 <td>
//                   {leave.leaveType === 'sickLeaves'
//                     ? leave.user?.sickLeaves
//                     : leave.leaveType === 'casualLeaves'
//                     ? leave.user?.casualLeaves
//                     : 'N/A'}
//                 </td>
//                 <td>Approved</td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Approved;





// // src/component/dashboard/Approved.jsx
// import React from 'react';

// const Approved = ({ leaves }) => {
//   return (
//     <div>
//       <h2>Approved Leaves</h2>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
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
//             .filter((leave) => leave.status === 'approved')
//             .map((leave) => (
//               <tr key={leave._id}>
//                 <td>{leave.user.name}</td>
//                 <td>{leave.leaveType}</td>
//                 <td>{leave.date}</td>
//                 <td>{leave.slot}</td>
//                 <td>{leave.reason}</td>
//                 <td>Approved</td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Approved;
