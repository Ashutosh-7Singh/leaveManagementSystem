// component/dashboard/UserDashboard.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TopNav from './TopNav'
import SideNav from './SideNav' // optionally you can create a separate UserSideNav
import UserApproved from './user/UserApproved'
import UserPending from './user/UserPending'
import UserRejected from './user/UserRejected'
import '../styles/dashboard.css';

const UserDashboard = () => {
  return (
    <div className="dashboard-layout">
      <TopNav />
      <div className="dashboard-content">
           <SideNav role="User" />
        <div className="dashboard-pages">
         <Routes>
          <Route path="approved" element={<UserApproved />} />
          <Route path="pending" element={<UserPending />} />
          <Route path="rejected" element={<UserRejected />} />
        </Routes>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard
