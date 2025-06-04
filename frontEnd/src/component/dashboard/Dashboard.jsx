// File: src/component/dashboard/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Pending from './admin/Pending';
import Approved from './admin/Approved';
import Rejected from './admin/Rejected';
import TopNav from './TopNav';
import SideNav from './SideNav';
import { fetchPendingLeaves } from '../services/adminService';
import { toast } from 'react-toastify';
import '../styles/dashboard.css';
import CreateLeave from './admin/CreateLeave';

const Dashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [rejectedReasons, setRejectedReasons] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const data = await fetchPendingLeaves();
        setLeaves(data.data);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error('Session expired. Redirecting to login.');
        navigate('/login');
      }
    };

    fetchLeaves();
  }, [navigate]);

  return (
    <div className="dashboard-layout">
      <TopNav />
      <div className="dashboard-content">
        <SideNav role="Admin" />
        <div className="dashboard-pages">
          <Routes>
            <Route
              path="pending"
              element={
                <Pending
                  leaves={leaves}
                  setLeaves={setLeaves}
                  setRejectedReasons={setRejectedReasons}
                />
              }
            />
            <Route path="approved" element={<Approved leaves={leaves} />} />
            <Route path="rejected" element={<Rejected leaves={leaves} rejectedReasons={rejectedReasons} />} />
            <Route path="createleaves" element={<CreateLeave/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;












// // src/component/dashboard/Dashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Pending from './admin/Pending';
// import Approved from './admin/Approved';
// import Rejected from './admin/Rejected';
// import { initialLeaves } from '../../data/leaveData';
// import '../styles/dashboard.css';
// import TopNav from './TopNav';
// import SideNav from './SideNav';

// const Dashboard = () => {
//   const [leaves, setLeaves] = useState(initialLeaves);
//   const [rejectedReasons, setRejectedReasons] = useState({});

//   useEffect(() => {
//     const fetchLeaves = async () => {
//       try {
//         const res = await fetch('http://localhost:5003/api/leave-applications/pending', {
//           credentials: 'include',
//         });
//         const data = await res.json();
//         setLeaves(data.data); // Use actual response structure
//       } catch (error) {
//         console.error('Error fetching leaves:', error);
//       }
//     };

//     fetchLeaves();
//   }, []);

//   return (
//     <div className="dashboard-layout">
//       <TopNav />
//       <div className="dashboard-content">
//         <SideNav role="Admin" />
//         <div className="dashboard-pages">
//           <Routes>
//             <Route
//               path="pending"
//               element={
//                 <Pending
//                   leaves={leaves}
//                   setLeaves={setLeaves}
//                   setRejectedReasons={setRejectedReasons}
//                 />
//               }
//             />
//             <Route path="approved" element={<Approved leaves={leaves} />} />
//             <Route path="rejected" element={<Rejected leaves={leaves} rejectedReasons={rejectedReasons} />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





// import React, { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Pending from './admin/Pending';
// import Approved from './admin/Approved';
// import Rejected from './admin/Rejected';
// import TopNav from './TopNav';
// import SideNav from './SideNav';

// const Dashboard = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [rejectedReasons, setRejectedReasons] = useState({});

//   useEffect(() => {
//     const fetchLeaves = async () => {
//       try {
//         const res = await fetch('http://localhost:5003/api/leave-applications/pending', {
//           credentials: 'include'
//         });
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message || "Failed to fetch leaves");

//         setLeaves(data);
//       } catch (error) {
//         console.error('Error fetching pending leaves:', error.message);
//       }
//     };

//     fetchLeaves();
//   }, []);

//   return (
//     <div className="dashboard-layout">
//       <TopNav />
//       <div className="dashboard-content">
//         <SideNav role="Admin" />
//         <div className="dashboard-pages">
//           <Routes>
//             <Route
//               path="pending"
//               element={
//                 <Pending
//                   leaves={leaves}
//                   setLeaves={setLeaves}
//                   setRejectedReasons={setRejectedReasons}
//                 />
//               }
//             />
//             <Route path="approved" element={<Approved leaves={leaves} />} />
//             <Route path="rejected" element={<Rejected leaves={leaves} rejectedReasons={rejectedReasons} />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// // src/component/dashboard/Dashboard.jsx
// import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// // import TopNav from './TopNav';
// // import SideNav from './SideNav';
// import Pending from './admin/Pending';
// import Approved from './admin/Approved';
// import Rejected from './admin/Rejected';
// // import Approved from './Approved';
// // import Rejected from './Rejected';
// import { initialLeaves } from '../../data/leaveData';
// import '../styles/dashboard.css';
// import TopNav from './TopNav';
// import SideNav from './SideNav';

// const Dashboard = () => {
//   const [leaves, setLeaves] = useState(initialLeaves);
//   const [rejectedReasons, setRejectedReasons] = useState({}); // for modal

//   return (
//     <div className="dashboard-layout">
//       <TopNav />
//       <div className="dashboard-content">
//          <SideNav role="Admin" />
//         <div className="dashboard-pages">
//           <Routes>
//             <Route
//               path="pending"
//               element={<Pending leaves={leaves} setLeaves={setLeaves} setRejectedReasons={setRejectedReasons} />}
//             />
//             <Route path="approved" element={<Approved leaves={leaves} />} />
//             <Route path="rejected" element={<Rejected leaves={leaves} rejectedReasons={rejectedReasons} />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;























// import React from 'react'
// import TopNav from './TopNav'
// import SideNav from './SideNav'
// import { Routes, Route } from 'react-router-dom'
// import Pending from './Pending'
// import Approved from './Approved'
// import Rejected from './Rejected'
// import '../styles/dashboard.css';
// const Dashboard = () => {
//   return (
//     <div className="dashboard-layout">
//       <TopNav />
//       <div className="dashboard-content">
//         <SideNav />
//         <div className="dashboard-pages">
//           <Routes>
//             <Route path="pending" element={<Pending />} />
//             <Route path="approved" element={<Approved />} />
//             <Route path="rejected" element={<Rejected />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard
