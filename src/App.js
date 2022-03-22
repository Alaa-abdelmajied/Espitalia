import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Common pages
import WelcomePage from './WelcomeScreen';
import Login from './LoginScreen';
import SignUp from './RegisterScreen';
import Questions from './SignUpQuestions';

//Patient pages
import PatientHome from './patientPages/PatientHome';
import PatientProfile from './patientPages/PatientProfile';
import PatientReservations from './patientPages/PatientReservations';
import Specializaion from './patientPages/SpecializationScreen';
import DoctorList from './patientPages/DoctorList';
import DoctorDetails from './patientPages/DoctorDetails';
import BloodDonation from './patientPages/BloodDonation';
import Notification from './patientPages/Notifications';

//Doctor pages
import DoctorHome from './doctorPages/DoctorHome';
import PatientHistory from './doctorPages/PatientHistory';
import DoctorProfile from './doctorPages/Profile';
import UpcomingReservations from './doctorPages/UpcomingReservations';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function PatientStackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name="PatientHomePage"
        component={PatientHome}
      />
      <Stack.Screen
        name="SpecializationScreen"
        component={Specializaion}
      />
      <Stack.Screen
        name="DoctorsScreen"
        component={DoctorList}
      />
      <Stack.Screen
        name="DoctorDetails"
        component={DoctorDetails}
      />
    </ Stack.Navigator>
  );
}

function DoctorStackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitle: false,
      }}>
      <Stack.Screen
        name="HomePage"
        component={DoctorNavBar}
      />
      <Stack.Screen
        name="History"
        component={PatientHistory}
      />
    </Stack.Navigator>
  )
}

function PatientNavBar() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'hand-left-outline';
        }
        else if (route.name === 'Profile') {
          iconName = focused ? 'enter' : 'enter-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      header: () => null,
      tabBarActiveTintColor: '#0d259e',
      tabBarInactiveTintColor: '#000',
    })}>
      <Tab.Screen
        name="Home"
        component={PatientStackNav}
      />
      <Tab.Screen
        name="Profile"
        component={PatientProfile}
      />
      <Tab.Screen
        name="Reservations"
        component={PatientReservations}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
      />
      <Tab.Screen
        name="BloodDonation"
        component={BloodDonation}
      />
    </Tab.Navigator>
  );
}

function DoctorNavBar() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home-sharp' : 'home-outline';
        }
        else if (route.name === 'Profile') {
          iconName = focused ? 'person-circle' : 'person-circle-outline';
        }
        else if (route.name === 'Upcoming') {
          iconName = focused ? 'list' : 'list-outline';
        }



        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      header: () => null,
      tabBarActiveTintColor: '#0d259e',
      tabBarInactiveTintColor: '#000',
    })}>
      <Tab.Screen name="Home" component={DoctorHome} />
      <Tab.Screen name="Profile" component={DoctorProfile} />
      <Tab.Screen name="Upcoming" component={UpcomingReservations} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerBackTitle: false,
        }}>
        <Stack.Screen
          name="WelcomePage"
          component={WelcomePage}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          name="SignUpQuestions"
          component={Questions}
        />
        <Stack.Screen
          name="Patient"
          component={PatientNavBar}
        />
        <Stack.Screen
          name="DoctorHomePage"
          component={DoctorStackNav}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}