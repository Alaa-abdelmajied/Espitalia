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
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';

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
      .get(`${Server_URL}:3000/patient/upcomingAppointment/${token}`)
      .then(response => {
        setUpcomingAppointments(response.data);
        setLoadData(false);
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
          // upcomingAppointments.splice(upcomingAppointments,upcomingAppointments.indexOf(appointmentID));
          // upcomingAppointments.splice();
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
            Alert.alert('Error cancelling appointment');
          }
        });
    } catch (err) {
      Alert.alert('Error', err.code, [
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.Image}
          source={require('../../images/app_logo-removebg-preview.png')}></Image>
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
              <Text style={styles.infoText}>From: {item.from} </Text>
              <Text style={styles.infoText}>Reservation No: {item.resNum}</Text>
            </View>
            <View style={styles.view2}>
              <View style={styles.numberView}>
                <Text style={styles.infoText}>Flow Number</Text>
              </View>
              <Pressable
                style={styles.button}
                onPress={() => cancelAppointment(item.appointmentID)}>
                <Text style={styles.buttonText}>CANCEL</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          loadData ? null : (
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

  appointmentsCard: {
    flexDirection: 'row',
    width: '95%',
    height: 230,
    borderRadius: 15,
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
    flex: 1,
    flexDirection: 'column',
    height: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    // borderWidth: 2,
    // marginTop:'2%',
    // marginBottom: '5%',
    justifyContent: 'center',
    margin: '1%',
    // borderRadius: 5,
  },
  infoText: {
    color: '#000',
    margin: 10,
    fontSize: 15,
  },

  view2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '95%',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: '#0ff'
  },

  numberView: {
    borderColor: '#1c1bad',
    borderWidth: 2,
    width: 160,
    height: 100,
    // marginBottom: 75,
    // margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    // backgroundColor: '#5c9ae0',
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
    width: 160,
    color: '#fff',
  },
});
