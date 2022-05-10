import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable, Image} from 'react-native';
import axios from 'axios';

export default function Reservation({navigation}) {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    const getUpcomingAppointments = async () => {
      await axios
        .get(
          'http://192.168.1.10:3000/patient/upcomingAppointment/626815e4419d4e945c124cf4',
        )
        .then(response => setUpcomingAppointments(response.data))
        .catch(function (error) {
          console.log(error.message);
        });
    };
    getUpcomingAppointments();
  }, []);

  // const [Items, setItems] = useState([
  //   {
  //     key: '1',
  //     Hname: 'Middle East Hospital',
  //     doctor: 'Ahmed',
  //     date: '15/3/2022',
  //     resNum: 1,
  //   },
  //   {
  //     key: '2',
  //     Hname: 'ICC Hospital',
  //     doctor: 'Maram',
  //     date: '16/3/2022',
  //     resNum: 2,
  //   },
  //   {
  //     key: '3',
  //     Hname: 'Al Andalusia Hospital',
  //     doctor: 'Ali',
  //     date: '19/3/2022',
  //     resNum: 3,
  //   },
  //   {
  //     key: '4',
  //     Hname: 'Royal Hospital',
  //     doctor: 'Alaa',
  //     date: '25/3/2022',
  //     resNum: 4,
  //   },
  //   {
  //     key: '5',
  //     Hname: 'German Hospital',
  //     doctor: 'Mayar',
  //     date: '5/4/2022',
  //     resNum: 5,
  //   },
  //   {
  //     key: '6',
  //     Hname: 'Alexandria International Hospital',
  //     doctor: 'Nadeen',
  //     date: '15/4/2022',
  //     resNum: 6,
  //   },
  // ]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.Image}
          source={require('../../images/app_logo-removebg-preview.png')}></Image>
      </View>

      <FlatList
        data={upcomingAppointments}
        // keyExtractor={item => {
        //   return item.appointmentID;
        // }}
        renderItem={({item}) => (
          <View style={styles.appointmentsCard}>
            <View style={styles.infoView}>
              <Text style={styles.infoText}>
                Hospital Name: {item.hospitalName}
              </Text>
              <Text style={styles.infoText}>Doctor Name: {item.drName} </Text>
              <Text style={styles.infoText}>Date: {item.date} </Text>
              <Text style={styles.infoText}>Reservation No: {item.resNum}</Text>
            </View>
            <View style={styles.view2}>
              <View style={styles.numberView}>
                <Text style={styles.infoText}>Flow Number</Text>
              </View>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>CANCEL</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
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
