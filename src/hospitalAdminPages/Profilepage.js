
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, BackHandler, Pressable } from 'react-native';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Server_URL, Token_Secret, Credintials_Secret } from '@env';

const Profilepage = ({ navigation, route }) => {
  const [hospitalData, setHospitalData] = useState({});
  const getProfile = async () => {
    try {
      const token = JSON.parse(
        await EncryptedStorage.getItem(Token_Secret),
      ).token;

      await axios
        .get(`${Server_URL}:3000/hospital/getProfile`, {
          headers: {
            'x-auth-token': token,
          },
        }).then(response => {
          setHospitalData(response.data);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error.message);
        });

    }
    catch (err) {
      Alert.alert('Error', err.code, [
        { text: 'Exit', onPress: () => BackHandler.exitApp() },
      ]);


    }

  }
  useEffect(() => {
    getProfile();
  }, []
  )

  return (
    <View style={styles.page}>
      <Text style={styles.text}>
        email: {hospitalData.email}
      </Text>
      <Text style={styles.text}>
        name: {hospitalData.name}
      </Text>
      <Text style={styles.text}>
        address: {hospitalData.address}
      </Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('MyProfileHospitalPage', { name: hospitalData.name , address: hospitalData.address, email: hospitalData.email })}>
        <Text style={styles.buttonText}>Edit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#1c1bad',
    fontSize: 20,

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
  }
});

export default Profilepage;