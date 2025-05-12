import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAdmin = () => {
    const [admins, setAdmins] = useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        fetchAdmin();
    }, []);

    //login to view data
      const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You are not logged in. Please log in first.');
          navigate('/login');
          return;
        }

        const response = await fetch('http://192.168.0.105:5000/api/adminRegister/alladminToken', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          alert('Session expired or unauthorized. Please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch admin data');
        }

        const data = await response.json();
        console.log("Fetched Admin Data:", data);
        setAdmins(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching admins:', error);
        alert('Failed to fetch data. Please log in.');
        navigate('/login');
      }
    };

//     const fetchAdmin = async () => {
//   try {
//     const response = await fetch('http://192.168.0.105:5000/api/adminRegister/alladmin'); // Replace with correct endpoint

//     if (!response.ok) {
//       throw new Error('Failed to fetch admin data');
//     }

//     const data = await response.json();
//     setAdmins(Array.isArray(data) ? data : []);
//   } catch (error) {
//     console.error('Error fetching admins:', error);
//     alert('Failed to fetch data. Please try again later.');
//   }
// };


    

    const handleAddAdmin = () => {
        navigate('/adminRegister');
    };

    return (
        <div style={styles.container}>
      <div style={styles.tableContainer}>
        <div style={{ ...styles.tableRow, ...styles.tableHeader }}>
          <div style={styles.tableCellWrapper}><span style={styles.headerText}>ID</span></div>
          <div style={styles.tableCellWrapper}><span style={styles.headerText}>Username</span></div>
          <div style={styles.lastTableCellWrapper}><span style={styles.headerText}>Email</span></div>
        </div>

        {admins.length === 0 ? (
          <div style={styles.noDataText}>No Admins found.</div>
        ) : (
          admins.map((admin, index) => (
            <div key={index} style={styles.tableRow}>
              <div style={styles.tableCellWrapper}>{admin.AdminID}</div>
              <div style={styles.tableCellWrapper}>{admin.Username}</div>
              <div style={styles.lastTableCellWrapper}>{admin.Email}</div>
            </div>
          ))
        )}
      </div>

      <button style={styles.addButton} onClick={handleAddAdmin}>
        + Add Admin
      </button>
    </div>
    );
};

const styles = {
    container: {
      padding: '20px',
      position: 'relative',
      marginTop: '50px'

    },

    tableContainer: {
      borderCollapse: 'collapse',
      width: '100%',
    },

    tableRow: {
      display: 'flex',
      borderBottom: '1px solid #cccccc',
      alignItems: 'center',
    },

    tableHeader: {
      backgroundColor: '#007BFF',
      fontWeight: 'bold',
    },

    tableCellWrapper: {
      flex: 1,
      textAlign: 'center',
      padding: '10px',
      borderRight: '1px solid #cccccc',
    },

    lastTableCellWrapper: {
      flex: 1,
      textAlign: 'center',
      padding: '10px',
    },
    
    headerText: {
      color: 'white',
    },
    
    addButton: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#007BFF',
      padding: '15px 20px',
      borderRadius: '50px',
      color: '#fff',
      fontSize: '16px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    
    noDataText: {
      textAlign: 'center',
      fontSize: '18px',
      marginTop: '20px',
    },
};

export default AddAdmin;
