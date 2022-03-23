import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable
} from 'react-native';

export default function Profile() {

  const [Items, setItems] = useState([
    { key: '1', Hname: 'Middle East Hospital', doctor: "Ahmed", date: "15/3/2022", resNum: 1 },
    { key: '2', Hname: 'ICC Hospital', doctor: "Maram", date: "16/3/2022", resNum: 2 },
    { key: '3', Hname: 'Al Andalusia Hospital', doctor: "Ali", date: "19/3/2022", resNum: 3 },
    { key: '4', Hname: 'Royal Hospital', doctor: "Alaa", date: "25/3/2022", resNum: 4 },
    { key: '5', Hname: 'German Hospital', doctor: "Mayar", date: "5/4/2022", resNum: 5 },
    { key: '6', Hname: 'Alexandria International Hospital', doctor: "Nadeen", date: "15/4/2022", resNum: 6 },
    // { key: '7', Hname: 'Item 7', doctor: "Omar", date: "15/3/2022", resNum: 7 },
    // { key: '8', Hname: 'Item 8', doctor: "John", date: "15/3/2022", resNum: 8 },
    // { key: '9', Hname: 'Item 999', doctor: "Jessica", date: "15/3/2022", resNum: 9 },
    // { key: '10', Hname: 'Item 999', doctor: "Mohamed", date: "15/3/2022", resNum: 9 },

  ])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>Alaa Abdelmajied</Text>
          <Text style={styles.subtitle}>BASIC DATA</Text>
          <View style={styles.description}>
            {/* <Text style={styles.mainText}>Name: Maram Ghazal</Text> */}
            <Text style={styles.mainText}>Email: alaa@gmail.com</Text>
            <Text style={styles.mainText}>Username: alaa_300 </Text>
            <Text style={styles.mainText}>Age: 22</Text>
            <Text style={styles.mainText}>Diabetic: No</Text>
            <Text style={styles.mainText}>Allergic: No</Text>
          </View>
          <View style={styles.lineStyle} />
          <Text style={styles.subtitle}>OLD RESERVATIONS</Text>
          {Items.map((item, itemIndex) => {
            return (
              <TouchableOpacity style={styles.appointmentsCard} key={itemIndex}>
                {/* <View style={styles.infoView}> */}
                <Text style={styles.infoText}>Hospital Name: {item.Hname} </Text>
                {/* <View style={styles.lineStyle} /> */}
                <Text style={styles.infoText}>Doctor Name: {item.doctor} </Text>
                {/* <View style={styles.lineStyle} /> */}
                <Text style={styles.infoText}>Date: {item.date} </Text>
                {/* <View style={styles.lineStyle} /> */}
                {/* <Text style={styles.infoText}>Reservation Number: {item.resNum} </Text> */}
                {/* </View> */}
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#fff'
  },
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
  subtitle: {
    fontSize: 16,
    color: "#0d259e",
    marginTop: 10,
    marginBottom: 5,
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
    margin: 5,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
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