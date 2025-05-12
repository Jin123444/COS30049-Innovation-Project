import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const BookingForm = () => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);  
    const [timeSlot, setTimeSlot] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [guideList, setGuideList] = useState([]);
    const [selectedGuide, setSelectedGuide] = useState('');
    const navigation = useNavigation();


    const onChange = (event, selectedDate) => {
        setShow(false); 
        if (selectedDate) {
            setDate(selectedDate);
        }
    };    
    

    const handleBooking = async () => {
      const bookingData = {
        date: date.toISOString().split('T')[0], // gives 'YYYY-MM-DD'
        timeSlot,
        email,
        name,
        contact,
        guide: selectedGuide 
      };
    
      try {
        const token = await AsyncStorage.getItem('token');
    
        if (!token) {
          alert('You are not logged in. Please log in first.');
          navigation.navigate('Login');
          return;
        }
    
        const response = await fetch('http://192.168.0.105:5000/api/booking_parkguide', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(bookingData),
        });
    
        // If token is invalid, response.ok will still be false
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            await AsyncStorage.removeItem('token');  // <--- important
            alert('Session expired. Please log in again.');
            navigation.navigate('Login');  
            return;
          }
        
          const result = await response.json();
          throw new Error(result.error || 'Booking failed.');
        }
        const result = await response.json();
        alert('Booking submitted successfully! ✅');
    
      } catch (error) {
        console.error('Booking error:', error);
        alert(error.message || 'An error occurred. Please check your connection.');
      }
    };

    //fetch park guide data
    useEffect(() => {
        fetchParkGuide();
    }, []);

    const fetchParkGuide = async () => {
        try {
            const response = await fetch('http://192.168.0.105:5000/api/parkGuideRegister/all');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched data:', data);  
    
            if (Array.isArray(data)) {
                setGuideList(data);
            } else {
                console.error('Data fetched is not an array:', data);
                setGuideList([]);  
            }
        } catch (error) {
            console.error('Error fetching park guide:', error);
            setGuideList([]); 
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Booking Form</Text>
    
            <Text style={styles.label}>Name:</Text>
            <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Full Name"
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="abc@gmail.com"
            keyboardType="email-address"
            />
    
            <Text style={styles.label}>Contact Number:</Text>
            <TextInput
            style={styles.input}
            value={contact}
            onChangeText={setContact}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            />

            <Text style={styles.label}>Date of Visit:</Text>

            <TouchableOpacity onPress={() => setShow(true)} style={styles.input}>
                <Text style={styles.dateButtonText}>
                    {date ? date.toDateString() : 'Choose Visit Date'}
                </Text>
            </TouchableOpacity>

            {show && (
                <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
                minimumDate={new Date()} 
                />
            )}


            <Text style={styles.label}>Time Slot:</Text>
            <View style={styles.pickerWrapper}>
            <Picker selectedValue={timeSlot} onValueChange={setTimeSlot} style={styles.picker}>
                <Picker.Item label="Select timeslot" value="" />
                <Picker.Item label="Morning (8AM - 10AM)" value="morning" />
                <Picker.Item label="Afternoon (2PM - 4PM)" value="afternoon" />
            </Picker>
            </View>
    
            <Text style={styles.label}>Select Park Guide:</Text>
            <View style={styles.pickerWrapper}>
            <Picker selectedValue={selectedGuide} onValueChange={setSelectedGuide} style={styles.picker}>
                <Picker.Item label="Select Guide" value="" />
                {guideList.map((guide) => (
                <Picker.Item key={guide.ParkGuideID} label={guide.Fullname} value={guide.Fullname} />
                ))}
            </Picker>
            </View>
    
            <View style = {styles.bookingButton}>
                <Button
                title="Submit Booking"
                color="#2C2C2C"
                onPress={handleBooking}
                disabled={!timeSlot || !selectedGuide}
                />
            </View>

      </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
        padding: 24,
        paddingBottom: 60,
        backgroundColor: '#f0f4f8',
        flexGrow: 1,
    },
    heading: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#111827',
      textAlign: 'center',
      marginTop: 40,     
    },
    label: {
      marginTop: 15,
      marginBottom: 5,
      fontSize: 16,
      color: '#374151',
    },
    input: {
      borderWidth: 1,
      borderColor: '#d1d5db',
      borderRadius: 6,
      padding: 10,
      fontSize: 16,
      backgroundColor: '#ffffff',
    },

    pickerWrapper: {
      borderWidth: 1,
      borderColor: '#d1d5db',
      borderRadius: 6,
      overflow: 'hidden',
      backgroundColor: '#ffffff',
    },

    bookingButton: {
        marginTop: 20,
        width: '100%', 
        borderRadius: 8,
        overflow: 'hidden',
      },
  });

export default BookingForm;