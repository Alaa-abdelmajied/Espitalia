/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import Svg, { Path } from 'react-native-svg';


// import type { Node } from 'react';
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




import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';





export default function Login({ navigation, route }) {


  return (
    <ScrollView>
      <View style={styles.body}>
        <Svg
          height={200}
          width={Dimensions.get('screen').width}
        >

          <Path
            fill="#0d259e"
            d='M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,197.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'
          />
          {/* <Text style={styles.MainText}>
                         Sign Up
                     </Text> */}

        </Svg>
        {/* <Image style={styles.Image} source={require('../images/applogo-removebg-preview.png')}></Image> */}
        <View style={styles.view}>
          <Text style={{ color: '#000', fontSize: 25, fontWeight: 'bold', margin: 20 }}>
            Sign In
          </Text>

          <TextInput style={styles.input} placeholder="Enter your username or email"></TextInput>
          <TextInput style={styles.input} placeholder="Enter your password"></TextInput>

          <Pressable>
            <Text style={styles.QuestionText}>Forgot password?</Text>
          </Pressable>

          <Pressable onPress={() => navigation.reset({
            index: 0,
            routes: [{ name: route.params.staff ? 'DoctorHomePage' : 'Patient' }],
          })}>
            <Text style={styles.SignInButton}>Sign In</Text>
          </Pressable>

          <View>{!route.params.staff ?
            <Pressable onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.QuestionText}>Don't have an account yet? Sign Up</Text>
            </Pressable> : null
          }
          </View>
        </View>
      </View>
    </ScrollView>
    // </ImageBackground>
  )
}



const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    backgrundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  view: {
    flex: 2,
    width: 350,
    height: '100%',
    margin: 10,
    marginBottom: 70,
    alignSelf: 'center',
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 6,
    justifyContent: 'center',
  },



  MainText: {
    color: '#000',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    justifyContent: 'center'
    // fontWeight: 'bold'
  },
  Image: {
    width: 80,
    height: 80,
    // marginTop:10,
  },

  QuestionText: {
    color: '#000',
    margin: 10,
  },

  SignInButton: {
    width: 130,
    marginTop: 30,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 30,
    backgroundColor: '#0d259e',
    borderWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
    borderColor: '#fff',
    color: '#fff'
  },

  input: {
    width: 330,
    borderRadius: 45,
    borderWidth: 1,
    textAlign: 'center',
    borderColor: '#fff',
    margin: 10,
    backgroundColor: '#fff',
  }
});

