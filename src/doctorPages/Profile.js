import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Animated,
  useWindowDimensions,
  BackHandler,
  Alert,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Rating} from 'react-native-ratings';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret, Credintials_Secret} from '@env';

export default function UserProfileView({navigation}) {
  const [personalData, setPersonalData] = useState({});
  const [workingDays, setWorkingDays] = useState([]);

  useEffect(() => {
    const getPersonalData = async () => {
      try {
        const token = JSON.parse(
          await EncryptedStorage.getItem(Token_Secret),
        ).token;
        console.log(token);
        await axios
          .get(`${Server_URL}:3000/doctor/doctorProfile`, {
            headers: {
              'x-auth-token': token,
            },
          })
          .then(response => {
            setPersonalData(response.data);
            setWorkingDays(response.data.workingDays);
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error.message);
          });
      } catch (err) {
        Alert.alert('Error', err.code, [
          {text: 'Exit', onPress: () => BackHandler.exitApp()},
        ]);
      }
    };
    getPersonalData();
  }, []);

  const onPressLogout = async () => {
    try {
      await EncryptedStorage.removeItem(Token_Secret);
      await EncryptedStorage.removeItem(Credintials_Secret);
      navigation.reset({
        index: 0,
        routes: [{name: 'WelcomePage'}],
      });
    } catch (err) {
      Alert.alert('Error', err.message, [
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
      ]);
    }
  };

  const scrollX = useRef(new Animated.Value(0)).current;
  let {width: windowWidth, height: windowHeight} = useWindowDimensions();
  windowHeight = windowHeight - 300;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{margin: 5, alignSelf: 'flex-end'}}>
          <Pressable onPress={onPressLogout}>
            <Text style={{fontSize: 15, color: '#fff',margin:5}}>Logout</Text>
          </Pressable>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={require('../../images/doctor_logo.png')}

            // source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
          />
          <Text style={styles.name}>{personalData.drName}</Text>
          <Text style={styles.userInfo}>
            Doctor at : {personalData.hospitalName}
          </Text>
          <View style={styles.customRatingBar}>
            <Rating
              type="custom"
              ratingBackgroundColor="#bfbfbf"
              tintColor="#1c1bad"
              ratingCount={5}
              imageSize={25}
              startingValue={personalData.averageRating}
              fractions={1}
              readonly={true}
              style={{
                margin: 5,
                backgroundColor: 'transparent',
                fontSize: 15,
              }}></Rating>
            <Text style={{color: '#fff', fontSize: 15, alignSelf: 'center'}}>
              {personalData.averageRating}/5
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Personal Information</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 2,
            justifyContent: 'center',
          }}>
          <Ionicons name={'mail'} size={20} color={'#000'}></Ionicons>
          <Text style={styles.mainText}>{personalData.email}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 2,
            justifyContent: 'center',
          }}>
          <FontAwesome name={'phone'} size={20} color={'#000'}></FontAwesome>
          <Text style={styles.mainText}>0111345454</Text>
        </View>
      </View>
      <View style={styles.appointmentsContainer}>
        <Text style={styles.title}>Working Days</Text>
        <ScrollView
          horizontal={true}
          style={styles.scrollViewStyle}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}>
          {workingDays.map((card, cardIndex) => {
            return (
              <Animated.View style={{width: windowWidth}} key={cardIndex}>
                <View style={styles.scheduleCard}>
                  <View style={styles.dateHeader}>
                    <Text style={{color: '#fff', fontSize: 20}}>
                      {card.day}
                    </Text>
                  </View>
                  <View style={{margin: 30, alignItems: 'center'}}>
                    <Text style={{color: '#000', fontSize: 20}}>
                      From: {card.from}
                    </Text>
                    <Text style={{color: '#000', fontSize: 20}}>
                      To: {card.to}
                    </Text>
                  </View>
                </View>
              </Animated.View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {workingDays.map((card, cardIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (cardIndex - 1),
                windowWidth * cardIndex,
                windowWidth * (cardIndex + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                style={[
                  styles.normalDots,
                  {width},
                  {backgroundColor: '#1c1bad'},
                ]}
                key={cardIndex}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1c1bad',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 23,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  userInfo: {
    fontSize: 18,
    color: '#ffffff',
  },
  item: {
    flexDirection: 'row',
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 20,
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
    color: '#000000',
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: '#000000',
  },

  mainText: {
    margin: 3,
    color: '#000',
    fontSize: 18,
    marginLeft: 10,
  },

  card: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    flexGrow: 1,
  },
  cardTittle: {
    color: '#000000',
    fontSize: 22,
    marginBottom: 5,
  },
  cardInfo: {
    fontSize: 18,
    color: '#000000',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 150,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#1c1bad',
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
  },
  customRatingBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },

  appointmentsContainer: {
    height: 280,
    flexDirection: 'column',
    marginBottom: 5,
  },

  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  normalDots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  scheduleCard: {
    flex: 1,
    margin: 8,
    width: 200,
    height: 250,
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 35,
    shadowColor: '#000000',
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },

  dateHeader: {
    backgroundColor: '#1c1bad',
    height: '25%',
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
