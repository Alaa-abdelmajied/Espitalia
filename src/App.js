import React, { useLayoutEffect } from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';

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
import EditProfile from './patientPages/EditProfile';
import DoctorDetails from './patientPages/DoctorDetails';
import BloodDonation from './patientPages/BloodDonation';
import AcceptedBloodRequests from './patientPages/AcceptedRequests';
import PatientNotification from './patientPages/Notifications';
import Search from './patientPages/HomeSearch';
import Report from './patientPages/Report';

//Doctor pages
import DoctorHome from './doctorPages/DoctorHome';
import PatientHistory from './doctorPages/PatientHistory';
import DoctorProfile from './doctorPages/Profile';
import UpcomingReservations from './doctorPages/UpcomingReservations';

//Receptionist pages
import ReceptHome from './receptionistPages/ReceptHome';
import DoctorsListPage from './receptionistPages/DoctorsListPage';
import DoctorPage from './receptionistPages/DoctorPage';
import AppointmentsList from './receptionistPages/AppointmentsList';
import ReceptProfile from './receptionistPages/ReceptProfile';
// import ReceptNotification from './receptionistPages/Notifications';
import ReceptBloodReq from './receptionistPages/BloodReq';
import ReceptDoctorDetails from './receptionistPages/ReceptDoctorDetails';

//Hosptial admin pages
import AddDoctorPage from './hospitalAdminPages/AddDoctorPage';
import AddReceptionistPage from './hospitalAdminPages/AddReceptionist';
import HospitalAdminDoctorsPage from './hospitalAdminPages/Doctorspage';
import HospitalAdminReceptionistPage from './hospitalAdminPages/ReceptionistPage';
import HospitalAdminProfilepage from './hospitalAdminPages/Profilepage';
import HospitalAdminHomePage from './hospitalAdminPages/Homepage';
import HospitalDoctorProfile from './hospitalAdminPages/DoctorProfile';
import HospitalReceptionistProfile from './hospitalAdminPages/ReceptionistProfile';
import MyProfileHospitalPage from './hospitalAdminPages/MyProfileHospitalPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function PatientStackNav({ navigation, route }) {
  const tabHiddenRoutes = [
    'SpecializationScreen',
    'DoctorsScreen',
    'DoctorDetails',
    'HospitalList',
  ];
  useLayoutEffect(() => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator
      initialRouteName="PatientHomePage"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PatientHomePage" component={PatientHome} />
      <Stack.Screen name="SpecializationScreen" component={Specializaion} />
      <Stack.Screen name="DoctorsScreen" component={DoctorList} />
      <Stack.Screen name="DoctorDetails" component={DoctorDetails} />
      {/* <Stack.Screen name="DoctorList" component={DoctorList} /> */}
      <Stack.Screen name="HospitalList" component={HospitalList} />
      {/* <Stack.Screen name="GeneralSearch" component={Search} /> */}
    </Stack.Navigator>
  );
}
function PatientSearchStackNav({ navigation, route }) {
  const tabHiddenRoutes = [
    'SpecializationScreen',
    'DoctorsScreen',
    'DoctorDetails',
    'HospitalList',
  ];
  useLayoutEffect(() => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator
      initialRouteName="GeneralSearch"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="GeneralSearch" component={Search} />
      <Stack.Screen name="SpecializationScreen" component={Specializaion} />
      <Stack.Screen name="DoctorsScreen" component={DoctorList} />
      <Stack.Screen name="DoctorDetails" component={DoctorDetails} />
      <Stack.Screen name="HospitalList" component={HospitalList} />
    </Stack.Navigator>
  );
}

function PatientProfileStackNav({ navigation, route }) {
  const tabHiddenRoutes = ['EditProfile', 'Report'];
  useLayoutEffect(() => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator
      initialRouteName="PatientProfile"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PatientProfile" component={PatientProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Report" component={Report} />
    </Stack.Navigator>
  );
}

