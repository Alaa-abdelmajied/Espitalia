import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//Common pages
import WelcomePage from './WelcomeScreen';
import Login from './LoginScreen';
import SignUp from './RegisterScreen';
import Questions from './SignUpQuestions';
import OTP from './VerificationScreen';
import ChangePassword from './ChangePasswordScreen';

//Patient pages
import PatientHome from './patientPages/PatientHome';
import PatientProfile from './patientPages/PatientProfile';
import PatientReservations from './patientPages/PatientReservations';
import Specializaion from './patientPages/SpecializationScreen';
import DoctorList from './patientPages/DoctorList';
import HospitalList from './patientPages/HospitalList';

import DoctorDetails from './patientPages/DoctorDetails';
import BloodDonation from './patientPages/BloodDonation';
import PatientNotification from './patientPages/Notifications';
import Search from './patientPages/HomeSearch';
import Report from './patientPages/Report';

//Doctor pages
import DoctorHome from './doctorPages/DoctorHome';
import PatientHistory from './doctorPages/PatientHistory';
import DoctorProfile from './doctorPages/Profile';
import UpcomingReservations from './doctorPages/UpcomingReservations';

//Patient pages
import ReceptHome from './receptionistPages/ReceptHome';
import ReceptProfile from './receptionistPages/ReceptProfile';
import ReceptNotification from './receptionistPages/Notifications';
import ReceptBloodReq from './receptionistPages/BloodReq';
import ReceptDoctorDetails from './receptionistPages/ReceptDoctorDetails';

//Hosptial admin pages
import AddDoctorPage from './hospitalAdminPages/AddDoctorPage';
import AddReceptionistPage from './hospitalAdminPages/AddReceptionist';
import HospitalAdminDoctorsPage from './hospitalAdminPages/Doctorspage';
import HospitalAdminReceptionistPage from './hospitalAdminPages/ReceptionistPage';
import HospitalAdminProfilepage from './hospitalAdminPages/Profilepage';
import HospitalAdminHomePage from './hospitalAdminPages/Homepage';
import MyProfileHospitalPage from './hospitalAdminPages/MyProfileHospitalPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const bottomTab = createMaterialBottomTabNavigator();
const TopTabs = createMaterialTopTabNavigator();

function PatientStackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PatientHomePage" component={PatientHome} />
      <Stack.Screen name="SpecializationScreen" component={Specializaion} />
      <Stack.Screen name="DoctorsScreen" component={DoctorList} />
      <Stack.Screen name="DoctorDetails" component={DoctorDetails} />
      <Stack.Screen name="DoctorList" component={DoctorList} />
      <Stack.Screen name="HospitalList" component={HospitalList} />
    </Stack.Navigator>
  );
}

function PatientProfileStackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PatientProfile" component={PatientProfile} />
      <Stack.Screen name="Report" component={Report} />
    </Stack.Navigator>
  );
}

function ReceptStackView() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitle: false,
      }}>
      <Stack.Screen name="HomePage" component={ReceptHome} />
      <Stack.Screen name="doctorPage" component={ReceptDoctorDetails} />
    </Stack.Navigator>
  );
}

function DoctorStackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitle: false,
      }}>
      <Stack.Screen name="HomePage" component={DoctorNavBar} />
      <Stack.Screen name="History" component={PatientHistory} />
    </Stack.Navigator>
  );
}

function HosptialAdminStackView() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HospitalAdminHomePage} />
      <Stack.Screen name="Profile" component={HospitalAdminProfilepage} />
      <Stack.Screen name="Doctors" component={HospitalAdminDoctorsPage} />
      <Stack.Screen
        name="Reciptionist"
        component={HospitalAdminReceptionistPage}
        options={{title: 'Receptionists'}}
      />
      <Stack.Screen
        name="AddnewDoctor"
        component={AddDoctorPage}
        options={{title: 'Add Doctor'}}
      />
      <Stack.Screen
        name="AddnewReceptionist"
        component={AddReceptionistPage}
        options={{title: 'Add Receptionist'}}
      />
      <Stack.Screen
        name="MyProfileHospitalPage"
        component={MyProfileHospitalPage}
        options={{title: 'Edit Data'}}
      />
    </Stack.Navigator>
  );
}

