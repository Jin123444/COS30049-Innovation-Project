import React, { useState } from 'react';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState({});


  const validateForm = () => {
    let errors = {};

    if (!username) {
      errors.username = "Please enter your username";
    }

    if (!password) {
      errors.password = "Please enter your password";
    } else {
      const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!reg.test(password)) {
        errors.password = "Password must contain at least 8 characters, including uppercase, lowercase, and a digit.";
      }
    }

    if (!repeatPassword) {
      errors.repeatPassword = "Please repeat your password";
    } else if (password !== repeatPassword) {
      errors.repeatPassword = "Passwords do not match";
    }

    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      resetPassword();
    }
  };

  const resetPassword = async () => {
    try {
      const response = await fetch("http://192.168.0.105:5000/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          newPassword: password
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert("Password reset successful!");
        //navigate("/login");
      } else {
        alert(result.error || "Reset failed.");
      }
    } catch (error) {
      console.error("Reset error:", error);
      alert("Error connecting to server.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Forgot Password</h2>

      <div style={styles.form}>
        <label style={styles.label}>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          placeholder="Username"
        />
        {errors.username && <div style={styles.errorText}>{errors.username}</div>}

        <label style={styles.label}>New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          placeholder="Password"
        />
        {errors.password && <div style={styles.errorText}>{errors.password}</div>}

        <label style={styles.label}>Confirm Password</label>
        <input
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          style={styles.input}
          placeholder="Repeat Password"
        />
        {errors.repeatPassword && <div style={styles.errorText}>{errors.repeatPassword}</div>}

        <button style={styles.button} onClick={validateForm}>
          Reset Password
        </button>
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

    form: {
        width: '100%',
        maxWidth: 500,
        padding: 40,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        border: '2px solid #DFDFE1',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    

    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
    },

    label: {
      fontSize: '16px', 
      fontWeight: '500', 
      color: '#333',
      textAlign: 'left',
      display: 'block',
      marginTop: 10,
    },

    input: {
      width: '100%', 
      padding: 8,
      fontSize: 16,
      border: '2px solid #DFDFE1',
      borderRadius: 8,
      marginTop: 5,
    },

    errorText: {
      color: 'red', 
      marginTop: '5px' 
    },

    button: {
      marginTop: '20px',
      width: '100%',
      padding: '10px',
      backgroundColor: '#2C2C2C',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '15px',
    }
  };

export default ForgotPassword;
