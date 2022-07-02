import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import Svg, {Path} from 'react-native-svg';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FlashMessage from 'react-native-flash-message';
import {showMessage} from 'react-native-flash-message';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret, Credintials_Secret} from '@env';
import messaging from '@react-native-firebase/messaging';

export default function Questions({navigation, route}) {
  const [diabetic, setDiabetic] = useState('Unknown');
  const [bloodType, setBloodType] = useState('Unknown');
  const [bloodPressure, setBloodPressure] = useState('Unknown');
  const [allergic, setAllergic] = useState('Unknown');
  const [allergies, setAllergies] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {email, name, password, phoneNumber, date, selectedGender} =
    route.params;
  const [fcmToken, setFcmToken] = useState('');
  useEffect(() => {
    createFcmtoken();
  }, []);

  const createFcmtoken = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await messaging()
        .getToken()
        .then(fcmTokenGenerated => {
          console.log('FCM Token -> ', fcmTokenGenerated);
          setFcmToken(fcmTokenGenerated);
        });
    } else console.log('Not Authorization status:', authStatus);
  };

  const onPressHandler = async () => {
    console.log('front', fcmToken);
    if (!toggleCheckBox) {
      console.log('not toggled');
      showMessage({
        message: 'You need to accept our terms and conditions first',
        duration: 5000,
        type: 'warning',
      });
    } else {
      axios
        .post(`${Server_URL}:3000/patient/signup`, {
          email: email,
          password: password,
          name: name,
          phoneNumber: phoneNumber,
          dateOfBirth: date,
          gender: selectedGender,
          diabetic: diabetic,
          bloodType: bloodType,
          bloodPressure: bloodPressure,
          allergic: allergic,
          allergies: allergies,
          fcmToken: fcmToken,
        })
        .then(async function (response) {
          const {token} = response.data;
          try {
            await EncryptedStorage.setItem(
              Token_Secret,
              JSON.stringify({token: token}),
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
              {text: 'Exit', onPress: () => BackHandler.exitApp()},
            ]);
          }
          navigation.navigate('OTP', {isForgotten: false, type: 'patient'});
        })
        .catch(function (error) {
          const err = error.response.data;
          if (err.includes('E11000 duplicate key'))
            showMessage({
              message: 'This email already exists',
              duration: 5000,
              type: 'warning',
            });
          console.log('This email already exists');
        });
    }
  };

  return (
    <ScrollView>
      <Modal visible={showModal} animationType="fade" transparent={true}>
        <View style={styles.modal}>
          <FontAwesome
            name={'close'}
            size={28}
            color={'#1c1bad'}
            onPress={() => setShowModal(false)}
            style={{ margin: 5}}></FontAwesome>
          <View style={styles.modalText}>
            <Text>
              1. Espitalia bans your account for 30 days in case of not showing
              up in five appointments without cancelling in advance.
            </Text>
            <Text>
              2. Espitalia saves your medical report and prescription for each
              appointment and can only be viewed by you and the doctors whom you
              book an appointment with.
            </Text>
            <Text>
              3. Accepting a blood request allows the receptionist of a hospital
              to see your name and phone number.
            </Text>
            <Text>
              4. Espitalia is for personal use, it is not supposed to be used to
              book an appointment for anyone except the user himself.
            </Text>
          </View>
        </View>
      </Modal>
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
          <Text style={styles.TitleText}>Questions</Text>
          <View style={styles.QuestionsRegion}>
            <View style={styles.questionContainer}>
              <Text style={styles.PickerText}>What is your blood type?</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={bloodType}
                  onValueChange={(itemValue, itemIndex) =>
                    setBloodType(itemValue)
                  }>
                  <Picker.Item label="A+" value="A+" />
                  <Picker.Item label="A-" value="A-" />
                  <Picker.Item label="B+" value="B+" />
                  <Picker.Item label="B-" value="B-" />
                  <Picker.Item label="O+" value="O+" />
                  <Picker.Item label="O-" value="O-" />
                  <Picker.Item label="AB+" value="Ab+" />
                  <Picker.Item label="AB-" value="Ab-" />
                  <Picker.Item label="I don't know" value="Unknown" />
                </Picker>
              </View>
            </View>
            <View style={styles.questionContainer}>
              <Text style={styles.PickerText}>Are you diabetic?</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={diabetic}
                  onValueChange={(itemValue, itemIndex) =>
                    setDiabetic(itemValue)
                  }>
                  <Picker.Item label="Yes" value="Yes" />
                  <Picker.Item label="No" value="No" />
                  <Picker.Item label="I don't know" value="Unknown" />
                </Picker>
              </View>
            </View>
            <View style={styles.questionContainer}>
              <Text style={styles.PickerText}>
                Do you have blood pressure problems?
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={bloodPressure}
                  onValueChange={(itemValue, itemIndex) =>
                    setBloodPressure(itemValue)
                  }>
                  <Picker.Item label="Normal" value="Normal" />
                  <Picker.Item label="High" value="High" />
                  <Picker.Item label="Low" value="Low" />
                  <Picker.Item label="I don't know" value="Unknown" />
                </Picker>
              </View>
            </View>
            <View style={styles.questionContainer}>
              <Text style={styles.PickerText}>
                Are you allergic to anything?
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={allergic}
                  onValueChange={(itemValue, itemIndex) =>
                    setAllergic(itemValue)
                  }>
                  <Picker.Item label="Yes" value="Yes" />
                  <Picker.Item label="No" value="No" />
                  <Picker.Item label="I don't know" value="Unknown" />
                </Picker>
              </View>
              {allergic == 'yes' ? (
                <View>
                  <TextInput
                    style={styles.Input}
                    placeholder="What are you allergic to?"
                    placeholderTextColor={'#a1a1a1'}
                    onChangeText={text => setAllergies(text)}></TextInput>
                </View>
              ) : null}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              margin: '5%',
            }}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              // onPress={() => navigation.navigate('SignUp')}
            />
            <Text style={styles.QuestionText}>Agree to{'\b'}</Text>
            <Pressable onPress={() => setShowModal(true)}>
              <Text
                style={{
                  marginTop: 5,
                  color: '#1c1bad',
                  textDecorationLine: 'underline',
                }}>
                terms and conditions
              </Text>
            </Pressable>
          </View>
          <TouchableOpacity
            style={styles.RegisterButton}
            onPress={() => onPressHandler()}>
            <Text style={{color: '#fff'}}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlashMessage position="bottom" icon="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  WaveHeader: {
    // flex: 1,
    height: 200,
    width: '100%',
  },

  modal: {
    height: 350,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    width: '80%',
    marginTop: '30%',
    // margin: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1c1bad',
    shadowOpacity: 1,
    shadowOffset: {
      width: 10,
      height: 15,
    },
    elevation: 10,
    overflow: 'hidden',
    padding: 5,
  },

  modalButton: {
    backgroundColor: '#1c1bad',
    borderRadius: 5,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    // marginBottom: 20,
  },
  modalText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
  },

  RegisterRegion: {
    width: '100%',
    // backgroundColor: '#f0f0f0',
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  TitleText: {
    color: '#000',
    fontSize: 25,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },

  QuestionsRegion: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  questionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },

  PickerText: {
    color: '#000',
    fontSize: 15,
  },

  pickerContainer: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 5,
    height: 50,
    width: 200,
    shadowColor: '#000000',
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },

  MainText: {
    textAlign: 'center',
    justifyContent: 'center',
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    margin: 20,
    // fontWeight: 'bold'
  },

  QuestionText: {
    color: '#000',
    marginTop: 5,
    // fontSize:15,
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
    alignSelf: 'center',
    // color: '#fff'
  },

  Input: {
    height: 60,
    width: 300,
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    margin: 10,
  },
});
