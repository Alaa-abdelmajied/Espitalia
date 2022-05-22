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
} from 'react-native';

import {Rating} from 'react-native-ratings';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret, Credintials_Secret} from '@env';

export default function UserProfileView() {
  const [personalData, setPersonalData] = useState('');

  useEffect(() => {
    const getPersonalData = async () => {
      try {
        const token = JSON.parse(
          await EncryptedStorage.getItem(Token_Secret),
        ).token;
        console.log(token);
        await axios
          .get(`${Server_URL}:3000/doctor/doctor`, {
            headers: {
              'x-auth-token': token,
            },
          })
          .then(response => {
            setPersonalData(response.data);
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

  const scrollX = useRef(new Animated.Value(0)).current;
  let {width: windowWidth, height: windowHeight} = useWindowDimensions();
  windowHeight = windowHeight - 300;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
          />

          <Pressable onPress={() => console.log(personalData.schedule[0].from)}>
            <Text>press me</Text>
          </Pressable>

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
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.cardTittle}>Profile Information</Text>
          <Text style={styles.cardInfo}>- Karim Ahmed Saleh</Text>
          <Text style={styles.cardInfo}>- Phone numebr: .................</Text>
          <Text style={styles.cardInfo}>- From: Alexandria , Egypt</Text>
          <Text style={styles.cardInfo}>- Email: {personalData.email}</Text>
          {/* <View style={styles.appointmentsContainer}>
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
              {personalData.schedule.map((card, cardIndex) => {
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
              {personalData.schedule.map((card, cardIndex) => {
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
          </View> */}
          {/* {personalData.schedule.map((item, index) => {
            return (
              <TouchableOpacity style={styles.appointmentsCard} key={index}>
                <Text style={styles.info}>From: {item.from}</Text>
                <Text style={styles.info}>To: {item.to} </Text>
                <Text style={styles.info}>Date: {item.day}</Text>
              </TouchableOpacity>
            );
          })} */}
        </View>
      </View>
    </View>
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
  },
  name: {
    fontSize: 25,
    color: '#ffffff',
    fontWeight: '900',
  },
  userInfo: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  body: {
    backgroundColor: '#ffffff',
    height: 500,
  },
  item: {
    flexDirection: 'row',
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

  card: {
    backgroundColor: '#f2f2f5',
    // borderRadius: 10,
    padding: 10,
    flexGrow: 1,
    // height: 400,
    marginTop: 10,
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
    backgroundColor: '#fff',
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

  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
