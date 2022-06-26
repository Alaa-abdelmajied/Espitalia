import React, {useState} from 'react';
import Svg, {Path} from 'react-native-svg';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import FlashMessage from 'react-native-flash-message';
import {showMessage} from 'react-native-flash-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LogBox } from 'react-native';
 
LogBox.ignoreLogs(['Warning: ...']); 
LogBox.ignoreAllLogs();

export default function SignUp({navigation}) {
  const today = new Date();
  const [text, setText] = useState('📅 Date of Birth');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  // const [validEmail, setValidEmail] = useState(true);
  // const [minLength, setMinLength] = useState(true);
  // const [passwordsMatch, setPasswordsMatch] = useState(true);
  // const [emptyField, setEmptyField] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const OpenDateWindow = () => {
    setShow(true);
  };
  const handleDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(1999, 11, 31);
    setShow(false);
    setDate(currentDate);
    let tmpDate = new Date(currentDate);
    let fullDate =
      '📅 ' +
      tmpDate.getDate() +
      '-' +
      (tmpDate.getMonth() + 1) +
      '-' +
      tmpDate.getFullYear();
    setText(fullDate);
  };

  const gender = ['Female', 'Male'];

  const onPressNextHandler = () => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      email.length == 0 ||
      name.length == 0 ||
      phoneNumber.length == 0 ||
      password.length == 0 ||
      confirmPassword.length == 0 ||
      selectedGender == '' ||
      date == ''
    ) {
      setIsVisible(true);
      setErrorMessage('All fields are required');
      // setEmptyField(true);
    } else if (!re.test(email)) {
      setIsVisible(true);
      setErrorMessage('Invalid email');
      // setValidEmail(false);
    } else if (password.length < 8) {
      setIsVisible(true);
      setErrorMessage('Passwords must be at least 8 characters in length');
      // setMinLength(false);
    } else if (password != confirmPassword) {
      setIsVisible(true);
      setErrorMessage(`Passwords don't match`);
      console.log('dont match');
      // setPasswordsMatch(false);
    } else {
      navigation.navigate('SignUpQuestions', {
        email: email,
        name: name,
        phoneNumber: phoneNumber,
        password: password,
        date: date,
        selectedGender: selectedGender,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.Body}>
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
          <Text style={styles.TitleText}>Sign Up</Text>
          <View style={styles.InputsRegion}>
            {isVisible ? (
              <View style={{height: 30}}>
                <Text style={styles.validationText}>
                  {errorMessage}
                  {/* All fields are required */}
                </Text>
              </View>
            ) : null}
            <TextInput
              style={styles.Input}
              placeholder="Enter your email"
              keyboardType={'email-address'}
              onChangeText={text => setEmail(text)}></TextInput>
            {/* {!validEmail ? (
              <View style={{height: 30}}>
                <Text style={styles.validationText}>Email is not valid</Text>
              </View>
            ) : null} */}
            <TextInput
              style={styles.Input}
              placeholder="Enter your name"
              onChangeText={text => setName(text)}></TextInput>
            <TextInput
              style={styles.Input}
              placeholder="Enter your phone number"
              keyboardType={'number-pad'}
              onChangeText={text => setPhoneNumber(text)}></TextInput>
            <TextInput
              secureTextEntry={true}
              style={styles.Input}
              placeholder="Enter your password"
              onChangeText={text => setPassword(text)}></TextInput>
            {/* {!minLength ? (
              <View style={{height: 30}}>
                <Text style={styles.validationText}>
                  Passwords must be at least 8 characters in length
                </Text>
              </View>
            ) : null} */}
            <TextInput
              secureTextEntry={true}
              style={styles.Input}
              placeholder="Confirm your password"
              onChangeText={text => setConfirmPassword(text)}></TextInput>
            {/* {!passwordsMatch ? (
              <View style={{height: 30}}>
                <Text style={styles.validationText}>Passwords don't match</Text>
              </View>
            ) : null} */}
            <View style={styles.view}>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <Pressable onPress={OpenDateWindow} style={styles.dateInput}>
                  <Text style={{textAlign: 'center', color: '#000'}}>
                    {text}
                  </Text>
                  {show && (
                    <DateTimePicker
                      mode="date"
                      value={date}
                      format="yyyy-MM-dd"
                      maximumDate={new Date()}
                      onChange={handleDate}
                      isDatePickerVisible
                      display="spinner"
                    />
                  )}
                </Pressable>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <SelectDropdown
                  renderDropdownIcon={() => (
                    <Ionicons name={'chevron-down'} size={20} color={'#000'} />
                  )}
                  dropdownBackgroundColor="#fff"
                  dropdownOverlayColor="transparent"
                  buttonStyle={styles.dateInput}
                  defaultButtonText="Gender"
                  buttonTextStyle={{fontSize: 15}}
                  data={gender}
                  onSelect={(selectedItem, index) => {
                    setSelectedGender(selectedItem);
                    console.log(selectedItem, index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => onPressNextHandler()}>
              <Text style={{color: '#fff'}}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FlashMessage position="top" icon="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Body: {
    // flex: 1,
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
    // height: '100%',
    width: '100%',
    // marginTop: '10%',
    // justifyContent: 'center',
    // backgroundColor: '#f0f0f0'
  },

  TitleText: {
    color: '#000',
    fontSize: 25,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },

  RegisterCard: {
    // width: '85%',
    marginHorizontal: 25,
    // alignSelf: 'center',
    overflow: 'hidden',
  },

  InputsRegion: {
    // backgroundColor: '#7a94f0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Input: {
    width: '95%',
    borderRadius: 10,
    // borderWidth: 1,
    textAlign: 'center',
    // borderColor: '#fff',
    margin: 10,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {width: -1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },

  dateInput: {
    width: '95%',
    height: 55,
    // height: '30%',
    borderRadius: 10,
    padding: 15,
    // borderWidth: 1,
    justifyContent: 'center',
    // borderColor: '#fff',
    // margin: 10,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {width: -1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },

  view: {
    flexDirection: 'row',
    width: '95%',
    margin: 10,
  },

  nextButton: {
    width: '95%',
    margin: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    backgroundColor: '#1c1bad',
    alignItems: 'center',
  },

  validationText: {
    fontSize: 15,
    color: '#ff0000',
  },
});
