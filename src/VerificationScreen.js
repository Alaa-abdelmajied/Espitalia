import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import Svg, {Path, stop, defs, linearGradient} from 'react-native-svg';
import Ioinicons from 'react-native-vector-icons/Ionicons';
import FlashMessage from 'react-native-flash-message';
import {showMessage} from 'react-native-flash-message';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret} from '@env';

export default function OTP({navigation, route}) {
  const [OTP, setOTP] = useState('');
  const {isForgotten} = route.params;

  const verify = async () => {
    axios
      .post(
        `${Server_URL}:3000/patient/verify`,
        {
          otp: OTP,
          forgot: false,
        },
        {
          headers: {
            'x-auth-token': JSON.parse(
              await EncryptedStorage.getItem(Token_Secret),
            ).token,
          },
        },
      )
      .then(function (response) {
        if (!isForgotten) {
          navigation.reset({
            index: 0,
            routes: [{name: 'Patient'}],
          });
        } else {
          navigation.navigate('ChangePassword', {changePassword: true});
        }
      })
      .catch(function (error) {
        const err = error.response.data;
        if (err == 'Wrong Otp') {
          //alert otp
          console.log('alert');
        }
      });
  };

  const resendOTP = async () => {
    axios
      .post(`${Server_URL}:3000/patient/resendOTP`, null, {
        headers: {
          'x-auth-token': JSON.parse(
            await EncryptedStorage.getItem(Token_Secret),
          ).token,
        },
      })
      .then(function (response) {
        console.log('resent');
        showMessage({
          message: 'OTP resent to your email',
          type: 'success',
        });
      })
      .catch(function (error) {
        const err = error.response.data;
        console.log(err);
      });
  };

  return (
    <View style={styles.body}>
      <View style={styles.WaveHeader}>
        <Svg
        // height={200}
        // width={Dimensions.get('screen').width}
        >
          <Path
            fill="#1c1bad"
            d="M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,197.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </Svg>
      </View>
      <View style={{marginTop: '30%'}}>
        <Text style={styles.text}> Enter the code sent to your email</Text>
        <OTPTextInput
          textInputStyle={{borderWidth: 2, borderRadius: 251}}
          inputCount={5}
          tintColor="#1c1bad"
          handleTextChange={text => setOTP(text)}></OTPTextInput>
        <Ioinicons
          name="checkmark-circle"
          size={55}
          color={'#1c1bad'}
          style={{alignSelf: 'center', margin: 10}}
          onPress={verify}></Ioinicons>
        {/* TODO: connect with backend */}
        <TouchableOpacity onPress={resendOTP}>
          <Text
            style={{
              color: '#000',
              alignSelf: 'center',
              textDecorationLine: 'underline',
            }}>
            Resend OTP
          </Text>
        </TouchableOpacity>
      </View>
      <FlashMessage position="top" icon="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    flexDirection: 'column',
  },

  WaveHeader: {
    // flex: 1,
    height: 200,
    width: '100%',
  },

  text: {
    fontSize: 20,
    color: '#000',
    margin: 10,
  },
});
