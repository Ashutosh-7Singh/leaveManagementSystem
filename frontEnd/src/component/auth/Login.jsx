import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import '../styles/auth.css'
import { loginUser } from '../services/authService'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = await loginUser({ email, password })
      toast.success('Login successful')

      if (data.user.role === 'Admin') {
        navigate('/admin/pending')
      } else {
        navigate('/user/pending')
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        
        <div className="password-input-container">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="auth-link">Don't have an account? <a href="/register">Register</a></p>
      </form>
    </div>
  )
}

export default Login







// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
// import '../styles/auth.css';

// const Login = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [showPassword, setShowPassword] = useState(false)
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)
    
//     // Simulate API call
//     setTimeout(() => {
//       setLoading(false)
//       if (email === 'admin@example.com' && password === 'admin123') {
//         navigate('/admin')
//       } else if (email === 'user@example.com' && password === 'user123') {
//         navigate('/user')
//       } else {
//         setError('Invalid credentials. Try admin@example.com/admin123 or user@example.com/user123')
//       }
//     }, 1000)
//   }

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   return (
//     <div className="auth-container">
//       <form className="auth-form" onSubmit={handleSubmit}>
//         <h2>Login</h2>
//         {error && <div className="error-message">{error}</div>}
//         <input 
//           type="email" 
//           placeholder="Email" 
//           value={email} 
//           onChange={e => setEmail(e.target.value)} 
//           required 
//         />
        
//         <div className="password-input-container">
//           <input 
//             type={showPassword ? "text" : "password"} 
//             placeholder="Password" 
//             value={password} 
//             onChange={e => setPassword(e.target.value)} 
//             required 
//           />
//           <span className="password-toggle" onClick={togglePasswordVisibility}>
//             <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//           </span>
//         </div>
        
//         <button type="submit" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//         <p className="auth-link">Don't have an account? <a href="/register">Register</a></p>
//       </form>
//     </div>
//   )
// }

// export default Login
