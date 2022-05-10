import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import axios from 'axios';

export default function DonateBlood({navigation}) {
  const [bloodRequests, setBloodRequests] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      await axios
        .get('http://192.168.1.10:3000/patient/getBloodRequests')
        .then(response => setBloodRequests(response.data))
        .catch(function (error) {
          console.log(error.message);
        });
    };
    getRequests();
  }, []);

  // const [Items, setItems] = useState([
  //   {
  //     key: '1',
  //     Hname: 'Middle East Hospital ',
  //     bloodType: 'A+',
  //     date: '22/3/2022',
  //   },
  //   {key: '2', Hname: 'ICC Hospital', bloodType: 'AB+', date: '25/3/2022'},
  //   {key: '3', Hname: 'German Hospital', bloodType: 'O-', date: '28/3/2022'},
  //   {key: '4', Hname: 'Royal Hospital', bloodType: 'O+', date: '13/4/2022'},
  //   {key: '5', Hname: 'Alex Scan', bloodType: 'B-', date: '13/4/2022'},
  //   {key: '6', Hname: 'Bet El Ne3ma', bloodType: 'AB-', date: '20/4/2022'},
  //   {
  //     key: '7',
  //     Hname: 'Al Andalusia Hospital',
  //     bloodType: 'A-',
  //     date: '25/4/2022',
  //   },
  // ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={bloodRequests}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={({item}) => (
          <View style={styles.appointmentsCard}>
            <View style={styles.infoView}>
              <Text style={styles.infoText}>
                Hospital Name: {item.hospital_Name}{' '}
              </Text>
              <Text style={styles.infoText}>Blood Type: {item.bloodType} </Text>
              <Text style={styles.infoText}>Date : {item.quantity} </Text>
            </View>
            <View style={styles.buttonView}>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>ACCEPT</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  appointmentsCard: {
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
  header: {
    height: '8%',
    backgroundColor: '#1c1bad',
    justifyContent: 'center',
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
});
