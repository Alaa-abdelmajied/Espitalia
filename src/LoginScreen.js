import React, { useState } from 'react';
import Svg, { Path } from 'react-native-svg';
//import RadioButtonRN from 'radio-buttons-react-native';
//import RadioGroup from 'react-native-radio-buttons-group';
import { CommonActions, StackActions } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';


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




import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  BackHandler,
} from 'react-native';

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
    }, {
      id: 'doctor',
      label: 'Doctor',
      // labelView: 'doctor'
    }, {
      id: 'receptionist',
      label: 'Receptionist',
      //labelView: 'receptionist'
    }
  ];

  const onPressHandler = () => {
    //staff -> username -> search for keyword dr or recep or admin
    var staff = route.params.staff;
    if (!staff) {

      console.log('here');
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
            navigation.navigate('OTP');
          }
        })
        .catch(function (error) {
          const err = error.response.data;
          if (err == 'Incorrect email or password') {
            //alert worng email or password
            setIsVisible(true);
            console.log('alert');
          }
        });
    }
    else {
      //FIXME: I'm working don't delete me
      // navigation.dispatch(StackActions.popToTop());
      // navigation.dispatch(
      //   StackActions.replace('HosptialAdminHomePage', { screen: 'Home', params: response.data })
      // );
      // if (!selectedStaff.id){
      //   console.log('select hospital');
      //   setIsVisible(true);
      // }
      const url = `${Server_URL}:3000/${selectedStaff.id}/login`;
      console.log(email, password, selectedStaff.id, url);
      axios
        .post(url, {
          email: email,
          password: password
        })
        .then(async function (response) {
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
              }),
            );
          } catch (err) {
            Alert.alert('Error', err.code, [
              { text: 'Exit', onPress: () => BackHandler.exitApp() },
            ]);
          }
          navigation.dispatch(StackActions.popToTop());
          navigation.dispatch(
            StackActions.replace('HosptialAdminHomePage', { screen: 'Home', params: response.data })
          );
        })
        .catch(function (error) {
          setIsVisible(true);
          console.log(errorMeesage);
          console.log('ERROR:', error);
        });
    }
  };
  return (
    // <ScrollView>
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
              onChangeText={text => setEmail(text)}></TextInput>
            <TextInput
              secureTextEntry={true}
              style={styles.Input}
              placeholder="Enter your password"
              onChangeText={text => setPassword(text)}></TextInput>

            <Pressable>
              <Text style={styles.QuestionText}>Forgot password?</Text>
            </Pressable>

            {
              errorMeesage &&
              <Text style={{ color: 'red' }}>Something is Wrong</Text>
            }

            <Pressable style={styles.RegisterButton} onPress={onPressHandler}>
              <Text style={[styles.buttonText, { color: '#fff' }]}>Sign In</Text>
            </Pressable>
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
                onChange={(option) => setSelectedStaff(option)}
              />
            )}
          </View>
        </View>
      </View>
    </View>
    // </ScrollView>
    // </ImageBackground>
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

  // RegisterCard: {
  //   // flex: 1,
  //   width: '85%',
  //   alignSelf: 'center',
  //   borderRadius: 25,
  //   backgroundColor: '#f0f0f0',
  //   alignItems: 'center',
  //   shadowColor: '#000000',
  //   shadowOffset: { width: -2, height: 2 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  //   elevation: 3,
  //   justifyContent: 'center',
  //   overflow: 'hidden'
  // },

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

  // buttonText: {
  //   // color: '#000',
  //   textAlign: 'center',
  //   fontSize: 15,
  //   fontWeight: 'bold'
  // },
});
