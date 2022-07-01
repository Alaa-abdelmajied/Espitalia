import React, {useState, useEffect} from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret, Credintials_Secret} from '@env';

const patientAccordion = ({item, navigation, entered}) => {
  const [activeSections, setActiveSections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([item]);
  const [report, setReport] = useState('');
  const [prescription, setPrescription] = useState('');
  const [patientEntered, setPatientEntered] = useState(entered);

  console.log(data[0]);

  const endAppointment = async () => {
    try {
      const token = JSON.parse(
        await EncryptedStorage.getItem(Token_Secret),
      ).token;
      console.log(data[0].patients[activeSections[0]].appointmentID);
      await axios
        .post(
          `${Server_URL}:3000/doctor/endAppointments`,
          {
            scheduleId: data[0].patients[activeSections[0]].scheduleID,
            appointmentId: data[0].patients[activeSections[0]].appointmentID,
            patientId: data[0].patients[activeSections[0]].patientID,
          },
          {
            headers: {
              'x-auth-token': token,
            },
          },
        )
        .then(response => {
          console.log('here');
          data[0].patients.splice(activeSections[0], 1);
          setActiveSections([]);
          showMessage({
            message: 'Appointment ended',
            type: 'success',
          });
          console.log(response.data);
        })
        .catch(function (error) {
          if (error.response.data == 'no ongoing') {
            showMessage({
              message: 'There are no ongoing appointment',
              type: 'warning',
            });
          }
          console.log(error.response.data);
        });
    } catch (err) {
      Alert.alert('Error', err.code, [
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
      ]);
    }
  };

  const onPressEntered = async () => {
    try {
      const token = JSON.parse(
        await EncryptedStorage.getItem(Token_Secret),
      ).token;
      console.log(data[0].patients[activeSections[0]].appointmentID);
      await axios
        .post(
          `${Server_URL}:3000/doctor/patientEntered`,
          {
            scheduleId: data[0].patients[activeSections[0]].scheduleID,
          },
          {
            headers: {
              'x-auth-token': token,
            },
          },
        )
        .then(response => {
          console.log('here');
          setPatientEntered(true);
          showMessage({
            message: 'Appointment started',
            type: 'success',
          });
          console.log(response.data);
        })
        .catch(function (error) {
          if (error.response.data == 'still ongoing') {
            showMessage({
              message: 'There is already an ongoing appointment',
              type: 'warning',
            });
          }
          console.log(error.response.data);
        });
    } catch (err) {
      Alert.alert('Error', err.code, [
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
      ]);
    }
  };

  const onPressCancel = async () => {
    try {
      const token = JSON.parse(
        await EncryptedStorage.getItem(Token_Secret),
      ).token;
      console.log(data[0].patients[activeSections[0]].appointmentID);
      await axios
        .post(
          `${Server_URL}:3000/doctor/didNotShow`,
          {
            patientId: data[0].patients[activeSections[0]].patientID,
            appointmentId: data[0].patients[activeSections[0]].appointmentID,
            // scheduleId: data[0].patients[activeSections[0]].scheduleID,
          },
          {
            headers: {
              'x-auth-token': token,
            },
          },
        )
        .then(response => {
          console.log('here');
          data[0].patients.splice(activeSections[0], 1);
          setActiveSections([]);
          showMessage({
            message: 'Appointment cancelled',
            type: 'success',
          });
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    } catch (err) {
      Alert.alert('Error', err.code, [
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
      ]);
    }
  };

  const setSections = sections => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
        flexDirection="row">
        <Text style={{color: '#000', fontSize: 18}}>Patient: </Text>
        <Text style={styles.headerText}>{section.patientName}</Text>
      </Animatable.View>
    );
  };

  const onPressHistory = () => {
    navigation.navigate('History', {
      patientId: data[0].patients[activeSections[0]].patientID,
      patientName: data[0].patients[activeSections[0]].patientName,
    });
  };

  const renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        {patientEntered ? (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={styles.accordionButton}
              onPress={onPressHistory}>
              <Text style={{color: '#fff'}}>Show History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.accordionButton}
              onPress={() => setShowModal(true)}>
              <Text style={{color: '#fff'}}>Add Report</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.accordionButton}
              onPress={endAppointment}>
              <Text style={{color: '#fff'}}>End Appointment</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              // alignSelf: 'center',
            }}>
            <View style={{width: 70, alignSelf: 'center', marginHorizontal: 5}}>
              <TouchableOpacity
                style={styles.accordionButton}
                onPress={onPressEntered}>
                <Text style={{color: '#fff'}}>Entered</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: 70, alignSelf: 'center', marginHorizontal: 5}}>
              <TouchableOpacity
                style={styles.accordionButton}
                onPress={onPressCancel}>
                <Text style={{color: '#fff'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Animatable.View>
    );
  };

  const onPressSave = async () => {
    setShowModal(false);
    try {
      const token = JSON.parse(
        await EncryptedStorage.getItem(Token_Secret),
      ).token;
      console.log(data[0].patients[activeSections[0]].appointmentID);
      await axios
        .post(
          `${Server_URL}:3000/doctor/addReportAndPrescription`,
          {
            appointmentId: data[0].patients[activeSections[0]].appointmentID,
            report: report,
            prescription: prescription,
          },
          {
            headers: {
              'x-auth-token': token,
            },
          },
        )
        .then(response => {
          console.log('here');
          showMessage({
            message: 'Report added',
            type: 'success',
          });
          console.log(response.data);
        })
        .catch(function (error) {
          if (error.response.data == 'no ongoing') {
            showMessage({
              message: 'There are no ongoing appointment',
              type: 'warning',
            });
          }
          console.log(error.response.data);
        });
    } catch (err) {
      Alert.alert('Error', err.code, [
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
      ]);
    }
  };

  return (
    <View>
      <Modal
        visible={showModal}
        transparent
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.centeredView}>
          <FontAwesome
            name={'close'}
            size={20}
            color={'#1c1bad'}
            onPress={() => setShowModal(false)}
            style={{alignSelf: 'flex-start', margin: 5}}></FontAwesome>
          <View style={styles.modalBody}>
            <TextInput
              style={styles.inputFeilds}
              placeholder="Report"
              onChangeText={text => setReport(text)}></TextInput>
            <TextInput
              style={styles.inputFeilds}
              placeholder="Prescription"
              onChangeText={text => setPrescription(text)}></TextInput>
          </View>
          <View style={styles.modalButton}>
            <FontAwesome
              name={'save'}
              size={25}
              color={'#1c1bad'}
              style={{alignSelf: 'center', margin: 5}}
              onPress={onPressSave}></FontAwesome>
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>
        from: {data[0].from} To: {data[0].to}
      </Text>
      <Accordion
        activeSections={activeSections}
        disabled={patientEntered}
        sections={data[0].patients}
        touchableComponent={TouchableOpacity}
        expandMultiple={false}
        renderHeader={renderHeader}
        renderContent={renderContent}
        duration={400}
        onChange={setSections}
        renderAsFlatList={false}
      />
      <FlashMessage position="top" icon="auto" />
    </View>
  );
};

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
  accordionButton: {
    backgroundColor: '#1c1bad',
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  centeredView: {
    height: 350,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    width: '80%',
    marginTop: '30%',
    // margin: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1c1bad',
    shadowOpacity: 1,
    shadowOffset: {
      width: 10,
      height: 15,
    },
    elevation: 10,
    overflow: 'hidden',
    padding: 5,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#00000099',
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
    width: 250,
    height: 100,
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

export default patientAccordion;
