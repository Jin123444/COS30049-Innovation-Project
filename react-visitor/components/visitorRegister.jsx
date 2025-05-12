import {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const VisitorRegister=({})=> {
const[username, setUsername]=useState('');
const[email, setEmail]=useState('');
const[password, setPassword]=useState('');
const[repeatPassword, setRepeatPassword]=useState('');
const[errors, setErrors]=useState({});

const navigate = useNavigate();


const handleParkGuideRegisterInPress=()=>
{
    navigate('/parkGuideRegister');
}

const handleLogin=()=>
{
    navigate('/login');
}

const validateForm=async ()=>
{
  let errors={};

  if(!username)
  {
    errors.username = "Please enter your username";
  }

  if(!email)
  {
    errors.email = "Please enter your email address";
  }
  else
  {
    const reg=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!reg.test(email))
    {
      errors.email="Please enter a valid email address";
    }
  }

  if(!password)
  {
    errors.password = "Please enter your password";
  }
  else
  {
    const reg=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if(!reg.test(password))
    {
      errors.password="Password must contain at least 8 characters long and include an uppercase, a lowercase, and a digit.";
    }
  }

  if(!repeatPassword)
    {
      errors.repeatPassword = "Please repeat your password";
    }
    else
    {
      if(password!=repeatPassword)
      {
        errors.repeatPassword="Please enter the correct password";
      }
    }
    setErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://172.17.31.174:5000/api/visitorRegister', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            email,
            password,
            role: 'Visitor'
          })
        });
    
        const result = await response.json();
    
        if (response.ok) {
          alert("Registration successful!");
          navigate("/login");
        } else {
          alert(result.error || "Registration failed.");
        }
      } catch (error) {
        console.error("Signup error:", error);
        alert("Error connecting to server.");
      }
    }    
}


  return (
    <div style = {styles.container}>
        <h2 style={styles.title}>Visitor Register</h2>
        <div style={styles.form}>
        
        <label style={styles.form_label}>Username</label>
        <input
            style = {styles.form_input}
            placeholder='Username'
            value={username}
            onChange={e => setUsername(e.target.value)}
        />
        {
            errors.username?<label style={styles.error}>
                {errors.username}</label>: null
        }
        
        <label style={styles.form_label}>Email</label>
        <input
            style={styles.form_input}
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
          {
            errors.email?<label style={styles.error}>
              {errors.email}</label>: null
          }

        <label style={styles.form_label}>Password</label>
        <input
            style={styles.form_input}
            placeholder='Password'
            securelabelEntry
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
        {
            errors.password?<label style={styles.error}>
            {errors.password}</label>: null
        }

        <label style={styles.form_label}>Confirm Password</label>
        <input
            style={styles.form_input}
            placeholder='Repeat Password'
            securelabelEntry
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
        />
        {
            errors.repeatPassword?<label style={styles.error}>
            {errors.repeatPassword}</label>: null
        }

        <button
        title="Register"
        color="#2C2C2C"
        onClick={validateForm}
        style = {styles.form_button}
        >
            Register
        </button>

        </div>

        <div style={styles.registerContainer}>
            <span>Register as Park Guide?</span>
            <span style={styles.registerLink} onClick={handleParkGuideRegisterInPress}>Click here</span>
        </div>

        <div style={styles.registerContainer}>
            <span>Login?</span>
            <span style={styles.registerLink} onClick={handleLogin}>Click here</span>
        </div>


        </div>
  );
}


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
        textAlign: 'left',

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
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '15px',
    },

    error: { 
        color: 'red', 
        marginTop: '5px' 
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
export default VisitorRegister;