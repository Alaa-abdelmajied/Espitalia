import React, {useState} from 'react';
import Svg, {Path} from 'react-native-svg';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  BackHandler,
  Image,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';

import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret} from '@env';

export default function ChangePassword({navigation, route}) {
  const {changePassword, profileChangePassword} = route.params;
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const verifyEmail = () => {
    axios
      .post(`${Server_URL}:3000/patient/forgotPassword`, {
        email: email,
      })
      .then(async function (response) {
        const {token} = response.data;
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
        navigation.navigate('OTP', {isForgotten: true});
      })
      .catch(function (error) {
        const err = error.response.data;
        if (err == 'This email does not exist') {
          showMessage({
            message: err,
            type: 'warning',
          });
        }
      });
  };

  const forgottenPasswordChange = async () => {
    if (newPassword == confirmNewPassword) {
      try {
        const token = JSON.parse(
          await EncryptedStorage.getItem(Token_Secret),
        ).token;
        console.log('I am here');
        console.log('token', token);
        axios
          .post(`${Server_URL}:3000/patient/forgotPasswordChange`, {
            newPassword: newPassword,
            token: token,
          })
          .then(async function (response) {
            navigation.navigate('Login', {staff: false});
          })
          .catch(function (error) {
            const err = error.response.data;
            console.log(err);
          });
      } catch (err) {
        Alert.alert('Error', err.code, [
          {text: 'Exit', onPress: () => BackHandler.exitApp()},
        ]);
      }
    } else {
      Alert.alert("Passwords don't match");
    }
  };

  const profilePasswordChange = async () => {
    if (newPassword == confirmNewPassword) {
      try {
        const token = JSON.parse(
          await EncryptedStorage.getItem(Token_Secret),
        ).token;
        console.log('I am here');
        console.log('token', token);
        axios
          .post(`${Server_URL}:3000/patient/changePassword`, {
            oldPassword: currentPassword,
            newPassword: newPassword,
            token: token,
          })
          .then(async function (response) {
            navigation.navigate('Profile');
          })
          .catch(function (error) {
            const err = error.response.data;
            console.log(err);
          });
      } catch (err) {
        Alert.alert('Error', err.code, [
          {text: 'Exit', onPress: () => BackHandler.exitApp()},
        ]);
      }
    } else {
      Alert.alert("Passwords don't match");
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
        <FontAwesome5 name={'lock'} size={25} color="#000"></FontAwesome5>
        {!profileChangePassword ? (
          <View>
            {!changePassword ? (
              <View>
                <Text style={styles.TitleText}>Forgot password?</Text>
                <View style={styles.InputsRegion}>
                  <TextInput
                    style={styles.Input}
                    placeholder="Enter your email"
                    onChangeText={text => setEmail(text)}></TextInput>
                  <Pressable
                    style={styles.RegisterButton}
                    onPress={verifyEmail}>
                    <Text style={[styles.buttonText, {color: '#fff'}]}>
                      Verify
                    </Text>
                  </Pressable>
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.TitleText}>Change Password</Text>
                <View style={styles.InputsRegion}>
                  <TextInput
                    secureTextEntry={true}
                    style={styles.Input}
                    placeholder="Enter your new password"
                    onChangeText={text => setNewPassword(text)}></TextInput>
                  <TextInput
                    secureTextEntry={true}
                    style={styles.Input}
                    placeholder="Confirm your new password"
                    onChangeText={text =>
                      setConfirmNewPassword(text)
                    }></TextInput>
                  <Pressable
                    style={styles.RegisterButton}
                    onPress={forgottenPasswordChange}>
                    <Text style={[styles.buttonText, {color: '#fff'}]}>
                      Done
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        ) : (
          <View>
            <Text style={styles.TitleText}>Change Password</Text>
            <View style={styles.InputsRegion}>
              <TextInput
                secureTextEntry={true}
                style={styles.Input}
                placeholder="Enter your current password"
                onChangeText={text => setCurrentPassword(text)}></TextInput>
              <TextInput
                secureTextEntry={true}
                style={styles.Input}
                placeholder="Enter your new password"
                onChangeText={text => setNewPassword(text)}></TextInput>
              <TextInput
                secureTextEntry={true}
                style={styles.Input}
                placeholder="Confirm your new password"
                onChangeText={text => setConfirmNewPassword(text)}></TextInput>
              <Pressable
                style={styles.RegisterButton}
                onPress={profilePasswordChange}>
                <Text style={[styles.buttonText, {color: '#fff'}]}>Done</Text>
              </Pressable>
            </View>
          </View>
        )}
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
    //   justifyContent: 'center',
  },

  WaveHeader: {
    //   flex: 1,
    height: 200,
    width: '100%',
  },

  RegisterRegion: {
    width: '100%',
    alignItems: 'center',
    marginTop: 120,
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
    textAlign: 'center',
    margin: '3%',
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {width: -1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },

  QuestionText: {
    color: '#000',
  },

  RegisterButton: {
    width: 130,
    margin: '5%',
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    backgroundColor: '#1c1bad',
    alignItems: 'center',
    textAlign: 'center',
  },
});