function PatientBloodReqs({ navigation, route }) {
  const tabHiddenRoutes = ['AcceptedBloodReq'];
  useLayoutEffect(() => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator
      initialRouteName="Blood Donation"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Blood Donation" component={BloodDonation} />
      <Stack.Screen name="AcceptedBloodReq" component={AcceptedBloodRequests} />
    </Stack.Navigator>
  );
}

function PatientNavBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
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
          } else if (route.name == 'Donations') {
            iconName = focused ? 'water' : 'water-outline';
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
        tabBarActiveTintColor: '#1c1bad',
        tabBarInactiveTintColor: '#000',
      })}
      activeColor="#1c1bad"
      inactiveColor="#000"
      barStyle={{ backgroundColor: '#fff' }}>
      <Tab.Screen name="Home" component={PatientStackNav} />
      <Tab.Screen name="Profile" component={PatientProfileStackNav} />
      <Tab.Screen name="Reservations" component={PatientReservations} />
      <Tab.Screen name="Donations" component={PatientBloodReqs} />
      <Tab.Screen
        name="Search"
        options={{ unmountOnBlur: true }}
        component={PatientSearchStackNav}
      />
      <Tab.Screen name="Notifications" component={PatientNotification} />
    </Tab.Navigator>
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
      <Stack.Screen name="DoctorsListPage" component={DoctorsListPage} />
      <Stack.Screen name="DoctorPage" component={DoctorPage} />
      <Stack.Screen name="AppointmentsList" component={AppointmentsList} />
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
      <Stack.Screen name="DoctorProfile" component={HospitalDoctorProfile} />
      <Stack.Screen
        name="ReceptionistProfile"
        component={HospitalReceptionistProfile}
      />
      <Stack.Screen
        name="Reciptionist"
        component={HospitalAdminReceptionistPage}
        options={{ title: 'Receptionists' }}
      />
      <Stack.Screen
        name="AddnewDoctor"
        component={AddDoctorPage}
        options={{ title: 'Add Doctor' }}
      />
      <Stack.Screen
        name="AddnewReceptionist"
        component={AddReceptionistPage}
        options={{ title: 'Add Receptionist' }}
      />
      <Stack.Screen
        name="MyProfileHospitalPage"
        component={MyProfileHospitalPage}
        options={{ title: 'Edit Data' }}
      />
    </Stack.Navigator>
  );
}

function DoctorNavBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'hospital';
            size = focused ? 25 : 23;
            // color = focused ? '#1c1bad' : '#555';
          } else if (route.name === 'Profile') {
            iconName = 'user-circle';
            size = focused ? 25 : 23;
            // color = focused ? 'green' : '#555';
          }
          // else if(route.name=='Blood Requests'){
          //   <Icon.Button
          //        name="pensil"></Icon.Button>
          // }
          else if (route.name === 'Blood Requests') {
            iconName = 'blood-drop';
            size = focused ? 25 : 23;
            // color = focused ? 'red' : '#555';
          }
          return iconName === 'blood-drop' ? (
            <Fontisto name={iconName} size={size} color={color} />
          ) : (
            <FontAwesome5 name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: '#1c1bad',
        tabBarInactiveTintColor: '#000',
        // activeTintColor: '#1c1bad',
        // // inactiveTintColor: '#555',
        // inactiveColor: '#000',
        // activeBackgroundColor: '#fff',
        // inactiveBackgroundColor: '#fff',
        // showLabel: false,
        // labelStyle: {fontSize: 14},
        // showIcon: true,
      })}
      activeColor="#1c1bad"
      inactiveColor="#000"
      barStyle={{ backgroundColor: '#fff' }}
    // activeColor="#f0edf6"
    // inactiveColor="#ffffff"
    // barStyle={{backgroundColor: '#1c1bad'}}
    >
      <Tab.Screen
        name="Home"
        component={ReceptStackView}
      //options={{ tabBarBadge: 3 }}
      />
      <Tab.Screen name="Profile" component={ReceptProfile} />
      <Tab.Screen name="Blood Requests" component={ReceptBloodReq} />
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
