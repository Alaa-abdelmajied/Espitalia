import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret} from '@env';

export default function Report({route}) {
  const {appointmentID} = route.params;

  const [report, setReport] = useState({});

  useEffect(() => {
    const getReport = async () => {
      await axios
        .get(`${Server_URL}:3000/patient/report/${appointmentID}`)
        .then(response => {
          setReport(response.data);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    };
    getReport();
  }, []);

  const [rate, setRate] = useState('');
  const [review, setReview] = useState('');

  const saveReview = async () => {
    const token = JSON.parse(
      await EncryptedStorage.getItem(Token_Secret),
    ).token;
    await axios
      .post(`${Server_URL}:3000/patient/rateAndReview`, {
        review: review,
        rate: rate,
        doctorId: report.drId,
        token: token,
      })
      .then(response => {
        setReport(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const [showModal, setShowModal] = useState(false);

  const onPressSave = () => {
    saveReview();
    setShowModal(false);
    console.log(rate);

  };

  return (
    <ScrollView>
      <Modal visible={showModal} animationType="fade" transparent={true}>
        <View style={styles.modal}>
          <FontAwesome
            name={'close'}
            size={20}
            color={'#1c1bad'}
            onPress={() => setShowModal(false)}
            style={{alignSelf: 'flex-start', margin: 5}}></FontAwesome>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <Rating
              type="star"
              tintColor="#f0f0f0"
              ratingCount={5}
              imageSize={25}
              startingValue={1}
              fractions={1}
              showRating
              onFinishRating={rate => setRate(rate)}
              style={{
                margin: 5,
                backgroundColor: 'transparent',
                fontSize: 15,
              }}></Rating>
            {/* {maxRating.map((item, key) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={key}
                  style={{marginVertical: 5}}
                  onPress={() => setDefaultRating(item)}>
                  <FontAwesome
                    name={item <= defaultRating ? 'star' : 'star-o'}
                    size={25}
                    color="#FDCC0D"
                  />
                </TouchableOpacity>
              );
            })} */}
          </View>
          <View style={styles.modalInput}>
            <TextInput
              placeholder="Write Review"
              multiline={true}
              onChangeText={review => setReview(review)}></TextInput>
          </View>
          <FontAwesome
            name={'save'}
            size={25}
            color={'#1c1bad'}
            style={{alignSelf: 'center', margin: 5}}
            onPress={onPressSave}></FontAwesome>
        </View>
      </Modal>
      <View style={styles.header}>
        <Image
          style={styles.Image}
          source={require('../../images/app_logo-removebg-preview.png')}></Image>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.infoText}>
          Hospital Name: {report.hospitalName}
        </Text>
        <Text style={styles.infoText}>Doctor Name: {report.drName} </Text>
        <Text style={styles.infoText}>
          Specialization: {report.specialization}
        </Text>
        <Text style={styles.infoText}>Date: {report.date} </Text>
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
          <Text style={styles.infoText}>{report.diagnosis}</Text>
        </ScrollView>
      </View>
      <Text style={styles.title}>Prescription</Text>
      <View style={styles.reportCard}>
        <ScrollView>
          <Text style={styles.infoText}>{report.prescription}</Text>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: '60%',
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    width: '80%',
    margin: 10,
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
    backgroundColor: '#fff',
    borderRadius: 15,
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
