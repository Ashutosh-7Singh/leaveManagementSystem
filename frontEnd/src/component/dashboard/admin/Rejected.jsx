import React, { useEffect, useState } from 'react';
import { fetchRejectedLeaves } from '../../services/adminService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../styles/rejected.css'; 

const Rejected = () => {
  const [leaves, setLeaves] = useState([]);
  const [rejectedReasons, setRejectedReasons] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const data = await fetchRejectedLeaves();
        setLeaves(data.data);

        const reasons = {};
        data.data.forEach((leave) => {
          reasons[leave._id] = leave.rejectionReason || 'Not provided';
        });
        setRejectedReasons(reasons);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error('Session expired or failed to fetch. Redirecting to login.');
        navigate('/login');
      }
    };

    fetchLeaves();
  }, [navigate]);

  return (
    <div className="rejected-container">
      <h2>Rejected Leaves</h2>
      <table className="rejected-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Leave Type</th>
            <th>Date</th>
            <th>Slot</th>
            <th>Reason</th>
            <th>Rejection Reason</th>
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
                <td className="rejection-reason" title={rejectedReasons[leave._id]}>
                  {rejectedReasons[leave._id]}
                </td>
                <td className="status-rejected">Rejected</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rejected;


// // src/component/dashboard/Rejected.jsx
// import React, { useEffect, useState } from 'react';
// import { fetchRejectedLeaves } from '../../services/adminService';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Rejected = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [rejectedReasons, setRejectedReasons] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLeaves = async () => {
//       try {
//         const data = await fetchRejectedLeaves();
//         setLeaves(data.data);

//         const reasons = {};
//         data.data.forEach((leave) => {
//           reasons[leave._id] = leave.rejectionReason || 'Not provided';
//         });
//         setRejectedReasons(reasons);
//       // eslint-disable-next-line no-unused-vars
//       } catch (error) {
//         toast.error('Session expired or failed to fetch. Redirecting to login.');
//         navigate('/login');
//       }
//     };

//     fetchLeaves();
//   }, [navigate]);

//   return (
//     <div>
//       <h2>Rejected Leaves</h2>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Leave Type</th>
//             <th>Date</th>
//             <th>Slot</th>
//             <th>Reason</th>
//             <th>Rejection Reason</th>
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
//                 <td>{rejectedReasons[leave._id]}</td>
//                 <td>Rejected</td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Rejected;





// // src/component/dashboard/Rejected.jsx
// import React, { useEffect, useState } from 'react';

// const Rejected = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [rejectedReasons, setRejectedReasons] = useState({});

//   useEffect(() => {
//     const fetchRejectedLeaves = async () => {
//       try {
//         const res = await fetch(
//           'http://localhost:5003/api/leave-applications/filter-by-status?statuses=rejected',
//           {
//             credentials: 'include',
//           }
//         );
//         const data = await res.json();

//         setLeaves(data.data);

//         // If rejection reasons are returned separately in future, extract them here:
//         const reasons = {};
//         data.data.forEach((leave) => {
//           reasons[leave._id] = leave.rejectionReason || 'Not provided';
//         });
//         setRejectedReasons(reasons);
//       } catch (error) {
//         console.error('Error fetching rejected leaves:', error);
//       }
//     };

//     fetchRejectedLeaves();
//   }, []);

//   return (
//     <div>
//       <h2>Rejected Leaves</h2>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Leave Type</th>
//             <th>Date</th>
//             <th>Slot</th>
//             <th>Reason</th>
//             <th>Rejection Reason</th>
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
//                 <td>{rejectedReasons[leave._id]}</td>
//                 <td>Rejected</td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Rejected;
