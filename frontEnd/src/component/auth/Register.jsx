import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/auth.css';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
    dateOfJoining: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple validation
    if (!form.name || !form.email || !form.password || !form.dateOfJoining) {
      toast.error('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      await registerUser(form);
      toast.success('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="auth-select"
          required
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>

        <input
          type="date"
          name="dateOfJoining"
          value={form.dateOfJoining}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="auth-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;


// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
// import { registerUser } from '../../services/authService' // ✅ import service
// import '../styles/auth.css'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const Register = () => {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'User',
//     dateOfJoining: ''
//   })

//   const [showPassword, setShowPassword] = useState(false)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)

//     // Basic client-side validation
//     if (!form.name || !form.email || !form.password || !form.role || !form.dateOfJoining) {
//       setError('Please fill all required fields')
//       setLoading(false)
//       return
//     }

//     try {
//       await registerUser(form)
//       setSuccess(true)
//       setTimeout(() => navigate('/login'), 1500)
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   return (
//     <div className="auth-container">
//       <form className="auth-form" onSubmit={handleSubmit}>
//         <h2>Register</h2>

//         {error && <div className="error-message">{error}</div>}
//         {success && <div className="success-message">Registration successful! Redirecting to login...</div>}

//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />

//         <div className="password-input-container">
//           <input
//             type={showPassword ? 'text' : 'password'}
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />
//           <span className="password-toggle" onClick={togglePasswordVisibility}>
//             <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//           </span>
//         </div>

//         <select
//           name="role"
//           value={form.role}
//           onChange={handleChange}
//           className="auth-select"
//           required
//         >
//           <option value="User">User</option>
//           <option value="Admin">Admin</option>
//         </select>

//         <input
//           type="date"
//           name="dateOfJoining"
//           value={form.dateOfJoining}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? 'Registering...' : 'Register'}
//         </button>

//         <p className="auth-link">
//           Already have an account? <a href="/login">Login</a>
//         </p>
//       </form>
//     </div>
//   )
// }

// export default Register





// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
// import '../styles/auth.css';
// const Register = () => {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'User',
//     dateOfJoining: ''
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)
    
//     // Simulate API call
//     setTimeout(() => {
//       setLoading(false)
//       if (form.email && form.password) {
//         setSuccess(true)
//         setTimeout(() => navigate('/login'), 1500)
//       } else {
//         setError('Please fill all required fields')
//       }
//     }, 1000)
//   }

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   return (
//     <div className="auth-container">
//       <form className="auth-form" onSubmit={handleSubmit}>
//         <h2>Register</h2>
//         {error && <div className="error-message">{error}</div>}
//         {success && <div className="success-message">Registration successful! Redirecting to login...</div>}
        
//         <input 
//           type="text" 
//           name="name" 
//           placeholder="Name" 
//           value={form.name} 
//           onChange={handleChange} 
//           required 
//         />
        
//         <input 
//           type="email" 
//           name="email" 
//           placeholder="Email" 
//           value={form.email} 
//           onChange={handleChange} 
//           required 
//         />
        
//         <div className="password-input-container">
//           <input 
//             type={showPassword ? "text" : "password"} 
//             name="password" 
//             placeholder="Password" 
//             value={form.password} 
//             onChange={handleChange} 
//             required 
//           />
//           <span className="password-toggle" onClick={togglePasswordVisibility}>
//             <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//           </span>
//         </div>
        
//         <select 
//           name="role" 
//           value={form.role} 
//           onChange={handleChange}
//           className="auth-select"
//           required
//         >
//           <option value="User">User</option>
//           <option value="Admin">Admin</option>
//         </select>
        
//         <input 
//           type="date" 
//           name="dateOfJoining" 
//           value={form.dateOfJoining} 
//           onChange={handleChange} 
//           required 
//         />
        
//         <button type="submit" disabled={loading}>
//           {loading ? 'Registering...' : 'Register'}
//         </button>
//         <p className="auth-link">Already have an account? <a href="/login">Login</a></p>
//       </form>
//     </div>
//   )
// }

// export default Register