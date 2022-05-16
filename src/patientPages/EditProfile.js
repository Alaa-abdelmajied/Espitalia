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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret} from '@env';

export default function EditProfile({route}) {
  const {name, email, age, phoneNumber} = route.params;
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  const editProfile = async () => {
    console.log('pressed');
    try {
      const token = JSON.parse(
        await EncryptedStorage.getItem(Token_Secret),
      ).token;

      axios
        .put(`${Server_URL}:3000/patient/editProfile`, {
          token: token,
          name: newName,
          phoneNumber: newPhoneNumber,
        })
        .then(async function (response) {
          console.log('done');

          Alert.alert("Info Successfully Updated");
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
        <Image
          style={styles.image}
          source={require('../../images/app_logo-removebg-preview.png')}></Image>
        <Text style={styles.headerText}>espitalia</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>Edit your info</Text>
        <View style={styles.bodyContent}>
          {/* <View style={{width: '15%'}}> */}
          <Text style={styles.mainText}>Name:</Text>
          {/* </View> */}
          {/* <View style={{width: '80%'}}> */}
          <TextInput
            style={styles.input}
            placeholder={name}
            onChangeText={text => setNewName(text)}></TextInput>
          {/* </View> */}
        </View>
        {/* <View style={styles.bodyContent}>
          <Text style={styles.mainText}>Email:</Text>
          <TextInput style={styles.input} placeholder={email}></TextInput>
        </View> */}
        {/* <View style={styles.bodyContent}>
          <Text style={styles.mainText}>Birthdate:</Text>
          <TextInput style={styles.input} placeholder={age}></TextInput>
        </View> */}
        <View style={styles.bodyContent}>
          <Text style={styles.mainText}>PhoneNumber:</Text>
          <TextInput
            style={styles.input}
            placeholder={phoneNumber}
            onChangeText={text => setNewPhoneNumber(text)}></TextInput>
        </View>
        <Pressable style={styles.button} onPress={editProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#1c1bad',
    justifyContent: 'center',
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
  },

  title: {
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  bodyContent: {
    width: 380,
    // backgroundColor: '#f0f',
    flexDirection: 'column',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
