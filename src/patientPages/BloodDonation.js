
import React, { useState } from 'react';
import {

  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  SectionList,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable
} from 'react-native';

export default function DonateBlood({ navigation }) {
  const [Items, setItems] = useState([
    { key: '1', Hname: 'Middle East Hospital ', bloodType: "A+", amountNeeded: "1L" },
    { key: '2', Hname: 'ICC Hospital', bloodType: "AB+", amountNeeded: "1L" },
    { key: '3', Hname: 'German Hospital', bloodType: "O-", amountNeeded: "2L" },
    { key: '4', Hname: 'Royal Hospital', bloodType: "O+", amountNeeded: "0.6L" },
    { key: '5', Hname: 'Alex Scan', bloodType: "B-", amountNeeded: "3L" },
    { key: '6', Hname: 'Bet El Ne3ma', bloodType: "AB-", amountNeeded: "0.5L" },
    { key: '7', Hname: 'Al Andalusia Hospital', bloodType: "A-", amountNeeded: "1L" },

  ])


  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Image style={styles.Image} source={require('../../images/app_logo-removebg-preview.png')}></Image>
      </View> */}
      <FlatList
        data={Items}
        renderItem={({ item }) => (
          <View style={styles.appointmentsCard}>
            <View style={styles.infoView}>
              <Text style={styles.infoText}>Hospital Name: {item.Hname} </Text>
              <Text style={styles.infoText}>Blood Type: {item.bloodType} </Text>
              <Text style={styles.infoText}>Amount Needed : {item.amountNeeded} </Text>
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
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },

  appointmentsCard: {
    flexDirection: 'column',
    width: '95%',
    height: 230,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignSelf: 'center',
    margin: '1.5%',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
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
    backgroundColor: '#0d159e',
    justifyContent: 'center'
  },

  Image: {
    width: 50,
    height: 50,
    alignSelf: 'center'
    // marginTop:10,
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    margin:'2%', 
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
    color: '#fff'
  }
})
