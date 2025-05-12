import React, { useContext } from 'react';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import all your screens
import Homepage from '../src/homepage';
import MapScreen from '../src/mapscreen';
import PlantIdentification from '../src/plant';
import BookingForm from './booking';
import LoginPage from '../src/login';
import Profile from '../src/profile';
import VisitorRegister from '../src/visitorRegister';
import ForgotPassword from '../src/forgotPassword';
import AdminRegister from '../src/adminRegister';
import ParkGuideRegister from '../src/parkGuideRegister';
import FeedbackForm from '../src/feedback';
import OtpVerification from '../src/OtpVerification';
import PlantPredictionResult from '../src/predictionResult';
import RecruitParkGuide from '../src/recruitParkGuide';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Screen Wrapper with Header and Tabs
const ScreenWrapper = ({ children, title }) => {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.contentContainer}>
        {children}
      </View>
      <CustomTabBar />
    </View>
  );
};

// Custom Tab Bar Component
const CustomTabBar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const tabs = [
    { icon: 'home', label: 'Home', screen: 'Home' },
    { icon: 'map', label: 'Map', screen: 'Map' },
    { icon: 'leaf', label: 'Plant', screen: 'Plant' },
    { icon: 'calendar', label: 'Booking', screen: 'Booking' },
    { icon: 'person', label: 'Profile', screen: 'Profile' },
  ];

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => {
        const isActive = route.name === tab.screen;
        return (
          <TouchableOpacity
            key={tab.screen}
            style={styles.tabButton}
            onPress={() => navigation.navigate(tab.screen)}
          >
            <Ionicons
              name={tab.icon}
              size={20}
              color={isActive ? 'tomato' : 'gray'}
            />
            <Text style={{ color: isActive ? 'tomato' : 'gray' }}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Main Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' } 
      }}
    >
      <Tab.Screen name="Home">
        {() => (
          <ScreenWrapper title="Homepage">
            <Homepage />
          </ScreenWrapper>
        )}
      </Tab.Screen>
      <Tab.Screen name="MapScreen">
        {() => (
          <ScreenWrapper title="Map">
            <MapScreen />
          </ScreenWrapper>
        )}
      </Tab.Screen>
      <Tab.Screen name="Plant">
        {() => (
          <ScreenWrapper title="Plant Identification">
            <PlantIdentification />
          </ScreenWrapper>
        )}
      </Tab.Screen>
      <Tab.Screen name="Booking">
        {() => (
          <ScreenWrapper title="Booking">
            <BookingForm />
          </ScreenWrapper>
        )}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {() => (
          <ScreenWrapper title="Profile">
            <Profile />
          </ScreenWrapper>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

// Stack Navigator for all screens
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              marginRight: 15,
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 6,
              paddingVertical: 3,
              paddingHorizontal: 12,
              backgroundColor: '#f2f2f2',
            }}
          >
            <Text>Login</Text>
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Login">
        {() => (
          <ScreenWrapper title="Login">
            <LoginPage />
          </ScreenWrapper>
        )}
      </Stack.Screen>

      <Stack.Screen name="VisitorRegister">
        {() => (
          <ScreenWrapper title="Register">
            <VisitorRegister />
          </ScreenWrapper>
        )}
      </Stack.Screen>

      <Stack.Screen name="ForgotPassword">
        {() => (
          <ScreenWrapper title="Forgot Password">
            <ForgotPassword />
          </ScreenWrapper>
        )}
      </Stack.Screen>

      <Stack.Screen name="PlantDetails">
        {() => (
          <ScreenWrapper title="Plant Prediction Result">
            <PlantPredictionResult />
          </ScreenWrapper>
        )}
      </Stack.Screen>

      <Stack.Screen name="Home">
        {() => (
          <ScreenWrapper title="Homepage">
            <Homepage />
          </ScreenWrapper>
        )}
      </Stack.Screen>

      <Stack.Screen name="Plant">
        {() => (
          <ScreenWrapper title="Plant Identification">
            <PlantIdentification />
          </ScreenWrapper>
        )}
      </Stack.Screen>

      <Stack.Screen name="Map">
        {() => (
          <ScreenWrapper title="Map">
            <MapScreen/>
          </ScreenWrapper>
        )}
      </Stack.Screen>

      <Stack.Screen name="Booking">
        {() => (
          <ScreenWrapper title="Booking">
            <BookingForm />
          </ScreenWrapper>
        )}
      </Stack.Screen>

      <Stack.Screen name="Profile">
        {() => (
          <ScreenWrapper title="Profile">
            <Profile />
          </ScreenWrapper>
        )}
      </Stack.Screen>

      <Stack.Screen name="ParkGuideRegistration">
        {() => (
          <ScreenWrapper title="Park Guide Registration">
            <ParkGuideRegister />
          </ScreenWrapper>
        )}
      </Stack.Screen>

      <Stack.Screen name="AdminRegister">
        {() => (
          <ScreenWrapper title="Admin Registration">
            <AdminRegister/>
          </ScreenWrapper>
        )}
      </Stack.Screen>

      <Stack.Screen name="Feedback">
        {() => (
          <ScreenWrapper title="Feedback">
            <FeedbackForm/>
          </ScreenWrapper>
        )}
      </Stack.Screen>

      <Stack.Screen name="OtpVerification">
        {() => (
          <ScreenWrapper title="OTP Verification">
            <OtpVerification/>
          </ScreenWrapper>
        )}
      </Stack.Screen>

      <Stack.Screen name="RecruitParkGuide">
        {() => (
          <ScreenWrapper title="Park Guide">
            <RecruitParkGuide/>
          </ScreenWrapper>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

// Main Navigation Component
const Navigation = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  contentContainer: {
    flex: 1,
  },

  tabContainer: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: 'white',
  },

  tabButton: {
    alignItems: 'center',
    padding: 5,
  },

  userIconButton: {
    marginLeft: 10,
  },

  loginButton: {
    marginLeft: 'auto',
    left: 10,
    bottom: 60,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 12,
    backgroundColor: '#f2f2f2',
  },

});

export default Navigation;
