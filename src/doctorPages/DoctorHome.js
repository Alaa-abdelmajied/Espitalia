import React, {useState, useEffect} from 'react';
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
  Alert,
  FlatList,
  BackHandler,
} from 'react-native';
import PatientAccordion from '../../utils/PatientsAccordion';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret, Credintials_Secret} from '@env';

export default function DoctorHome({navigation}) {
  const [currentAppointments, setCurrentAppointment] = useState([]);
  const [alert, setAlert] = useState(false);

  showAlert = () => {
    setAlert(true);
  };
  hideAlert = () => {
    setAlert(false);
  };

  useEffect(() => {
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
            console.log(response.data);
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
    getCurrentAppointments();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header_}>
        <Image
          style={styles.Image}
          source={require('../../images/app_logo-removebg-preview.png')}></Image>
      </View>
      <Text style={styles.title}>Today's appointments</Text>
      <FlatList
        data={currentAppointments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => (
          <View>
            <PatientAccordion
              item={item.item}
              navigation={navigation}
              entered={item.item.entered}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text
            style={{
              fontSize: 20,
              alignSelf: 'center',
              color: '#000',
              margin: '10%',
            }}>
            No appointments for today :)
          </Text>
        }
      />
      {/* <AwesomeAlert
        show={alert}
        showProgress={true}
        title="Saving report"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
      /> */}
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
