import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  SectionList,
  FlatList,
  RefreshControl,
  TouchableOpacity,

} from 'react-native';


const DoctorsCard = ({ card, cardIndex, maxRating, defaultRating, starImgCorner, starImgFilled, navigation }) => {

  const onPress = () => {
    navigation.navigate('DoctorDetails');
  };


  return (
    <TouchableOpacity style={styles.card} key={cardIndex} onPress={onPress}>
      <View style={styles.card_header}>
        <Image style={styles.doctorImg} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}></Image>
        <View style={styles.textView}>
          <Text style={styles.name}>Dr. {card.drName}</Text>
          <Text style={styles.speciality}>{card.speciality}</Text>
        </View>
      </View>
      <View style={styles.card_content}>
        <View style={styles.place}>
          <Image style={styles.icon} source={require('../images/hospital.png')}></Image>
          <Text style={styles.hospital}>{card.hName}</Text>
        </View>
        <View style={styles.place}>
          <Image style={styles.icon} source={require('../images/location.png')}></Image>
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
}


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
    margin: '1.5%',
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

export default DoctorsCard;