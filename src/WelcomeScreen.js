import React, { useState } from 'react';

import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  SectionList,
  FlatList,
  RefreshControl,
  TextInput,
  Alert,
  ImageBackground,
  Pressable,
  Dimensions
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';


export default function HomeScreen({ navigation }) {


  return (

    <View style={styles.body}>
      <Image style={styles.logo} source={require('../images/applogo-removebg-preview.png')}></Image>
      <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#0d259e' }}>eSpitalia</Text>
      <View style={styles.main}>
        <Pressable onPress={() => navigation.navigate({
          name: 'Login',
          params: {
            staff: false,
          },
        })} style={styles.userButton} >
          <Text style={styles.buttonText}> USER </Text>
        </Pressable>
        <Pressable style={styles.staffButton} onPress={() => navigation.navigate({
          name: 'Login',
          params: {
            staff: true,
          },
        })}>
          <Text style={styles.buttonText2}> STAFF </Text>
        </Pressable>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({

  body: {
    flex: 1,
    flexDirection: 'column',
    //  marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'#f0f0f0',
  },



  SignUpButton: {
    width: 100,
    // marginTop:-30,
    // margin:40,
    paddingTop: 15,
    paddingBottom: 15,
    // marginLeft: 30,
    // marginRight: 30,
    borderRadius: 30,
    backgroundColor: '#0d259e',
    borderWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
    borderColor: '#fff',
    color: '#fff'
  },



  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },

  buttonText2: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },

  logo: {
    width: 200,
    height: 220,
    // resizeMode: 'cover'
    //  marginTop: -180,
  },

  Image2: {
    width: '100%',
    height: '100%',
  },

  // main: {
  //   flexDirection: 'row',
  // },

  userButton: {
    width: 130,
    marginTop: 30,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center'
  },

  staffButton: {
    width: 130,
    marginTop: 30,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#1b1bad',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    // borderColor:'#000'
  },
  customRatingBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,

  },
  starImg: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  }

});
