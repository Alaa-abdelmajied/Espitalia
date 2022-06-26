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

const Item = props => {
  const [showModal, setShowModal] = useState(false);
  const [accept, setAccept] = useState(false);
  const date = new Date(props.item.date);
  return (
    <TouchableOpacity
      style={styles.card}
      disabled={accept}
      onPress={() => setShowModal(true)}>
      <View style={styles.infoView}>
        <Text style={styles.infoText}>
          Hospital Name: {props.item.hospital_Name}
        </Text>
        <Text style={styles.infoText}>Blood Type: {props.item.bloodType} </Text>
        <Text style={styles.infoText}>Date : {date.toDateString()} </Text>
        <Text style={styles.infoText}>Time : {date.toLocaleTimeString()} </Text>
        {accept ? (
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <FontAwesome
              name={'phone'}
              size={20}
              color={'#4BB543'}
              style={{marginVertical: 10}}></FontAwesome>
            <Text style={styles.infoText}>
              01223109302 - donate within 2 hours
            </Text>
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
              setShowModal(false);
              // setDial(true);
              setAccept(true);
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    width: '95%',
    height: 230,
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
    margin: '1%',
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
