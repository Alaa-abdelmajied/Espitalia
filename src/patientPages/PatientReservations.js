import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  Alert,
  BackHandler,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AwesomeAlert from 'react-native-awesome-alerts';

import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import {Server_URL, Token_Secret} from '@env';
import {useIsFocused} from '@react-navigation/native';

export default function Reservation({}) {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const isFocused = useIsFocused();

  const getUpcomingAppointments = async () => {
    const token = JSON.parse(
      await EncryptedStorage.getItem(Token_Secret),
    ).token;
    await axios
      .get(`${Server_URL}:3000/patient/upcomingAppointment`, {
        headers: {
          'x-auth-token': token,
        },
      })
      .then(response => {
        setUpcomingAppointments(response.data);
        setLoadData(false);
        console.log('done');
      })
      .catch(function (error) {
        console.log(error.message);
        setLoadData(false);
      });
  };

  useEffect(() => {
    setLoadData(true);
    if (isFocused) {
      getUpcomingAppointments();
    } else {
      setUpcomingAppointments([]);
    }
  }, [isFocused]);

  const cancelAppointment = appointmentID => {
    // setRefreshFlatList(!refreshFlatlist);
    console.log(appointmentID);
    console.log('pressed');
    try {
      axios
        .delete(`${Server_URL}:3000/patient/cancel/${appointmentID}`)
        .then(function (response) {
          console.log(appointmentID);
          <View style={styles.loadingIcon}>
            <ActivityIndicator size="large" color="#0451cc" />
          </View>;
          showMessage({
            message: 'Appointment cancelled successfully',
            type: 'success',
          });
          // Alert.alert('Appointment cancelled successfully');
          getUpcomingAppointments();
        })
        .catch(function (error) {
          const err = error.response.data;
          console.log(err);
          if (err == 'Error cancelling appointment') {
            showMessage({
              message: err,
              type: 'warning',
            });
          }
        });
    } catch (err) {
      Alert.alert('Error', err.code, [
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
      ]);
    }
  };

  const alert = () => {
    setShowAlert(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.Image}
          source={require('../../images/app_logo-removebg-preview.png')}></Image>
        <Text style={styles.headerText}>espitalia</Text>
      </View>
      <FlatList
        extraData={upcomingAppointments}
        data={upcomingAppointments}
        keyExtractor={(item, index) => index.toString()}
        // return item.appointmentID;
        renderItem={({item}) => (
          <View style={styles.appointmentsCard}>
            <View style={styles.infoView}>
              <Text style={styles.infoText}>Hospital: {item.hospitalName}</Text>
              <Text style={styles.infoText}>Doctor: {item.drName} </Text>
              <Text style={styles.infoText}>Date: {item.date} </Text>
              <Text style={styles.infoText}>
                Time: {item.from} - {item.to}
              </Text>
              <Text style={styles.infoText}>Reservation No: {item.resNum}</Text>
            </View>
            <View style={styles.lineStyle} />

            <View style={styles.cancelView}>
              <View
                style={[
                  styles.flowNumberView,
                  // {backgroundColor: item.entered ? '#299e29' : '#299e29'},
                ]}>
                <Text style={styles.infoText}>Flow Number</Text>
                <View
                  style={[
                    styles.numberView,
                    {backgroundColor: item.entered ? '#00ff00' : '#ff0000'},
                  ]}>
                  <Text
                    style={{
                      color: item.entered ? '#000' : '#fff',
                      alignSelf: 'center',
                    }}>
                    {item.currentFlowNumber}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => cancelAppointment(item.appointmentID)}>
                {/* <View style={styles.loadingIcon}>
                  <ActivityIndicator size="large" color="#0451cc" />
                </View> */}
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          loadData ? (
            <View>
              <ActivityIndicator size="large" color="#0451cc" />
            </View>
          ) : (
            <Text
              style={{
                fontSize: 20,
                alignSelf: 'center',
                color: '#000',
                margin: '10%',
              }}>
              No upcoming reservations :)
            </Text>
          )
        }
      />
      <FlashMessage position="top" icon="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.5,
    borderColor: '#000',
    backgroundColor: '#000',
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
  },

  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#1c1bad',
    justifyContent: 'center',
  },

  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  Image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },

  appointmentsCard: {
    flexDirection: 'row',
    width: '95%',
    height: 230,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#1c1bad',
    backgroundColor: '#fff',
    alignSelf: 'center',
    // marginLeft: 10,
    // margin: '1%',
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
    flex: 2,
    flexDirection: 'column',
    height: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    // borderWidth: 2,
    // marginTop:'2%',
    // marginBottom: '5%',
    justifyContent: 'center',
    margin: 2,
    // borderRadius: 5,
  },

  infoText: {
    color: '#000',
    margin: 10,
    fontSize: 15,
  },

  lineStyle: {
    width: 1,
    height: '95%',
    borderWidth: 0.5,
    borderColor: '#1c1bad',
    margin: '2%',
    alignSelf: 'center',
    backgroundColor: '#1c1bad',
  },

  cancelView: {
    flex: 1,
    width: '99%',
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '95%',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: '#0ff'
  },

  flowNumberView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  numberView: {
    width: 40,
    height: 40,
    borderRadius: 60,
    justifyContent: 'center',
    margin: 5,
    borderColor: '#1c1bad',
    borderWidth: 3,
  },

  buttonText: {
    color: '#fff',
    margin: 15,
    fontSize: 15,
  },

  button: {
    backgroundColor: '#1c1bad',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: '100%',
    color: '#fff',
  },

  loadingIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
