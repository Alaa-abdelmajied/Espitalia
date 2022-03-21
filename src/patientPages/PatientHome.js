import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  SectionList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import { SearchBar } from 'react-native-elements';
//type SearchBarComponentProps = {};

export default function PatientHome({ navigation }) {
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'
  const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'


  const onPressHospitals = () => {
    navigation.navigate('SpecializationScreen');
  };

  const onPressDoctors = () => {
    navigation.navigate('DoctorDetails');
  };

  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  const doctors = [
    { key: 1, drName: 'Maram Ghazal', speciality: 'Dermatologist', hName: 'Al Andalusia Hospital', address: '6 smouha st.', color: "#0d159e" },
    { key: 2, drName: 'Ali Ghazal', speciality: 'Psychiatrist', hName: 'German Hospital', address: '6 gleem st.', color: "#0d369e" },
    { key: 3, drName: 'Mayar Adel', speciality: 'Dentist', hName: 'Royal Hospital', address: '6 ibrahmia st.', color: "#0d589e" },
    { key: 4, drName: 'Omar Shalaby', speciality: 'Cardiologist', hName: 'Alex Hospital', address: '6 camp shizar st.', color: "#0d789e" },
    { key: 5, drName: 'Nadeen Elgazar', speciality: 'Gynaecologist', hName: 'ICC Hospital', address: '6 smouha st.', color: "#0d899e" },
  ]


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.Image} source={require('../../images/app_logo-removebg-preview.png')}></Image>
        <Text style={styles.headerText}>espitalia</Text>
      </View>

      <View style={styles.hospitalScroll}></View>

      <Text style={styles.titleText}> Hospitals</Text>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
      >
        {doctors.map((card, cardIndex) => {
          return (
            <TouchableOpacity style={styles.cards} key={cardIndex} onPress={onPressHospitals}>
              <View style={styles.card_header}>
                <View style={styles.textView}>
                  <Text style={styles.name}> {card.hName} </Text>
                </View>
              </View>
              <View style={styles.hospital_content}>
                <Image style={styles.hospitalImg} source={{ uri: 'https://d2tm09s6lgn3z4.cloudfront.net/2016/07/PZUMOwhs-1468329684_762_86406_-512x435.png' }}></Image>
                <Text style={styles.hospital}>Info about the hospital</Text>
              </View>
            </TouchableOpacity>
          );
        })}

      </ScrollView>
      <View style={styles.lineStyle} />
      <View style={styles.doctorsScroll}>
        <Text style={styles.titleText}> Top Doctors</Text>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {doctors.map((card, cardIndex) => {
            return (
              <TouchableOpacity style={styles.cards} key={cardIndex} onPress={onPressDoctors}>
                <View style={styles.card_header}>
                  <Image style={styles.doctorImg} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}></Image>
                  <View style={styles.textView}>
                    <Text style={styles.name}>Dr. {card.drName} </Text>
                    <Text style={styles.speciality}>{card.speciality}</Text>
                  </View>
                </View>
                <View style={styles.card_content}>
                  <View style={styles.place}>
                    <Image style={styles.icon} source={require('../../images/hospital.png')}></Image>
                    <Text style={styles.hospital}>{card.hName}</Text>
                  </View>
                  <View style={styles.place}>
                    <Image style={styles.icon} source={require('../../images/location.png')}></Image>
                    <Text style={styles.hospital}>{card.address}</Text>
                  </View>
                  <View style={styles.customRatingBar}>
                    {
                      maxRating.map((item, key) => {
                        return (
                          <TouchableOpacity activeOpacity={0.7}
                            key={item}
                            onPress={() => setDefaultRating(item)}>
                            <Image style={styles.starImg} source={item <= defaultRating ? { uri: starImgFilled } : { uri: starImgCorner }}></Image>
                            {/* <Text> Rate is {item} / 5</Text> */}
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* <TouchableOpacity style={styles.buttonContainer}>
          <Text>specialization{"\n"}Doctor{"\n"}Hospital {"\n"}Date </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text>specialization{"\n"}Doctor{"\n"}Hospital {"\n"}Date </Text>
        </TouchableOpacity> */}
        </ScrollView>

      </View>
    </View >

  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    // backgroundColor:'#000',
    height: '100%',
    // margin: 10,
  },

  lineStyle: {
    borderWidth: 0.5,
    borderColor: '#000',
    margin: '2%',
    backgroundColor: '#000'
  },

  hospitalScroll: {
    // flex: 1,
    flexDirection: 'column',
  },

  doctorsScroll: {
    // flex: 1,
    flexDirection: 'column',

  },


  header: {
    // flex: 1,
    flexDirection: 'row',
    height: '7%',
    backgroundColor: '#0d259e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    margin: '3%'
  },

  Image: {
    width: 50,
    height: 50,
    alignSelf: 'center'
    // marginTop:10,
  },

  cards: {
    // marginTop: 10,

    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 20,
    width: 250,
    height: 230,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: "#fff",
    margin: 5,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    // marginleft: 10,
    // marginRight: 10,
  },

  hospital_content: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 20,
  },
  hospitalImg: {

    width: 100,
    height: 90,
    // margin: 5,


  },
  avatar: {
    width: '40%',
    height: 130,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 20,
    alignSelf: 'stretch',
    position: 'relative',
    marginTop: 40,
    marginRight: 100

  },


  /****************_MARAM_************/



  card: {
    flexDirection: 'column',
    width: 250,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    height: 230,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    marginLeft: '2%'
    // alignSelf: 'center'
  },

  card_header: {
    flexDirection: 'row',
    width: '100%',
    height: '30%',
    backgroundColor: '#0d259e',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  doctorImg: {
    width: 50,
    height: 50,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff',
    // margin: '2%',
  },

  textView: {
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center'
  },

  name: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  speciality: {
    color: '#fff',
    fontSize: 13,
  },
  card_content: {
    height: '100%',
    width: '100%',
  },
  place: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    margin: '3%',
  },
  hospital: {
    color: '#000',
    fontSize: 15,
    margin: 5,
  },
  customRatingBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    // marginTop: 10,
    // alignItems: 'center',


  },

  starImg: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },

  titleText: {
    color: '#000',
    margin: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },

});