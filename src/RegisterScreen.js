import React, { useState } from 'react';
import Svg, { Path } from 'react-native-svg';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SignUp({ navigation }) {
  const today = new Date();
  const [text, setText] = useState('📅 Date of Birth');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const OpenDateWindow = () => {
    setShow(true);
  }
  const handleDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(1999, 11, 31);
    setShow(false);
    setDate(currentDate);

    let tmpDate = new Date(currentDate);
    let fullDate = "📅 " + tmpDate.getDate() + "/" + (tmpDate.getMonth() + 1) + "/" + tmpDate.getFullYear();
    setText(fullDate);
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const gender = ["Female", "Male"]
  const [selectedValue, setSelectedValue] = useState("no");


  return (

    <View style={styles.Body}>
      <View style={styles.WaveHeader}>
        <Svg
        // height={200}
        // width={Dimensions.get('screen').width}
        >
          <Path
            fill="#0d159e"
            d='M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,197.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'
          />

        </Svg>
      </View>

      <View style={styles.RegisterRegion}>
        <View style={styles.RegisterCard}>
          <Text style={styles.TitleText}>
            Sign Up
          </Text>
          <View style={styles.InputsRegion}>
            <TextInput style={styles.Input} placeholder="Enter your email" placeholderTextColor={'#a1a1a1'} >
            </TextInput>
            <TextInput style={styles.Input} placeholder="Enter your username" placeholderTextColor={'#a1a1a1'}></TextInput>
            <TextInput secureTextEntry={true} style={styles.Input} placeholder="Enter your password" placeholderTextColor={'#a1a1a1'}></TextInput>
            <TextInput secureTextEntry={true} style={styles.Input} placeholder="Confirm your password" placeholderTextColor={'#a1a1a1'}></TextInput>
            <View style={styles.view}>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Pressable onPress={OpenDateWindow} style={styles.dateInput}>
                  <Text style={{ textAlign: 'center', color: '#a1a1a1' }}>{text}</Text>
                  {show && (
                    <DateTimePicker
                      mode='date'
                      value={date}
                      maximumDate={new Date((today.getFullYear() - 25), 11, 31)}
                      onChange={handleDate}
                      isDatePickerVisible
                    />)}
                </Pressable>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <SelectDropdown renderDropdownIcon={() => <Ionicons
                  name={'chevron-down'}
                  size={20}
                  color={'#000'}
                />} dropdownBackgroundColor='#fff' dropdownOverlayColor='transparent' buttonStyle={styles.dateInput} defaultButtonText='Gender' buttonTextStyle={{ color: '#a1a1a1', fontSize: 16 }}
                  data={gender}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    return item
                  }}
                />
              </View>
            </View>

            <Pressable style={styles.nextButton} onPress={() => navigation.navigate('SignUpQuestions')}>
              <Text style={{ color: '#fff' }}>Next</Text>
            </Pressable>

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
    // height: '100%',
    width: '100%',
    // marginTop: '10%',
    // justifyContent: 'center',
    backgroundColor: '#f0f0f0'
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
    // width: '85%',
    marginHorizontal: 25,
    // alignSelf: 'center',
    overflow: 'hidden'
  },

  InputsRegion: {
    // backgroundColor: '#7a94f0',
    alignItems: 'center',
    justifyContent: 'center'
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
    shadowOffset: { width: -1, height: 1 },
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
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },

  view: {
    flexDirection: 'row',
    width: '95%',
    margin: 10
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

});

