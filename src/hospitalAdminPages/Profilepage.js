import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Button,BackHandler} from 'react-native';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret, Credintials_Secret} from '@env';

const Profilepage = ({navigation, route}) => {
   const [hospitalData, setHospitalData] = useState({});
   const getProfile =  async ()=>{
    try{
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
    catch(err){
        Alert.alert('Error', err.code, [
            {text: 'Exit', onPress: () => BackHandler.exitApp()},
          ]);


    }

   }
   useEffect(() =>{
    getProfile();
   },[]
   )
    
    return (
        <View style={styles.page}>
            <Text styles={styles.text}>
              email: {hospitalData.email}
            </Text>
            <Text styles={styles.text}>
              name: {hospitalData.name}
            </Text>
            <Text styles={styles.text}>
              address: {hospitalData.address}
            </Text>
            <Button title="Edit" onPress={() => navigation.navigate('MyProfileHospitalPage', {name:"hospital name"})}/> 
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    img: {
        width: 150,
        height: 150,
    },
    text: {
        color: '#1c1bad',
        fontSize: 35,

    }
  });

export default Profilepage;