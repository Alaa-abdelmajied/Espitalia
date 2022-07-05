import React, { useState } from "react";
import { View, StyleSheet, Button, Text, Image } from 'react-native';

import EncryptedStorage from 'react-native-encrypted-storage';
import { Server_URL, Token_Secret, Credintials_Secret } from '@env';
import axios from "axios";

export default function Homepage({ navigation, route }) {
  //token: JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token,
  const getDoctors = async () => {
    const token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
    console.log(token);
    console.log(Server_URL);
    navigation.navigate('Doctors');
  }
  const getReceptionists = async () => {
    const token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
    // console.log(token);
    console.log(Server_URL);
    navigation.navigate('Reciptionist');
    // axios
    //   .get(`${Server_URL}:3000/hospital/viewReceptionists`, {
    //     headers: {
    //       'x-auth-token': token
    //     },

    //   })
    //   .then(async function (response) {
    //     // console.log(response.data);
    //     navigation.navigate('Reciptionist', response.data);
    //   })
    //   .catch (function (error){
    //     console.log(error);
    //   }); 

  }

  const onPressLogout = async () => {
    try {
      await EncryptedStorage.removeItem(Token_Secret);
      await EncryptedStorage.removeItem(Credintials_Secret);
      navigation.reset({
        index: 0,
        routes: [{name: 'WelcomePage'}],
      });
    } catch (err) {
      Alert.alert('Error', err.message, [
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        {/* <Image source={{ uri: 'https://images.assets-landingi.com/ezfQc3bO/logo_01.png' }} style={styles.img} /> */}
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Hospital:{'\t'} <Text style={styles.data}>{route.params.name}</Text></Text>
        <Text style={styles.label}>Adress:{'\t\t\t'} <Text style={styles.data}>{route.params.address}</Text></Text>
      </View>

      <View style={styles.buttons}>
        <Button
          title="Doctors"
          color={'#1c1bad'}
          onPress={getDoctors}
        />
        <Button
          title="Reciptionists"
          color={'#1c1bad'}
          onPress={getReceptionists}
        />
        <Button
          title="Logout"
          color={'#1c1bad'}
          onPress={onPressLogout}
        />
      </View>
      <Button
        title="Go to Profile"
        color={'#1c1bad'}
        onPress={() => navigation.navigate('Profile', { name: 'Omar' })}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',

  },
  logo: {
    alignContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: 139,
    height: 139,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    padding: 15,
  },
  label: {
    flex: 1,
    fontSize: 20,
    color: 'black',
    fontFamily: 'sans-serif',
  },
  buttons: {
    flex: 2,
    margin: 50,
    justifyContent: 'space-evenly'
  },
  button: {
    margin: 10,
  },
  data: {
    fontWeight: 'bold',
  },

});