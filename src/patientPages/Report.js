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
  ActivityIndicator,
} from 'react-native';

import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {Rating} from 'react-native-ratings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret} from '@env';
import {useIsFocused} from '@react-navigation/native';

export default function Report({navigation, route}) {
  const {appointmentID, reviewed} = route.params;

  const [report, setReport] = useState({});
  const [loadData, setLoadData] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setLoadData(true);
      const getReport = async () => {
        await axios
          .get(`${Server_URL}:3000/patient/report/${appointmentID}`)
          .then(response => {
            setReport(response.data);
            setLoadData(false);
          })
          .catch(function (error) {
            console.log(error.message);
            setLoadData(false);
          });
      };
      getReport();
    }
  }, [report.reviewed]);

  const [rate, setRate] = useState('');
  const [review, setReview] = useState('');

  const saveReview = async () => {
    const token = JSON.parse(
      await EncryptedStorage.getItem(Token_Secret),
    ).token;
    await axios
      .post(
        `${Server_URL}:3000/patient/rateAndReview`,
        {
          review: review,
          rate: rate,
          doctorId: report.drId,
          appointmentID: appointmentID,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        },
      )
      .then(response => {
        showMessage({
          message: 'Review done',
          type: 'success',
        });
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

  const onPressRateAndReview = () => {
    if (report.reviewed) {
      showMessage({
        message: 'This appointment has already been reviewed',
        type: 'warning',
      });
    } else {
      setShowModal(true);
    }
  };

  return loadData ? (
    <View style={styles.loadingIcon}>
      <ActivityIndicator size="large" color="#0451cc" />
    </View>
  ) : (
    <ScrollView>
      <Modal visible={showModal} animationType="fade" transparent={true}>
        <View style={styles.modal}>
          <FontAwesome
            name={'close'}
            size={20}
            color={'#1c1bad'}
            onPress={() => setShowModal(false)}
            style={{alignSelf: 'flex-start', margin: 5}}></FontAwesome>
          {/* <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
            }}> */}
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
          {/* </View> */}
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
        <Pressable
          style={{flex: 1, alignSelf: 'center', marginLeft: 5}}
          onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={30} color="#fff"></Ionicons>
        </Pressable>
        <View style={{flex: 12, justifyContent: 'center'}}>
          <Image
            style={styles.Image}
            source={require('../../images/app_logo-removebg-preview.png')}></Image>
        </View>
        <View style={{flex: 1}}></View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.infoText}>Doctor: {report.drName} </Text>
        <Text style={styles.infoText}>
          Specialization: {report.specialization}
        </Text>
        <Text style={styles.infoText}>Hospital: {report.hospitalName}</Text>
        <Text style={styles.infoText}>Date: {report.date} </Text>
        <TouchableOpacity
          // visible={showReviewButton}
          style={styles.modalButton}
          onPress={onPressRateAndReview}>
          <Text style={styles.modalText}>Rate and Review</Text>
        </TouchableOpacity>
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
      <FlashMessage position="top" icon="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modal: {
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
    height: '50%',
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
    // justifyContent: 'center',
    flexDirection: 'row',
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
  loadingIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
