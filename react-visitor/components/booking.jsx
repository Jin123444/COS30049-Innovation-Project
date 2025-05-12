import React, { useState, useEffect } from 'react';

const BookingForm = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [guideList, setGuideList] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState('');

  useEffect(() => {
    fetch('http://192.168.0.105:5000/api/parkGuideRegister/all')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setGuideList(data);
        else setGuideList([]);
      })
      .catch((err) => {
        console.error(err);
        setGuideList([]);
      });
  }, []);

  const handleBooking = async () => {
    const bookingData = {
      date,
      timeSlot,
      email,
      name,
      contact,
      guide: selectedGuide,
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not logged in. Please log in first.');
        return;
      }

      const response = await fetch('http://192.168.0.105:5000/api/booking_parkguide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('token');
          alert('Session expired. Please log in again.');
          return;
        }

        const result = await response.json();
        throw new Error(result.error || 'Booking failed.');
      }

      alert('Booking submitted successfully! ✅');
    } catch (err) {
      console.error('Booking error:', err);
      alert(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
        <h2 style={styles.title}>Booking Form</h2>
      <div style = {styles.formContainer}>

      <label style={styles.labelStyle}>Name:</label>
      <input style={styles.inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />

      <label style={styles.labelStyle}>Email:</label>
      <input
        style={styles.inputStyle}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="abc@gmail.com"
        type="email"
      />

      <label style={styles.labelStyle}>Contact Number:</label>
      <input
        style={styles.inputStyle}
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Phone Number"
        type="tel"
      />

      <label style={styles.labelStyle}>Date of Visit:</label>
      <input
        style={styles.inputStyle}
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
      />

      <label style={styles.labelStyle}>Time Slot:</label>
      <select style={styles.inputStyle} value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
        <option value="">Select timeslot</option>
        <option value="morning">Morning (8AM - 10AM)</option>
        <option value="afternoon">Afternoon (2PM - 4PM)</option>
      </select>

      <label style={styles.labelStyle}>Select Park Guide:</label>
      <select style={styles.inputStyle} value={selectedGuide} onChange={(e) => setSelectedGuide(e.target.value)}>
        <option value="">Select Guide</option>
        {guideList.map((guide) => (
          <option key={guide.ParkGuideID} value={guide.Fullname}>
            {guide.Fullname}
          </option>
        ))}
      </select>

      <button
        onClick={handleBooking}
        disabled={!timeSlot || !selectedGuide}
        style={styles.button}
      >
        Submit Booking
      </button>
      </div>
    </div>
  );
};

const styles = {
  container:{
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

  title:{ 
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  labelStyle: {
    display: 'block',
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
    color: '#374151',
    textAlign: 'left',
  },

  inputStyle: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #d1d5db',
    marginBottom: 10,
    backgroundColor: '#fff',
  },

  button: {
    marginTop: 20,
    width: '100%',
    padding: 12,
    backgroundColor: '#2C2C2C',
    color: '#fff',
    border: 'none',
    borderRadius: 30,
    fontSize: 16,
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '16px',
  }
}


export default BookingForm;
