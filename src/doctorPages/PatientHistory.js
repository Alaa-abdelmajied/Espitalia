import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
  SectionList,
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Server_URL, Token_Secret, Credintials_Secret } from '@env';

export default function PatientHistory({ route }) {

  const { patientId, patientName } = route.params;
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory();
  }, [])

  const getHistory = async () => {
    await axios
      .get(
        `${Server_URL}:3000/doctor/getPatientHistory/${patientId}`,
      )
      .then(response => {
        setHistory(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  return (
    loading ?
      <View style={styles.loadingIcon}>
        <ActivityIndicator size="large" color="#0451cc" />
      </View> :
      <View style={{ flex: 1 }}>
        <View style={styles.header_}>
          <Image style={styles.Image} source={require('../../images/app_logo-removebg-preview.png')}></Image>
        </View>
        <Text style={styles.title}>Medical History of {patientName}</Text>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={history}
          renderItem={({ item }) => (
            <View style={styles.historyCard}>
              <Text style={styles.text}>Doctor: {item.doctorName}</Text>
              <Text style={styles.text}>Specialization: {item.specialization}</Text>
              <Text style={styles.text}>Report: {item.report}</Text>
              <Text style={styles.text}>Prescription: {item.prescription}</Text>
            </View>
          )}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  header_: {
    height: '8%',
    backgroundColor: '#0d159e',
    justifyContent: 'center'
  },

  Image: {
    width: 50,
    height: 50,
    alignSelf: 'center'
    // marginTop:10,
  },
  item: {
    margin: 10,
    borderRadius: 12,
    backgroundColor: '#0d159e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 25,
    // fontStyle: 'italic',
    margin: 10,
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
  historyCard: {
    width: '95%',
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
  loadingIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});