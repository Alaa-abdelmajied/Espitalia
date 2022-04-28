import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Profile({ navigation }) {

  const onPressReport = () => {
    navigation.navigate('Report');
  };

  const [Items, setItems] = useState([
    { key: '1', Hname: 'Middle East Hospital', doctor: "Ahmed", specialization: "Chest", date: "15/3/2022", resNum: 1 },
    { key: '2', Hname: 'ICC Hospital', doctor: "Maram", specialization: "physiotherapy", date: "16/3/2022", resNum: 2 },
    { key: '3', Hname: 'Al Andalusia Hospital', doctor: "Ali", specialization: "cardiology", date: "19/3/2022", resNum: 3 },
    { key: '4', Hname: 'Royal Hospital', doctor: "Alaa", specialization: "allergy", date: "25/3/2022", resNum: 4 },
    { key: '5', Hname: 'German Hospital', doctor: "Mayar", specialization: "chest", date: "5/4/2022", resNum: 5 },
    { key: '6', Hname: 'Alexandria International Hospital', doctor: "Nadeen", specialization: "dermatology", date: "15/4/2022", resNum: 6 },

  ])

  // const [showModal, setShowModal] = useState(false);

  // const onPress = () => {
  //   setShowModal(false)
  // }

  return (
    <ScrollView>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
      <View style={{ position: "absolute", alignSelf: 'flex-end', marginTop: 15 }}>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={30} color="#fff"></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>Ahmed Mohamed</Text>
          <Text style={styles.subtitle}>BASIC DATA</Text>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <FontAwesome name="edit" size={25} color="#000"></FontAwesome>
            <Text style={{ fontSize: 15, color: '#000', alignSelf: 'center', marginHorizontal: 5 }}>Edit</Text>

          </TouchableOpacity>
          <View style={styles.description}>
            <Text style={styles.mainText}>Email: ahmed.mo@gmail.com</Text>
            <Text style={styles.mainText}>Username: ahmed_99 </Text>
            <Text style={styles.mainText}>Age: 22</Text>
            <Text style={styles.mainText}>Blood Type: A+</Text>
            <Text style={styles.mainText}>Diabetic: No</Text>
            <Text style={styles.mainText}>Diabetic: No</Text>
            <Text style={styles.mainText}>Blood Pressure Problems: No</Text>
          </View>
          <View style={styles.lineStyle} />
          <Text style={styles.subtitle}>OLD RESERVATIONS</Text>
          {Items.map((item, itemIndex) => {
            return (
              <TouchableOpacity style={styles.appointmentsCard} key={itemIndex} onPress={onPressReport}>
                <Text style={styles.infoText}>Hospital Name: {item.Hname} </Text>
                <Text style={styles.infoText}>Doctor Name: {item.doctor} </Text>
                <Text style={styles.infoText}>Specialization: {item.specialization} </Text>
                <Text style={styles.infoText}>Date: {item.date} </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </ScrollView >
  );

}

const styles = StyleSheet.create({

  header: {
    backgroundColor: "#0d259e",
    height: 100,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 40
  },
  mainText: {
    margin: '1%',
    color: '#000',
    fontSize: 18
  },

  name: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  dataView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: "#0d259e",
    margin: 5,
    // marginTop: 10,
    // marginBottom: 5,
    fontWeight: 'bold'

  },
  description: {
    fontSize: 16,
    color: "#696969",
    //marginTop:10,
    // marginRight: 200,
    // textAlign: 'center',
    alignContent: 'center',
    // alignItems: 'flex-start'
  },
  lineStyle: {
    width: 300,
    borderWidth: 0.5,
    borderColor: '#000',
    margin: '2%',
    backgroundColor: '#000'
  },

  appointmentsCard: {
    // flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'flex-start',
    // marginBottom: 10,
    width: '95%',
    height: 230,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignSelf: 'center',
    // marginLeft: 10,
    margin: 4,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
    overflow: 'hidden',
    // margin: '2%'
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
});