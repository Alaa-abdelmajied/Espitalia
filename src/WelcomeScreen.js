import React, { useState, useEffect } from 'react';

import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  SectionList,
  FlatList,
  RefreshControl,
  TextInput,
  Alert,
  ImageBackground,
  Pressable,
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {StackActions} from '@react-navigation/native';


import {Server_URL, Token_Secret, Credintials_Secret} from '@env';

export default function HomeScreen({navigation}) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const {email, password, type} = JSON.parse(
          await EncryptedStorage.getItem(Credintials_Secret),
        );
        console.log(email, password, type);
        switch (type) {
          case 'patient':
            patientLogin(email, password);
            break;
          case 'doctor':
            login(email, password, type);
            console.log("It's a doctor");
            break;
          case 'receptionist':
            console.log("It's a receptionist");
            break;
          case 'hospital':
            console.log("It's a hosptial");
            break;
          default:
            patientLogin(email, password);
            break;
          // console.log('Undefined');
        }
      } catch (err) {
        setShowButton(true);
      }
    };
    autoLogin();
  }, []);
  
  const login = async (email, password, type) => {
    const url = `${Server_URL}:3000/${type}/login`;
    axios
      .post(url, {
        email: email,
        password: password,
      })
      .then(async function (response) {
        console.log(email, password, url);
        const token = response.headers['x-auth-token'];
        try {
          await EncryptedStorage.setItem(
            Token_Secret,
            JSON.stringify({token: token}),
          );
        } catch (err) {
          Alert.alert('Error', err.code, [
            {text: 'Exit', onPress: () => BackHandler.exitApp()},
          ]);
        }
        if (type == 'hospital') {
          navigation.dispatch(StackActions.popToTop());
          navigation.dispatch(
            StackActions.replace('HosptialAdminHomePage', {
              screen: 'Home',
              params: response.data,
            }),
          );
        } else if (type == 'receptionist') {
          navigation.dispatch(StackActions.popToTop());
          navigation.dispatch(
            StackActions.replace('ReceptHomePage', {
              screen: 'Home',
              params: response.data,
            }),
          );
        } else if (type == 'doctor') {
          navigation.reset({
            index: 0,
            routes: [{name: 'DoctorHomePage'}],
          });
        }
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  };

  const patientLogin = async (email, password) => {
    axios
      .post(`${Server_URL}:3000/patient/login`, {
        email: email,
        password: password,
      })
      .then(async function (response) {
        const {verified, token} = response.data;
        try {
          await EncryptedStorage.setItem(
            Token_Secret,
            JSON.stringify({token: token}),
          );
        } catch (err) {
          Alert.alert('Error', err.code, [
            {text: 'Exit', onPress: () => BackHandler.exitApp()},
          ]);
        }
        if (verified) {
          navigation.reset({
            index: 0,
            routes: [{name: 'Patient'}],
          });
        } else {
          navigation.navigate('OTP', {isForgotten: false});
        }
      })
      .catch(function (error) {
        const err = error.response.data;
        if (err == 'Incorrect email or password') {
          setShowButton(true);
        }
      });
  };

  return (
    <View style={styles.body}>
      <Image
        style={styles.logo}
        source={require('../images/logo_withoutBG.png')}></Image>
      <Text style={{fontSize: 40, fontWeight: 'bold', color: '#1c1bad'}}>
        eSpitalia
      </Text>
      {showButton ? (
        <View style={styles.main}>
          <TouchableOpacity
            style={styles.userButton}
            onPress={() =>
              navigation.navigate({
                name: 'Login',
                params: {
                  staff: false,
                },
              })
            }>
            <Text style={[styles.buttonText, {color: '#000'}]}> USER </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.staffButton}
            onPress={() =>
              navigation.navigate({
                name: 'Login',
                params: {
                  staff: true,
                },
              })
            }>
            <Text style={[styles.buttonText, {color: '#fff'}]}> STAFF </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    //  marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'#f0f0f0',
  },

  SignUpButton: {
    width: 100,
    // marginTop:-30,
    // margin:40,
    paddingTop: 15,
    paddingBottom: 15,
    // marginLeft: 30,
    // marginRight: 30,
    borderRadius: 30,
    backgroundColor: '#1c1bad',
    borderWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
    borderColor: '#fff',
    color: '#fff',
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },

  logo: {
    width: 200,
    height: 220,
    // resizeMode: 'cover'
    //  marginTop: -180,
  },

  Image2: {
    width: '100%',
    height: '100%',
  },

  // main: {
  //   flexDirection: 'row',
  // },

  userButton: {
    width: 130,
    marginTop: 30,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
  },

  staffButton: {
    width: 130,
    marginTop: 30,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#1c1bad',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    borderColor: '#1c1bad',
  },
  customRatingBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  starImg: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
});