function PatientNavBar() {
  return (
    <bottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            size = focused ? 25 : 23;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
            size = focused ? 25 : 23;
          } else if (route.name == 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
            size = focused ? 25 : 23;
          } else if (route.name == 'Reservations') {
            iconName = focused ? 'list' : 'list-outline';
            size = focused ? 25 : 23;
          } else if (route.name == 'Search') {
            iconName = focused ? 'search' : 'search-outline';
            size = focused ? 25 : 23;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        header: () => null,
        // tabBarActiveTintColor: '#0d259e',
        // tabBarInactiveTintColor: '#000',
      })}
      activeColor="#0d259e"
      inactiveColor="#000"
      barStyle={{backgroundColor: '#fff'}}>
      <bottomTab.Screen name="Home" component={PatientStackNav} />
      <bottomTab.Screen name="Profile" component={PatientProfileStackNav} />
      <bottomTab.Screen
        name="Notifications"
        component={PatientNotificationsTabNav}
        options={{tabBarBadge: 10}}
      />
      <bottomTab.Screen name="Reservations" component={PatientReservations} />
      <bottomTab.Screen name="Search" component={Search} />
      {/* <Tab.Screen
        name="BloodDonation"
        component={BloodDonation}
      /> */}
    </bottomTab.Navigator>
  );
}

function DoctorNavBar() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Upcoming') {
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

function ReceptNavBar() {
  return (
    <bottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
            size = focused ? 25 : 20;
            // color = focused ? '#f0f' : '#555';
          } else if (route.name === 'Profile') {
            iconName = 'user';
            size = focused ? 25 : 20;
            // color = focused ? '#f0f' : '#555';
          }
          // else if(route.name=='Blood Requests'){
          //   <Icon.Button
          //        name="pensil"></Icon.Button>
          // }
          else if (route.name === 'Blood Requests') {
            iconName = 'calendar';
            size = focused ? 25 : 20;
            // color = focused ? '#f0f' : '#555';
          } else if (route.name === 'Notifications') {
            iconName = 'bell';
            size = focused ? 25 : 20;
            // color = focused ? '#f0f' : '#555';
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#f0f',
        inactiveTintColor: '#555',
        activeBackgroundColor: '#fff',
        inactiveBackgroundColor: '#999',
        showLabel: true,
        labelStyle: {fontSize: 14},
        showIcon: true,
      }}
      activeColor="#f0edf6"
      inactiveColor="#ffffff"
      barStyle={{backgroundColor: '#003da5'}}>
      <bottomTab.Screen
        name="Home"
        component={ReceptStackView}
        //options={{ tabBarBadge: 3 }}
      />
      <bottomTab.Screen name="Profile" component={ReceptProfile} />
      <bottomTab.Screen name="Blood Requests" component={ReceptBloodReq} />
      <bottomTab.Screen
        name="Notifications"
        component={ReceptNotification}
        options={{tabBarBadge: 3}}
      />
    </bottomTab.Navigator>
  );
}

function PatientNotificationsTabNav() {
  return (
    <TopTabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Notification') {
            iconName = 'notifications';
            // size = 25;
            size = focused ? 25 : 20;
            color = focused ? '#0d259e' : '#000';
          } else if (route.name === 'Blood Donation') {
            iconName = 'water';
            size = focused ? 25 : 20;
            // size = 25;
            color = focused ? '#0d259e' : '#000';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        activeTintColor: '#0d259e',
        inactiveTintColor: '#000',
        activeBackgroundColor: '#fff',
        inactiveBackgroundColor: '#999',
        showLabel: true,
        labelStyle: {textTransform: 'none', fontSize: 15},
        showIcon: true,
      })}>
      <TopTabs.Screen name="Notification" component={PatientNotification} />
      <TopTabs.Screen name="Blood Donation" component={BloodDonation} />
    </TopTabs.Navigator>
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
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignUpQuestions" component={Questions} />
        <Stack.Screen name="Patient" component={PatientNavBar} />
        <Stack.Screen name="DoctorHomePage" component={DoctorStackNav} />
        <Stack.Screen name="ReceptHomePage" component={ReceptNavBar} />
        <Stack.Screen
          name="HosptialAdminHomePage"
          component={HosptialAdminStackView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
