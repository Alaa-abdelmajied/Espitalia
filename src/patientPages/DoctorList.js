import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,

} from 'react-native';
import DoctorsCard from '../../utils/DoctorsCard'
import { SearchBar } from 'react-native-elements';


export default function Doctors({ navigation }) {

  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };


  const doctors = [
    { key: 1, drName: 'Alaa Abdelmajied', speciality: 'Dermatologist', hName: 'Al Andalusia Hospital', address: '15 el midan st. - smouha', color: "#0d159e" },
    { key: 2, drName: 'Mayar Adel', speciality: 'Dentist', hName: 'Royal Hospital', address: '17 abdelqader basha st.', color: "#0d589e" },
    { key: 3, drName: 'Omar Shalaby', speciality: 'Cardiologist', hName: 'Alex Hospital', address: '12 camp shizar st.', color: "#0d789e" },
    { key: 4, drName: 'Nadeen Elgazar', speciality: 'Gynaecologist', hName: 'ICC Hospital', address: '3 smouha st.', color: "#0d899e" },
    { key: 5, drName: 'Maram Ghazal', speciality: 'Cardiologist', hName: 'Alex Hospital', address: '6 camp shizar st.', color: "#0d789e" },
    { key: 6, drName: 'Omar Radwan', speciality: 'Dentist', hName: 'Alex Hospital', address: '5 camp shizar st.', color: "#0d789e" },
    { key: 7, drName: 'Verginia Ehab', speciality: 'Psychiatrist', hName: 'Alex Hospital', address: '5 camp shizar st.', color: "#0d789e" },
    { key: 8, drName: 'Omar Hisham', speciality: 'Dentist', hName: 'Al Andalusia Hospital', address: '15 el midan st. - smouha', color: "#0d789e" },
    { key: 9, drName: 'Ali Ghazal', speciality: 'Psychiatrist', hName: 'German Hospital', address: '6 gleem st.', color: "#0d369e" },

  ]



  return (
    <View style={styles.container}>
      <SearchBar
        lightTheme={true}
        placeholder="search"
        onChangeText={updateSearch}
        value={search}
        containerStyle={{ backgroundColor: '#f0f0f0' }}
        inputContainerStyle={{ borderRadius: 50, backgroundColor: '#fff' }}
      />
      {/* <View style={styles.header}>
        <Image style={styles.Image} source={require('../images/app_logo-removebg-preview.png')}></Image>
      </View> */}
      <ScrollView>
        {doctors.map((card, cardIndex) => {
          return (
            <DoctorsCard card={card} maxRating={maxRating} defaultRating={defaultRating} navigation={navigation} />
          );
        })}
      </ScrollView >

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    // width:'95%',
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // margin: '1%',
    // alignSelf: 'center',

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
  card: {
    // flex:1,
    width: '95%',
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
    // borderColor:'#000',
    margin: '1%',
    alignSelf: 'center'


  },
  card_header: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#0d159e',
    alignItems: 'center'
  },

  doctorImg: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    margin: '2%',
  },

  textView: {
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center'
  },

  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  speciality: {
    color: '#fff',
    fontSize: 13,
  },

  card_content: {
    justifyContent: 'space-evenly'
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





});
