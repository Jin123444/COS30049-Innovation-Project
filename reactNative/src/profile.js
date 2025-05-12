import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { AuthContext } from '../src/authContext';

const Profile = ({ navigation }) => {
  //const { setIsLoggedIn } = useContext(AuthContext);

  // const handleLogout = async () => {
  //   await AsyncStorage.removeItem("token");
  //   setIsLoggedIn(false);
  //   navigation.navigate('MainApp');
  // };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is your profile</Text>
      <Button title="Logout"  />
    </View>
  );
};

export default Profile;
