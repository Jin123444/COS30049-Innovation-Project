// import React, { useState, useEffect, useContext } from 'react';
// import {View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// //import { AuthContext } from '../src/authContext';
// import { useNavigation } from '@react-navigation/native';

// const MyBooking = ({ userId }) => {
//   const [allBookings, setAllBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [filterType, setFilterType] = useState('upcoming');
//   //const {isLoggedIn} = useContext(AuthContext);
//   const navigation = useNavigation();

//   useEffect(() => {
//     if (!isLoggedIn) {
//       Alert.alert(
//         'Login Required',
//         'Please log in to view your bookings.',
//         [
//           { text: 'Login', onPress: () => navigation.navigate('Login') },
//         ]
//       );
//       return;
//     }

//     fetchUserBookings();
//   }, []);

//   const fetchUserBookings = async () => {
//     try {
//       const response = await fetch(`http://192.168.0.105:5000/bookings?userId=${userId}`);
//       const data = await response.json();
//       setAllBookings(data);
//       applyFilter('upcoming', data);
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//     }
//   };

//   const applyFilter = (type, bookings = allBookings) => {
//     const now = new Date();
//     const filtered = bookings.filter(b => {
//       const bookingDate = new Date(b.date);
//       return type === 'upcoming'
//         ? bookingDate >= now
//         : bookingDate < now;
//     });
//     setFilteredBookings(filtered);
//     setFilterType(type);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Your Bookings</Text>

//       <View style={styles.filterButtons}>
//         <TouchableOpacity
//           onPress={() => applyFilter('upcoming')}
//           style={[styles.filterButton, filterType === 'upcoming' && styles.activeFilter]}
//         >
//           <Text style={styles.filterText}>Upcoming</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => applyFilter('past')}
//           style={[styles.filterButton, filterType === 'past' && styles.activeFilter]}
//         >
//           <Text style={styles.filterText}>Past</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.scroll}>
//         {filteredBookings.length === 0 ? (
//           <Text style={styles.noData}>No {filterType} bookings</Text>
//         ) : (
//           filteredBookings.map((booking, index) => (
//             <View key={index} style={styles.bookingCard}>
//               <Text style={styles.cardText}>Date: {new Date(booking.date).toDateString()}</Text>
//               <Text style={styles.cardText}>Time Slot: {booking.timeSlot}</Text>
//               <Text style={styles.cardText}>Guide: {booking.guide}</Text>
//             </View>
//           ))
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#f0f4f8',
//     flex: 1,
//   },

//   heading: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#111827',
//     textAlign: 'center',
//     marginBottom: 20,
//   },

//   filterButtons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 15,
//   },

//   filterButton: {
//     padding: 10,
//     marginHorizontal: 5,
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//     borderRadius: 6,
//     backgroundColor: '#ffffff',
//   },

//   activeFilter: {
//     backgroundColor: '#d1d5db',
//   },

//   filterText: {
//     fontSize: 14,
//     color: '#111827',
//   },

//   scroll: {
//     flex: 1,
//   },

//   bookingCard: {
//     backgroundColor: '#ffffff',
//     padding: 16,
//     marginBottom: 12,
//     borderRadius: 6,
//     borderColor: '#e5e7eb',
//     borderWidth: 1,
//   },

//   cardText: {
//     fontSize: 16,
//     color: '#111827',
//     marginBottom: 4,
//   },

//   noData: {
//     fontSize: 16,
//     color: '#6b7280',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default MyBooking;
