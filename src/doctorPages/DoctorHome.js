import React, {useEffect, useState} from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Modal,
  TextInput,
  Image,
  Pressable,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret, Credintials_Secret} from '@env';

const DUMMY_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const CONTENT = [
  {
    title: 'Alaa Abdelmajied',
    content: DUMMY_TEXT,
  },
  {
    title: 'Maram Ghazal',
    content: DUMMY_TEXT,
  },
  {
    title: 'Omar Shalaby',
    content: DUMMY_TEXT,
  },
];

export default function DoctorHome({navigation}) {

  //FIXME: way of returning data
  const [currentAppointments, setCurrentAppointment] = useState([]);
  const [patients, setPatients] = useState([]);
  // var patients=[];

  const getCurrentAppointments = async () => {
    try {
      const token = JSON.parse(
        await EncryptedStorage.getItem(Token_Secret),
      ).token;
      await axios
        .get(`${Server_URL}:3000/doctor/currentDayAppointments`, {
          headers: {
            'x-auth-token': token,
          },
        })
        .then(response => {
          setCurrentAppointment(response.data);
          // for (var i = 0; i < response.data.length; i++) {
          //   // patients.push(response.data[i].patients);
          //   setPatients(response.data[i].patients);
          // }
          // console.log(patients);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    } catch (err) {
      Alert.alert('Error', err.code, [
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
      ]);
    }
  };

  useEffect(() => {
    getCurrentAppointments();
  }, []);

  const [activeSections, setActiveSections] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const setSections = sections => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    {
      return (
        <Animatable.View
          duration={400}
          style={[styles.header, isActive ? styles.active : styles.inactive]}
          transition="backgroundColor"
          flexDirection="column">
          <Text style={styles.title}>
            From: {section.from} - To:{section.to}
          </Text>
          {section.patients.map(item => {
            return (
              <View style={{flexDirection: 'row'}}>
                <Pressable onPress={() => console.log(section)}></Pressable>
                <Text style={{color: '#000', fontSize: 18}}>Patient: </Text>
                <Text style={styles.headerText}>{item.patientName}</Text>
              </View>
            );
          })}
        </Animatable.View>
      );
    }
  };

  const onPressHistory = () => {
    navigation.navigate('History');
  };

  const renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Pressable style={{backgroundColor: '#1c1bad', padding: 5}}>
            <Text style={{color: '#fff'}}>Entered</Text>
          </Pressable>
          <Pressable
            style={{backgroundColor: '#1c1bad', padding: 5}}
            onPress={onPressHistory}>
            <Text style={{color: '#fff'}}>Show History</Text>
          </Pressable>
          <Pressable
            style={{backgroundColor: '#1c1bad', padding: 5}}
            onPress={() => setShowModal(true)}>
            <Text style={{color: '#fff'}}>Add Report</Text>
          </Pressable>
          <Pressable style={{backgroundColor: '#1c1bad', padding: 5}}>
            <Text style={{color: '#fff'}}>End Appointment</Text>
          </Pressable>
        </View>
      </Animatable.View>
    );
  };

  const onPressSave = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header_}>
        <Image
          style={styles.Image}
          source={require('../../images/app_logo-removebg-preview.png')}></Image>
      </View>
      <ScrollView>
        <Modal
          visible={showModal}
          transparent
          onRequestClose={() => setShowModal(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modal}>
              <View style={styles.modalTitle}>
                <Text style={{color: '#fff', fontSize: 25}}>Enter</Text>
              </View>
              <View style={styles.modalBody}>
                <TextInput
                  style={styles.inputFeilds}
                  placeholder="Report"></TextInput>
                <TextInput
                  style={styles.inputFeilds}
                  placeholder="Prescription"></TextInput>
              </View>
              <View style={styles.modalButton}>
                <Button title="Save" onPress={onPressSave}></Button>
              </View>
            </View>
          </View>
        </Modal>
        <Text style={styles.title}>Today's appointments</Text>
        <Accordion
          activeSections={activeSections}
          sections={currentAppointments}
          touchableComponent={TouchableOpacity}
          expandMultiple={false}
          renderHeader={renderHeader}
          renderContent={renderContent}
          duration={400}
          onChange={setSections}
          renderAsFlatList={false}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageHeader: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    backgroundColor: '#00ffff',
  },
  header_: {
    height: '8%',
    backgroundColor: '#0d159e',
    justifyContent: 'center',
  },

  Image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    // marginTop:10,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
    color: 'bold',
    color: '#000',
    margin: '2%',

    // marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    //textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: '#0d159e',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    // backgroundColor: 'rgba(100,255,255,1)',
    backgroundColor: '#f0f0f0',
  },
  inactive: {
    // backgroundColor: 'rgba(245,252,255,1)',
    backgroundColor: '#f0f0f0',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  modal: {
    width: 300,
    height: 300,
    backgroundColor: '#ffffff',
    // borderWidth: 1,
    // borderColor: '#000',
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  modalTitle: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d159e',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
  },
  modalBody: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFeilds: {
    width: 200,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },

  accordionButtons: {
    backgroundColor: '#1c1bad',
    padding: 5,
  },
});
