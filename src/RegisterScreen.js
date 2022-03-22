import React, { useState } from 'react';
import Svg, { Path } from 'react-native-svg';

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
import LinearGradient from 'react-native-linear-gradient';

export default function SignUp({ navigation }) {

  return (

    // <ScrollView style={{ backgroundColor: '#fff' }}>
    <View style={styles.Body}>

      <View style={styles.WaveHeader}>
        <Svg
        // height={200}
        // width={Dimensions.get('screen').width}
        >
          <Path
            fill="#0d259e"
            d='M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,197.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'
          />

        </Svg>
      </View>
      {/* <Image style={styles.Image} source={require('../images/applogo-removebg-preview.png')}></Image> */}
      {/* <LinearGradient start={{x: 0, y: 0.75}} end={{x: 1, y: 0}} colors={[ '#09344d' , '#09344d' , '#09344d' , '#3096d1', '#3096d1']} style={styles.cards}> */}

      <View style={styles.RegisterRegion}>
        <View style={styles.RegisterCard}>
          <Text style={styles.TitleText}>
            Sign Up
          </Text>
          <View style={styles.InputsRegion}>

            <TextInput style={styles.Input} placeholder="Enter your email"></TextInput>
            <TextInput style={styles.Input} placeholder="Enter your username"></TextInput>
            <TextInput style={styles.Input} placeholder="Enter your password"></TextInput>
            <TextInput style={styles.Input} placeholder="Confirm your password"></TextInput>

            <Pressable onPress={() => navigation.navigate('SignUpQuestions')}>
              <Text style={styles.RegisterButton}>Next</Text>
            </Pressable>
            {/* <Pressable onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.QuestionText}>Already have an account? Sign In</Text>
          </Pressable> */}
            {/* </LinearGradient> */}

          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  Body: {
    flex: 1,
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
    marginTop: '10%',
    // backgroundColor: '#0e3de8'
  },

  TitleText: {
    color: '#000',
    fontSize: 25,
    margin: '5%',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center'
  },

  RegisterCard: {
    // flex: 1,
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 6,
    overflow: 'hidden'
  },

  InputsRegion: {
    // backgroundColor: '#7a94f0',
    alignItems: 'center',
    justifyContent: 'center'
  },

  Input: {
    width: 330,
    borderRadius: 45,
    borderWidth: 1,
    textAlign: 'center',
    borderColor: '#fff',
    margin: '3%',
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },

  Image: {
    width: 80,
    height: 80,
  },

  QuestionText: {
    color: '#000',
    // fontSize: 15,
    // marginRight: '1%',
  },

  RegisterButton: {
    width: 130,
    margin: '5%',
    // marginTop: 30,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 30,
    backgroundColor: '#0d259e',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff'
  },

});

