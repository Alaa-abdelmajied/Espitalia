import React, { useState } from 'react';
import Svg, { Path } from 'react-native-svg';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
//import RadioButtonRN from 'radio-buttons-react-native';
//import RadioGroup from 'react-native-radio-buttons-group';
import { CommonActions, StackActions } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';
// require("dotenv").config();

import RadioGroup from 'react-native-radio-button-group';
/*
TODO: 
add this line in react-native-radio-button-group/RadioGroup.js in line 15
  options: PropTypes.arrayOf(PropTypes.shape({
and in circle.js replace by:
  <Animated.View
    style={[
      styles.fill,
      {
        backgroundColor: circleStyle.fillColor,
        height: this.props.active ? 20 : 0,
        width: this.props.active ? 20 : 0,
      },
    ]}
  />
*/

import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from 'react-native-flash-message';

import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Server_URL, Token_Secret, Credintials_Secret } from '@env';

export default function Login({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMeesage, setIsVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState({});
  var whoIsLogingIn = [
    {
      id: 'hospital',
      label: 'Hospital',
      // labelView: 'hospital'
    },
    {
      id: 'doctor',
      label: 'Doctor',
      // labelView: 'doctor'
    },
    {
      id: 'receptionist',
      label: 'Receptionist',
      //labelView: 'receptionist'
    },
  ];

  const onPressHandler = () => {
    //staff -> username -> search for keyword dr or recep or admin
    var staff = route.params.staff;
    if (!staff) {
      axios
        .post(`${Server_URL}:3000/patient/login`, {
          email: email,
          password: password,
        })
        .then(async function (response) {
          const { verified, token } = response.data;
          try {
            await EncryptedStorage.setItem(
              Token_Secret,
              JSON.stringify({ token: token }),
            );
            await EncryptedStorage.setItem(
              Credintials_Secret,
              JSON.stringify({
                email: email,
                password: password,
                type: 'patient',
              }),
            );
          } catch (err) {
            Alert.alert('Error', err.code, [
              { text: 'Exit', onPress: () => BackHandler.exitApp() },
            ]);
          }
          if (verified) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Patient' }],
            });
          } else {
            navigation.navigate('OTP', { isForgotten: false });
          }
        })
        .catch(function (error) {
          const err = error.response.data;
          if (err == 'Incorrect email or password') {
            showMessage({
              message: err,
              type: 'warning',
            });
            //alert worng email or password
            console.log('alert');
          }
        });
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: route.params.staff ? 'HosptialAdminHomePage' : 'Patient' }],
      // })
    } else {
      //FIXME: I'm working don't delete me
      // navigation.dispatch(StackActions.popToTop());
      // navigation.dispatch(
      //   StackActions.replace('HosptialAdminHomePage', { screen: 'Home', params: response.data })
      // );
      // if (!selectedStaff.id){
      //   console.log('select hospital');
      //   setIsVisible(true);
      // }
      console.log('Login page', Server_URL);
      const url = `${Server_URL}:3000/${selectedStaff.id}/login`;
      console.log('Server URL:', Server_URL);
      console.log(email, password, url);
      axios
        .post(`${Server_URL}:3000/${selectedStaff.id}/login`, {
          email: email,
          password: password,
        })
        .then(async function (response) {
          console.log(email, password, url);
          setIsVisible(false);
          const token = response.headers['x-auth-token'];
          try {
            await EncryptedStorage.setItem(
              Token_Secret,
              JSON.stringify({ token: token }),
            );
            await EncryptedStorage.setItem(
              Credintials_Secret,
              JSON.stringify({
                email: email,
                password: password,
                type: selectedStaff.id,
              }),
            );
          } catch (err) {
            Alert.alert('Error', err.code, [
              { text: 'Exit', onPress: () => BackHandler.exitApp() },
            ]);
          }
          if (selectedStaff.id == 'hospital') {
            navigation.dispatch(StackActions.popToTop());
            navigation.dispatch(
              StackActions.replace('HosptialAdminHomePage', {
                screen: 'Home',
                params: response.data,
              }),
            );
          } else if (selectedStaff.id == 'receptionist') {
            if (navigation.canGoBack()) {
              navigation.dispatch(StackActions.popToTop());
            }
            navigation.dispatch(
              StackActions.replace('ReceptHomePage', {
                screen: 'Home',
                params: response.data,
              }),
            );
            // console.log(selectedStaff.id);

          } else if (selectedStaff.id == 'doctor') {
            if (navigation.canGoBack()) {
              navigation.dispatch(StackActions.popToTop());
            }
            navigation.dispatch(
              StackActions.replace('DoctorHomePage', {
                screen: 'Home',
                params: response.data,
              }),
            );
            console.log(selectedStaff.id);
          }
        })
        .catch(function (error) {
          setIsVisible(true);
          console.log('axios faild', errorMeesage, Server_URL);
          console.log('ERROR:', error);
        });
    }
  };
  return (
    <View style={styles.Body}>
      <View style={styles.WaveHeader}>
        <Svg>
          <Path
            fill="#1c1bad"
            d="M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,197.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </Svg>
      </View>

      <View style={styles.RegisterRegion}>
        <View style={styles.RegisterCard}>
          <Text style={styles.TitleText}>Sign In</Text>
          <View style={styles.InputsRegion}>
            <TextInput
              style={styles.Input}
              placeholder="Enter your username or email"
              onChangeText={text => setEmail(text.trim())}></TextInput>
            <TextInput
              secureTextEntry={true}
              style={styles.Input}
              placeholder="Enter your password"
              onChangeText={text => setPassword(text)}></TextInput>

            <Pressable
              onPress={() =>
                navigation.navigate('ChangePassword', { changePassword: false })
              }>
              <Text style={styles.QuestionText}>Forgot password?</Text>
            </Pressable>

            {errorMeesage && (
              <Text style={{ color: '#f00' }}>Something is Wrong</Text>
            )}

            <TouchableOpacity
              style={styles.RegisterButton}
              onPress={onPressHandler}>
              <Text style={[styles.buttonText, { color: '#fff' }]}>Sign In</Text>
            </TouchableOpacity>
            {!route.params.staff ? (
              <View style={{ flexDirection: 'row', margin: '5%' }}>
                <Text style={styles.QuestionText}>
                  Don't have an account yet?
                </Text>
                <Pressable onPress={() => navigation.navigate('SignUp')}>
                  <Text
                    style={{ color: '#1c1bad', textDecorationLine: 'underline' }}>
                    Sign Up
                  </Text>
                </Pressable>
              </View>
            ) : (
              <RadioGroup
                options={whoIsLogingIn}
                onChange={option => setSelectedStaff(option)}
              />
            )}
          </View>
        </View>
      </View>
      <FlashMessage position="bottom" icon="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  Body: {
    flex: 1,
    flexDirection: 'column',
    backgrundColor: '#ffffff',
    alignItems: 'center',
    // justifyContent: 'center',
  },

  WaveHeader: {
    // flex: 1,
    height: 200,
    width: '100%',
  },

  RegisterRegion: {
    // flex: 2,
    // marginTop: '10%',
    width: '100%',

    // justifyContent:'center',
    // alignSelf: 'center',
    // alignItems: 'center',
    // backgroundColor: '#0e3de8'
  },

  TitleText: {
    color: '#000',
    fontSize: 25,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },

  InputsRegion: {
    // backgroundColor: '#7a94f0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Input: {
    width: 330,
    borderRadius: 10,
    // borderWidth: 1,
    textAlign: 'center',
    // borderColor: '#fff',
    margin: '3%',
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },

  Image: {
    width: 80,
    height: 80,
  },

  QuestionText: {
    color: '#000',
    // fontSize: 15,
    // marginRight: '1%',
  },

  RegisterButton: {
    width: 130,
    margin: '5%',
    // marginTop: 30,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    backgroundColor: '#1c1bad',
    alignItems: 'center',
    textAlign: 'center',
    // color: '#fff'
  },
});
