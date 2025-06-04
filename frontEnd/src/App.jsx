// App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './component/auth/Login'
import Register from './component/auth/Register'
import Dashboard from './component/dashboard/Dashboard'
import UserDashboard from './component/dashboard/UserDashboard'
import './component/styles/global.css';
import './component/styles/variables.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<div className="auth-page"><Login /></div>} />
        <Route path="/register" element={<div className="auth-page"><Register /></div>} />
        <Route path="/" element={<div className="auth-page"><Login /></div>} />
        
        {/* Dashboard routes based on role */}
        <Route path="/admin/*" element={<Dashboard />} />
        <Route path="/user/*" element={<UserDashboard />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  )
}

export default App






// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import Login from './component/auth/Login';
// import Register from './component/auth/Register';
// import Dashboard from './component/dashboard/Dashboard';

// import './component/styles/global.css';
// import './component/styles/variables.css';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<div className="auth-page"><Login /></div>} />
//         <Route path="/register" element={<div className="auth-page"><Register /></div>} />
//         {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}
//         <Route path="/" element={<div className="auth-page"><Login /></div>} />
//          <Route path="/admin/*" element={<Dashboard />} />
//       </Routes>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </Router>
//   );
// }

// export default App;








// // src/App.jsx
// import { Routes, Route } from 'react-router-dom';
// import Login from './component/auth/Login';
// import Register from './component/auth/Register';
// import Home from './component/pages/Home'; 
// import Dashboard from './component/dashboard/Dashboard'
// import './component/style/main.css';

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<div className="auth-page"><Home /></div>} />
//       <Route path="/login" element={<div className="auth-page"><Login /></div>} />
//       <Route path="/register" element={<div className="auth-page"><Register /></div>} />
//       <Route path="/admin/*" element={<Dashboard />} />
//       {/* <Route path="/user/*" element={<UserDashboard />} /> */}

//     </Routes>
//   );
// }

// export default App;




