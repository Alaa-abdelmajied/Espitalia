import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {showMessage} from 'react-native-flash-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret} from '@env';

export default function EditProfile({navigation, route}) {
  const {
    name,
    phoneNumber,
    birthdate,
    gender,
    date,
    bloodType,
    diabetic,
    bloodPressure,
    allergic,
    allergies,
  } = route.params;

  const [newName, setNewName] = useState(name);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
  const [text, setText] = useState(birthdate);
  const [show, setShow] = useState(false);
  const [newDate, setNewData] = useState(new Date(date));
  const [updateColor, setUpdateColor] = useState(false);
  const [newBloodType, setNewBloodType] = useState(bloodType);
  const [newDiabetic, setNewDiabetic] = useState(diabetic);
  const [newBloodPressure, setNewBloodPressure] = useState(bloodPressure);
  const [newAllergic, setNewAllergic] = useState(allergic);
  const [newAllergies, setNewAllergies] = useState(allergies);

  const OpenDateWindow = () => {
    setShow(true);
  };

  const handleDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(1999, 11, 31);
    setShow(false);
    setNewData(currentDate);
    let tmpDate = new Date(currentDate);
    let fullDate =
      tmpDate.getDate() +
      '-' +
      (tmpDate.getMonth() + 1) +
      '-' +
      tmpDate.getFullYear();
    setText(fullDate);
    setUpdateColor(true);
  };

  const editProfile = async () => {
    if (newAllergic == 'No' || newAllergic == 'Unknown') {
      setNewAllergies('');
    }
    console.log('new', newAllergic, newAllergies);
    console.log(newName, newPhoneNumber, newDate);
    console.log(birthdate, name, phoneNumber);
    console.log('pressed');
    try {
      const token = JSON.parse(
        await EncryptedStorage.getItem(Token_Secret),
      ).token;
      console.log(token);
      axios
        .put(
          `${Server_URL}:3000/patient/editProfile`,
          {
            newName: newName,
            newPhoneNumber: newPhoneNumber,
            newDate: newDate,
            newBloodType: newBloodType,
            newDiabetic: newDiabetic,
            newBloodPressure: newBloodPressure,
            newAllergic: newAllergic,
            newAllergies: newAllergies,
          },
          {
            headers: {
              'x-auth-token': token,
            },
          },
        )
        .then(async function (response) {
          console.log('done');
          // navigation.navigate('PatientProfile');
          showMessage({
            message: 'Info updated successfully',
            type: 'success',
          });
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
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Pressable
          style={{flex: 1, alignSelf: 'center', marginLeft: 5}}
          onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={30} color="#fff"></Ionicons>
        </Pressable>
        <View
          style={{flex: 12, flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            style={styles.image}
            source={require('../../images/app_logo-removebg-preview.png')}></Image>

          <Text style={styles.headerText}>espitalia</Text>
        </View>
      </View>
      <View style={{flex: 1.5}}></View>
      <View style={styles.body}>
        <Text style={styles.title}>Edit your info</Text>
        <View style={styles.bodyContent}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesome
              name={'id-card'}
              size={20}
              color={'#000'}></FontAwesome>
            <Text style={styles.mainText}>Name</Text>
          </View>
          <TextInput
            style={styles.input}
            value={newName}
            // placeholder={name}
            onChangeText={text => setNewName(text)}></TextInput>
        </View>

        <View style={styles.bodyContent}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesome name={'phone'} size={20} color={'#000'}></FontAwesome>
            <Text style={styles.mainText}>Phone number</Text>
          </View>
          <TextInput
            style={styles.input}
            value={newPhoneNumber}
            // placeholder={phoneNumber}
            keyboardType={'number-pad'}
            onChangeText={text => setNewPhoneNumber(text)}></TextInput>
        </View>
        <View style={styles.bodyContent}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesome
              name={'calendar'}
              size={20}
              color={'#000'}></FontAwesome>
            <Text style={styles.mainText}>Birthdate</Text>
          </View>
          <View style={styles.pickerContainer}>
            <Pressable onPress={OpenDateWindow} style={styles.dateInput}>
              <Text
                style={
                  {textAlign: 'center', color: '#000'}
                  // !updateColor
                  //   ? {textAlign: 'center', color: '#a1a1a1'}
                  //   : {textAlign: 'center', color: '#000'}
                }>
                {text}
              </Text>
              {show && (
                <DateTimePicker
                  mode="date"
                  value={newDate}
                  format="yyyy-MM-dd"
                  maximumDate={new Date()}
                  onChange={handleDate}
                  isDatePickerVisible
                  display="spinner"
                />
              )}
            </Pressable>
          </View>
          {/* <TextInput style={styles.input} placeholder={birthdate}></TextInput> */}
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.PickerText}>What is your blood type?</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={newBloodType}
              onValueChange={(itemValue, itemIndex) =>
                setNewBloodType(itemValue)
              }>
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
              <Picker.Item label="I don't know" value="Unknown" />
            </Picker>
          </View>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.PickerText}>Are you diabetic?</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={newDiabetic}
              onValueChange={(itemValue, itemIndex) =>
                setNewDiabetic(itemValue)
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
              selectedValue={newBloodPressure}
              onValueChange={(itemValue, itemIndex) =>
                setNewBloodPressure(itemValue)
              }>
              <Picker.Item label="Normal" value="Normal" />
              <Picker.Item label="High" value="High" />
              <Picker.Item label="Low" value="Low" />
              <Picker.Item label="I don't know" value="Unknown" />
            </Picker>
          </View>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.PickerText}>Are you allergic to anything?</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={newAllergic}
              onValueChange={(itemValue, itemIndex) =>
                setNewAllergic(itemValue)
              }>
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
              <Picker.Item label="I don't know" value="Unknown" />
            </Picker>
          </View>
          {newAllergic == 'Yes' ? (
            <View>
              <Text></Text>
              <TextInput
                style={styles.Input}
                value={newAllergies}
                // placeholder={allergies}
                // placeholderTextColor={'#a1a1a1'}
                onChangeText={text => setNewAllergies(text)}></TextInput>
            </View>
          ) : null}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 15,
          }}>
          <Ionicons name={'key'} size={20} color={'#000'}></Ionicons>
          <Pressable
            onPress={() => {
              navigation.navigate('ChangePassword', {
                profileChangePassword: true,
              });
              // , setShowModal(false);
            }}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 15,
                color: '#000',
                textDecorationLine: 'underline',
                // textAlign:'center'
              }}>
              Change Password
            </Text>
          </Pressable>
        </View>
        <Pressable style={styles.button} onPress={editProfile}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </Pressable>
      </View>
      <FlashMessage position="bottom" icon="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    // flex: 1,
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#1c1bad',
    justifyContent: 'center',
    // position: 'absolute',
  },

  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },

  body: {
    marginTop: 10,
    alignItems: 'center',
  },

  input: {
    width: 330,
    borderRadius: 10,
    // borderWidth: 1,
    textAlign: 'center',
    margin: 10,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {width: -1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },

  button: {
    backgroundColor: '#1c1bad',
    borderRadius: 5,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 20,
  },

  buttonText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
  },
  mainText: {
    color: '#000',
    fontSize: 18,
    alignSelf: 'center',
    marginLeft: 10,
  },

  title: {
    fontSize: 23,
    color: '#000',
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 5,
  },

  bodyContent: {
    width: 380,
    // backgroundColor: '#f0f',
    flexDirection: 'column',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  questionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },

  Input: {
    height: 60,
    width: 300,
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    margin: 10,
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
});
