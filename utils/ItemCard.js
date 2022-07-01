import React, {memo, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Modal,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dialog from 'react-native-dialog';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret} from '@env';

const Item = props => {
  const [showModal, setShowModal] = useState(false);
  const [accept, setAccept] = useState(props.item.accepted);
  const [alert, setAlert] = useState(false);

  const showAlert = () => {
    setAlert(true);
  };
  const hideAlert = () => {
    setAlert(false);
  };

  const date = new Date(props.item.date);

  const acceptRequest = async () => {
    console.log(props.item.id);
    setShowModal(false);
    showAlert();
    // setDial(true);
    setAccept(true);
    const token = JSON.parse(
      await EncryptedStorage.getItem(Token_Secret),
    ).token;
    console.log(token);
    await axios
      .post(`${Server_URL}:3000/patient/accept/${props.item.id}`, null, {
        headers: {
          'x-auth-token': token,
        },
      })
      .then(response => {
        console.log('accepted');
        hideAlert();
        showMessage({
          message: 'Blood request accepted successfully',
          type: 'success',
          duration: 4000,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (accept) {
          showMessage({
            message: 'You already accepted this request',
            type: 'warning',
            duration: 4000,
          });
        } else {
          setShowModal(true);
        }
      }}>
      <View style={styles.infoView}>
        <Text style={styles.infoText}>
          Hospital Name: {props.item.hospital_Name}
        </Text>
        <Text style={styles.infoText}>
          Hospital Address: {props.item.hospitalAddress}
        </Text>
        <Text style={styles.infoText}>Blood Type: {props.item.bloodType} </Text>
        <Text style={styles.infoText}>Date: {date.toDateString()} </Text>
        <Text style={styles.infoText}>Time: {date.toLocaleTimeString()} </Text>
        {accept ? (
          <View style={{alignSelf: 'center'}}>
            <FontAwesome
              name={'check-circle'}
              size={30}
              color={'#4BB543'}
              onPress={() => setShowModal(false)}
              style={{
                alignSelf: 'flex-start',
                marginBottom: 10,
                alignSelf: 'center',
              }}></FontAwesome>
          </View>
        ) : null}
      </View>
      <Dialog.Container contentStyle={styles.modal} visible={showModal}>
        <Dialog.Title style={styles.modalText}>Blood Request</Dialog.Title>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Dialog.Button
            label="Accept"
            onPress={() => {
              acceptRequest();
            }}
            style={{color: '#4BB543', fontWeight: 'bold'}}
          />
          <Dialog.Button
            label="Ignore"
            onPress={() => setShowModal(false)}
            style={{color: '#ff0000', fontWeight: 'bold'}}
          />
        </View>
      </Dialog.Container>
      <AwesomeAlert
        show={alert}
        showProgress={true}
        title="Saving changes"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
      />
      {/* <FlashMessage position="top" icon="auto" /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    width: '95%',
    height: 270,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignSelf: 'center',
    margin: 4,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
    overflow: 'hidden',
  },

  infoView: {
    flex: 1,
    flexDirection: 'column',
    height: '90%',
    alignSelf: 'center',
    // backgroundColor: '#fff',
    // marginTop:'2%',
    // marginBottom: '5%',
    justifyContent: 'center',
    margin: 5,
  },
  infoText: {
    color: '#000',
    margin: 10,
    fontSize: 15,
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2%',
  },
  buttonText: {
    color: '#fff',
    margin: 15,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#0d259e',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 160,
    color: '#fff',
  },

  modal: {
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 10,
      height: 15,
    },
    elevation: 10,
    overflow: 'hidden',
  },

  modalText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
});

export default memo(Item);
