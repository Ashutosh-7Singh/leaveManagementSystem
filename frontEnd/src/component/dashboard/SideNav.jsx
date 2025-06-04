// src/component/dashboard/SideNav.jsx
// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';

// const SideNav = ({ role }) => {
//   const basePath = role === 'Admin' ? '/admin' : '/user';
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Optional: Clear cookies/localStorage
//     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     navigate('/login');
//   };

//   return (
//     <div className="side-nav">
//       <NavLink to={`${basePath}/pending`} className="nav-link">Pending</NavLink>
//       <NavLink to={`${basePath}/approved`} className="nav-link">Approved</NavLink>
//       <NavLink to={`${basePath}/rejected`} className="nav-link">Rejected</NavLink>

//       {role === 'Admin' && (
//         <NavLink to={`${basePath}/createleaves`} className="nav-link">CreateLeaves</NavLink>
//       )}

//       {/* ✅ Logout at bottom */}
//       <button onClick={handleLogout} className="nav-link logout-btn" style={{ marginTop: '2rem', color: 'red' }}>
//         Logout
//       </button>
//     </div>
//   );
// };

// export default SideNav;


// src/component/dashboard/SideNav.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNav = ({ role }) => {
  const basePath = role === 'Admin' ? '/admin' : '/user';

  return (
    <div className="side-nav">
 {role === 'Admin' && (
        <NavLink to={`${basePath}/createleaves`} className="nav-link">
          CreateLeaves
        </NavLink>
      )}

      <NavLink to={`${basePath}/pending`} className="nav-link">Pending</NavLink>
      <NavLink to={`${basePath}/approved`} className="nav-link">Approved</NavLink>
      <NavLink to={`${basePath}/rejected`} className="nav-link">Rejected</NavLink>

      {/* ✅ Only show to Admin */}
     
    </div>
  );
};

export default SideNav;


// // src/component/dashboard/SideNav.jsx
// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const SideNav = ({ role }) => {
//   const basePath = role === 'Admin' ? '/admin' : '/user';

//   return (
//     <div className="side-nav">
//       <NavLink to={`${basePath}/pending`} className="nav-link">Pending</NavLink>
//       <NavLink to={`${basePath}/approved`} className="nav-link">Approved</NavLink>
//       <NavLink to={`${basePath}/rejected`} className="nav-link">Rejected</NavLink>
//       <NavLink to={`${basePath}/createleaves`} className="nav-link">CreateLeaves </NavLink>
//     </div>
//   );
// };

// export default SideNav;




// // src/component/dashboard/SideNav.jsx
// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const SideNav = () => {
//   return (
//     <div className="side-nav">
//       <NavLink to="/admin/pending" className="nav-link">Pending</NavLink>
//       <NavLink to="/admin/approved" className="nav-link">Approved</NavLink>
//       <NavLink to="/admin/rejected" className="nav-link">Rejected</NavLink>
//     </div>
//   );
// };

// export default SideNav;
