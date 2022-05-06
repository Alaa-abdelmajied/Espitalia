import React, { useState } from 'react';
import { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import Svg, { Path, stop, defs, linearGradient } from 'react-native-svg';
import Ioinicons from 'react-native-vector-icons/Ionicons';
export default function OTP({ navigation }) {
  const [OTP, setOTP] = useState('');
  const onPressHandler = () => {
    console.log(OTP);
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
      <View style={{ marginTop: '30%' }}>
        <Text style={styles.text}> Enter the code sent to your email</Text>
        <OTPTextInput textInputStyle={{ borderWidth: 2, borderRadius: 251 }} inputCount={5}
          tintColor="#1c1bad" handleTextChange={text => setOTP(text)}
        ></OTPTextInput>
        <Ioinicons
          name="checkmark-circle"
          size={55}
          color={'#1c1bad'}
          style={{ alignSelf: 'center', margin: 10 }}
          onPress={onPressHandler}></Ioinicons>
      </View>
    </View>
  );

  console.log(num);
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
    margin: 5,
  },
});
