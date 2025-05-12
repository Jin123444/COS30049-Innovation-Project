import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AdminRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = async () => {
    let errors = {};

    if (!username) 
    {
      errors.username = "Please enter your username";
    }

    if (!email) 
    {
      errors.email = "Please enter your email address";
    } 
    else 
    {
      const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!reg.test(email)) 
      {
        errors.email = "Please enter a valid email address";
      }
    }

    if (!password) 
    {
      errors.password = "Please enter your password";
    } 
    else 
    {
      const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

      if (!reg.test(password)) 
      {
        errors.password = "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, and a digit.";
      }
    }

    if (!repeatPassword) 
    {
      errors.repeatPassword = "Please repeat your password";
    } 
    else 
    {
        if (password !== repeatPassword) 
        {
          errors.repeatPassword = "Passwords do not match";
        }
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://192.168.0.105:5000/api/adminRegister', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            email,
            password,
            role: 'Admin'
          })
        });

        const result = await response.json();

        if (response.ok) {
          alert("Registration successful!");
          navigate('/addAdmin'); 
        } else {
          alert(result.error || "Registration failed.");
        }
      } catch (error) {
        console.error("Signup error:", error);
        alert("Error connecting to server.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Register</h2>
      <div style={styles.form}>

        <label style={styles.form_label}>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={styles.form_input}
        />
        {errors.username && <div style={styles.error}>{errors.username}</div>}

        <label style={styles.form_label}>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.form_input}
        />
        {errors.email && <div style={styles.error}>{errors.email}</div>}

        <label style={styles.form_label}>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.form_input}
        />
        {errors.password && <div style={styles.error}>{errors.password}</div>}

        <label style={styles.form_label}>Confirm Password</label>
        <input
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={e => setRepeatPassword(e.target.value)}
          style={styles.form_input}
        />
        {errors.repeatPassword && <div style={styles.error}>{errors.repeatPassword}</div>}

        <button
          onClick={validateForm}
          style={styles.form_button}
        >
          Add Admin
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
    height: '100vh',
    width: '100vw',
    backgroundColor: '#ffffff',
    padding: 20,
    boxSizing: 'border-box',
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
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20, 
  },

  form_label: { 
    fontSize: '16px', 
    fontWeight: '500', 
    color: '#333',
    textAlign: 'left',
    display: 'block',
    marginTop: 10,
  },

  form_input: { 
    width: '100%', 
    padding: 8,
    fontSize: 16,
    border: '2px solid #DFDFE1',
    borderRadius: 8,
    marginTop: 5,
  },

  form_button: {
    marginTop: '20px',
    width: '100%',
    padding: '10px',
    backgroundColor: '#2C2C2C',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer'
  },

  error: { 
    color: 'red', 
    marginTop: '5px' 
  }


  



};
export default AdminRegister;
