import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Report({navigation}) {
  const [details, setDetails] = useState({
    specialization: 'Chest',
    doctor: 'Ahmed',
    hospital: 'Middle East Hospital',
    date: '15/3/2022',
    diagnosis:
      'Chronic Obstructive pulmonary disease, some of your airways are blocked making it hard for you to breathe',
    prescription:
      'Do not smoke. Avoid smoke, pollution, and extreme changes in temperature and humidity. Rest as needed.',
  });

  const [showModal, setShowModal] = useState(false);
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  return (
    <ScrollView>
      <Modal visible={showModal} animationType="fade" transparent={true}>
        <View style={styles.modal}>
          <FontAwesome
            name={'close'}
            size={25}
            color={'#1c1bad'}
            onPress={() => setShowModal(false)}
            style={{alignSelf: 'flex-start', margin: 5}}></FontAwesome>
          <View
            style={{
              flexDirection: 'row',
            }}>
            {maxRating.map((item, key) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={key}
                  onPress={() => setDefaultRating(item)}>
                  <FontAwesome
                    name={item <= defaultRating ? 'star' : 'star-o'}
                    size={25}
                    color="#FDCC0D"
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.modalInput}>
            <TextInput placeholder="Write Review" multiline={true}></TextInput>
          </View>
          <FontAwesome
            name={'save'}
            size={25}
            color={'#1c1bad'}
            style={{alignSelf: 'center', marginTop: -30}}
            onPress={() => setShowModal(false)}></FontAwesome>
        </View>
      </Modal>
      <View style={styles.header}>
        <Image
          style={styles.Image}
          source={require('../../images/app_logo-removebg-preview.png')}></Image>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.infoText}> Hospital Name: {details.hospital} </Text>
        <Text style={styles.infoText}>Doctor Name: {details.doctor} </Text>
        <Text style={styles.infoText}>
          Specialization : {details.specialization}{' '}
        </Text>
        <Text style={styles.infoText}>Date : {details.date} </Text>
        <Pressable
          style={styles.modalButton}
          onPress={() => setShowModal(true)}>
          <Text style={styles.modalText}>Rate and Review</Text>
        </Pressable>
      </View>
      <View style={styles.lineStyle} />
      <Text style={styles.title}>Diagnosis</Text>
      <View style={styles.reportCard}>
        <ScrollView>
          <Text style={styles.infoText}>{details.diagnosis} </Text>
        </ScrollView>
      </View>
      <Text style={styles.title}>Prescription</Text>
      <View style={styles.reportCard}>
        <ScrollView>
          <Text style={styles.infoText}>{details.prescription} </Text>
        </ScrollView>
      </View>
      {/* <Pressable style={styles.modalButton} onPress={() => setShowModal(true)}>
        <Text style={styles.modalText}>Rate and Review</Text>
      </Pressable> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: 250,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: 300,
    margin: 300,
    alignSelf: 'center',
    // justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 10,
      height: 20,
    },
    elevation: 10,
    overflow: 'hidden',
  },

  reportCard: {
    flexDirection: 'column',
    width: '95%',
    height: 180,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignSelf: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
    overflow: 'hidden',
  },

  modalButton: {
    backgroundColor: '#1c1bad',
    borderRadius: 5,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    // marginBottom: 20,
  },

  modalInput: {
    height: '70%',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
  },

  title: {
    fontSize: 20,
    color: '#1c1bad',
    margin: 10,
    fontWeight: 'bold',
  },

  infoText: {
    color: '#000',
    margin: 5,
    fontSize: 15,
  },

  header: {
    height: '8%',
    backgroundColor: '#0d159e',
    justifyContent: 'center',
  },
  Image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },

  lineStyle: {
    borderWidth: 0.5,
    borderColor: '#000',
    margin: 8,
    backgroundColor: '#000',
  },
});
