import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
  SectionList,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret, Credintials_Secret} from '@env';

export default function PatientHistory({navigation, route}) {
  const {patientId, patientName} = route.params;
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    await axios
      .get(`${Server_URL}:3000/doctor/getPatientHistory/${patientId}`)
      .then(response => {
        setHistory(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  return loading ? (
    <View style={styles.loadingIcon}>
      <ActivityIndicator size="large" color="#0451cc" />
    </View>
  ) : (
    <View style={{flex: 1}}>
      {/* <View style={styles.header_}>
        <Image
          style={styles.Image}
          source={require('../../images/app_logo-removebg-preview.png')}></Image>
      </View> */}
      <View style={styles.header}>
        <TouchableOpacity
          style={{flex: 1, alignSelf: 'center', marginLeft: 5}}
          onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={30} color="#fff"></Ionicons>
        </TouchableOpacity>
        <View
          style={{flex: 12, flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            style={styles.image}
            source={require('../../images/app_logo-removebg-preview.png')}></Image>

          <Text style={styles.headerText}>espitalia</Text>
        </View>
      </View>
      <Text style={styles.title}>Medical History of {patientName}</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={history}
        renderItem={({item}) => (
          <View style={styles.historyCard}>
            <Text style={styles.text}>Doctor: {item.doctorName}</Text>
            <Text style={styles.text}>
              Specialization: {item.specialization}
            </Text>
            <Text style={styles.text}>Report: {item.report}</Text>
            <Text style={styles.text}>Prescription: {item.prescription}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  header: {
    // flex: 1,
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#1c1bad',
    justifyContent: 'center',
    // position: 'absolute',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
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
    fontSize: 20,
    // fontStyle: 'italic',
    margin: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
    color: 'bold',
    color: '#000',
    margin: 8,

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
  },
});
