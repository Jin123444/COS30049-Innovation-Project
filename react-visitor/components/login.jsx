import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const navigate = useNavigate();

  const handleVisitorPress = () => {
      navigate('/visitorRegister');
  };

  const handleParkGuidePress = () => {
    navigate('/parkGuideRegister');
  };

  const handleForgotPassword = () => {
    navigate('/forgotPassword');
  };

  const handleLoginPress = () => {
    navigate('/');
  };


  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
  
      const result = await response.json();
  
      if (response.ok) {
        if (result.otpSent) {
          setMessage('OTP has been sent. Please check your email or phone.');
          setOtpSent(true);
        } else if (result.token) {
          // No OTP needed — directly authenticated
          localStorage.setItem('token', result.token);
          setIsLoggedIn(true);
          setUserRole(result.role);
          setMessage('Login successful!');
        } else {
          setMessage('Unexpected response from server.');
        }
      } else {
        setMessage(result.error || 'Invalid username or password');
        setIsLoggedIn(false);
        setUserRole('');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Error connecting to server');
      setIsLoggedIn(false);
      setUserRole('');
    }
  };  

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
  
    const res = await fetch('http://localhost:5000/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: loginData.username, otp })
    });
  
    const result = await res.json();
  
    if (res.ok) {
      setMessage('Login successful!');
      localStorage.setItem('token', result.token);
      setIsLoggedIn(true);
      setUserRole(result.role);
      handleLoginPress();
    } else {
      setMessage(result.error || 'OTP verification failed');
    }
  };  
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
  
  
      <div style={styles.formContainer}>
        {otpSent ? (
          <form onSubmit={handleOtpSubmit} style={styles.form}>
            <h2>OTP Verification</h2>
            <label style={styles.label}>Enter OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Verify OTP</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleChange}
              required
              style={styles.input}
            />
  
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <div style={styles.forgotPassword} onClick={handleForgotPassword}>
              Forgot Password?
          </div>
            <button type="submit" style={styles.button}>Login</button>
          </form>
        )}
  
        {message && (
          <p style={{ color: isLoggedIn ? 'green' : 'red' }}>{message}</p>
        )}
  
        {isLoggedIn && (
          <p>Logged in as: <strong>{userRole}</strong></p>
        )}
        </div>
        
        <div style={styles.registerContainer}>
            <span>Register as Visitor?</span>
            <span style={styles.registerLink} onClick={handleVisitorPress}>Click here</span>
        </div>
    
        <div style={styles.registerContainer}>
            <span>Register as Park Guide?</span>
            <span style={styles.registerLink} onClick={handleParkGuidePress}>Click here</span>
        </div>
    </div>
  );
  
  
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',          
        width: '100vw',
        backgroundColor: '#ffffff',
        padding: 50,
        boxSizing: 'border-box',
        overflowY: 'auto'      
    },
    
    formContainer: {
        width: '100%',
        maxWidth: 500,
        padding: 40,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        border: '2px solid #DFDFE1',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        boxSizing: 'border-box',
    },
    
      
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 15,
    },
    
    input: {
        padding: 8,
        fontSize: 16,
        border: '2px solid #DFDFE1',
        borderRadius: 8,
        marginTop: 5,
    },

    button: {
        padding: 10,
        backgroundColor: '#2C2C2C',
        color: '#fff',
        border: 'none',
        borderRadius: 20,
        cursor: 'pointer',
        marginTop: 10,
        fontWeight: '600',
        fontSize: '16px',
    },

    label: {
        fontSize: 16,
        fontWeight: 500,
        color: '#333',
        textAlign: 'left',
        marginTop: 10,
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    forgotPassword: {
        fontSize: 12,
        color: '#090D99',
        textAlign: 'right',
        marginTop: 10,
        cursor: 'pointer',
    },

    registerContainer: {
        marginTop: 20,
        fontSize: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    registerLink: {
        color: '#090D99',
        fontSize: 16,
        marginLeft: 5,
        cursor: 'pointer',
    },
  };
  

export default Login;
