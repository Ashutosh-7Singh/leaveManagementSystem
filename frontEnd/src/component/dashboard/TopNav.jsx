import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

const TopNav = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5003/api/user/me', {
          credentials: 'include' // Important for sending cookies
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    // Clear localStorage/cookies if needed
    navigate('/login');
  };

  return (
    <div className="top-nav" style={{
      display: 'flex',
      justifyContent: 'space-between', // This distributes space between elements
      alignItems: 'center',
      padding: '0 20px',
      height: '60px',
      backgroundColor: '#004080',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Left side - User icon and name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FontAwesomeIcon icon={faUserSecret} style={{ color: 'white', fontSize: '20px' }} />
        <span style={{ color: 'white', fontWeight: 'bold' }}>
          {user ? user.name : 'Loading...'}
        </span>
      </div>

      {/* Middle - Leave Management title */}
      <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
        Leave Management System
      </div>

      {/* Right side - Logout button */}
      <button 
        className="logout-btn" 
        onClick={handleLogout}
        style={{
          padding: '8px 16px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default TopNav;

// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// const TopNav = () => {
//   const navigate = useNavigate()

//   const handleLogout = () => {
//     // Clear localStorage/cookies if needed
//     navigate('/login')
//   }

//   return (
//     <div className="top-nav" style={{
//       display: 'flex',
//       justifyContent: 'flex-end', // This pushes content to the right
//       alignItems: 'center',
//       padding: '0 20px',
//       height: '60px', // Adjust as needed
//       backgroundColor: '#004080', // Optional background color
//       boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Optional shadow
//     }}>
//       <button 
//         className="logout-btn" 
//         onClick={handleLogout}
//         style={{
//           padding: '8px 16px',
//           backgroundColor: '#dc3545',
//           color: 'white',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer'
//         }}
//       >
//         Logout
//       </button>
//     </div>
//   )
// }

// export default TopNav




// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// const TopNav = () => {
//   const navigate = useNavigate()

//   const handleLogout = () => {
//     // Clear localStorage/cookies if needed
//     navigate('/login')
//   }

//   return (
//     <div className="top-nav">
//       <input className="search-bar" type="text" placeholder="Search..." />
//       <button className="logout-btn" onClick={handleLogout}>Logout</button>
//     </div>
//   )
// }

// export default TopNav


