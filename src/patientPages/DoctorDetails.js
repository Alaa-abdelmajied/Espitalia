import React, {useRef, useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  Image,
  Text,
  Pressable,
  BackHandler,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Rating} from 'react-native-ratings';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret} from '@env';
import {useIsFocused} from '@react-navigation/native';

export default function ProfileScreen({navigation, route}) {
  const {
    drID,
    drName,
    specialization,
    hospitalName,
    hospitalAddress,
    averageRating,
    // fromHomepage,
    fromSearch,
  } = route.params;

  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const [alert, setAlert] = useState(false);
  const isFocused = useIsFocused();

  const showAlert = () => {
    setAlert(true);
  };
  const hideAlert = () => {
    setAlert(false);
  };

  useEffect(() => {
    if (isFocused) {
      setLoadData(true);
      const getDoctorDetails = async () => {
        await axios
          .get(`${Server_URL}:3000/patient/doctor/${drID}`)
          .then(response => {
            console.log(response.data.scheduleDetails);
            setData(response.data.doctorData);
            setComments(response.data.reviewDetails);
            setSchedule(response.data.scheduleDetails);
            setLoadData(false);
          })
          .catch(function (error) {
            console.log(error.message);
            setLoadData(false);
          });
      };
      getDoctorDetails();
    } else {
      setData([]);
      setComments([]);
      setSchedule([]);
    }
  }, [isFocused]);

  const bookAppointment = async (scheduleID, date, from, to) => {
    showAlert();
    try {
      const token = JSON.parse(
        await EncryptedStorage.getItem(Token_Secret),
      ).token;
      axios
        .post(
          `${Server_URL}:3000/patient/book`,
          {
            scheduleID: scheduleID,
            drId: drID,
            appDate: date,
            appFrom: from,
            appTo: to,
          },
          {
            headers: {
              'x-auth-token': token,
            },
          },
        )
        .then(function (response) {
          hideAlert();
          showMessage({
            message: 'Appointment successfully booked',
            type: 'success',
            duration: 3500,
          });
        })
        .catch(function (error) {
          const err = error.response.data;
          if (err.includes('same doctor')) {
            hideAlert();
            showMessage({
              message: err,
              type: 'danger',
              duration: 4500,
            });
          } else if (err.includes('same time')) {
            hideAlert();
            showMessage({
              message: err,
              type: 'danger',
              duration: 4500,
            });
          } else {
            hideAlert();
            showMessage({
              message: 'Something went wrong',
              type: 'danger',
              duration: 4000,
            });
          }
          console.log(err);
        });
    } catch (err) {
      Alert.alert('Error', err.code, [
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
      ]);
    }
  };

  const scrollX = useRef(new Animated.Value(0)).current;
  let {width: windowWidth, height: windowHeight} = useWindowDimensions();
  windowHeight = windowHeight - 300;

  return loadData ? (
    <View style={styles.loadingIcon}>
      <ActivityIndicator size="large" color="#0451cc" />
    </View>
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Pressable
              style={{alignSelf: 'flex-start', margin: 5}}
              onPress={() => navigation.goBack()}>
              <Ionicons name={'arrow-back'} size={30} color="#fff"></Ionicons>
            </Pressable>
          </View>
          <Image
            style={styles.avatar}
            source={require('../../images/doctor_logo.png')}

            // source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
          />
          {/* <View style={styles.body}> */}
          {/* <View style={styles.bodyContent}> */}
          {!fromSearch ? (
            <View style={styles.body}>
              <Text style={styles.dr_name}>{drName}</Text>
              <Text style={styles.description}>{specialization}</Text>
              <View style={{flexDirection: 'row'}}>
                <FontAwesome
                  name={'hospital-o'}
                  size={25}
                  color="#1c1bad"
                  style={{margin: 5}}></FontAwesome>
                <Text style={styles.description}>{hospitalName}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '95%',
                  justifyContent: 'center',
                }}>
                <Ionicons
                  name={'location-sharp'}
                  size={25}
                  color="#1c1bad"
                  style={{margin: 5}}></Ionicons>
                <Text style={styles.description}>{hospitalAddress}</Text>
              </View>
              <View style={styles.customRatingBar}>
                <Rating
                  type="custom"
                  ratingBackgroundColor="#bfbfbf"
                  tintColor="#f0f0f0"
                  ratingCount={5}
                  imageSize={30}
                  startingValue={averageRating}
                  fractions={1}
                  readonly={true}></Rating>
                <Text style={styles.text}>{averageRating}/5</Text>
              </View>
            </View>
          ) : (
            <View style={styles.body}>
              <Text style={styles.dr_name}>{data.drName}</Text>
              <Text style={styles.description}>{data.specialization}</Text>
              <View style={{flexDirection: 'row'}}>
                <FontAwesome
                  name={'hospital-o'}
                  size={25}
                  color="#1c1bad"
                  style={{margin: 5}}></FontAwesome>
                <Text style={styles.description}>{data.hospitalName}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Ionicons
                  name={'location-sharp'}
                  size={25}
                  color="#1c1bad"
                  style={{margin: 5}}></Ionicons>
                <Text style={styles.description}>{data.hospitalAddress}</Text>
              </View>
              <View style={styles.customRatingBar}>
                <Rating
                  type="custom"
                  ratingBackgroundColor="#bfbfbf"
                  tintColor="#f0f0f0"
                  ratingCount={5}
                  imageSize={30}
                  startingValue={data.averageRating}
                  fractions={1}
                  readonly={true}></Rating>
                <Text style={styles.text}>{data.averageRating}/5</Text>
              </View>
            </View>
          )}
        </View>
        <FlashMessage position="top" icon="auto" />
      </View>
      <Text style={styles.title}>Schedule</Text>
      {schedule.length != 0 ? (
        <View style={styles.appointmentsContainer}>
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
            {schedule.map((card, cardIndex) => {
              return (
                <Animated.View style={{width: windowWidth}} key={cardIndex}>
                  <View style={styles.scheduleCard}>
                    <View style={styles.dateHeader}>
                      <Text style={{color: '#fff', fontSize: 20}}>
                        {card.displayDate}
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
                    <TouchableOpacity
                      style={styles.bookButton}
                      onPress={() =>
                        bookAppointment(
                          card.scheduleID,
                          card.date,
                          card.from,
                          card.to,
                        )
                      }>
                      <Text style={{color: '#fff'}}>Book</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              );
            })}
          </ScrollView>
          <View style={styles.indicatorContainer}>
            {schedule.map((card, cardIndex) => {
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
      ) : (
        <Text style={{alignSelf: 'center', fontSize: 15}}>
          No schedules found
        </Text>
      )}
      <Text style={styles.title}>Ratings and Reviews</Text>
      {comments.length != 0 ? (
        <View style={styles.reviewsArea}>
          {comments.map((reviewCard, cardIndex) => {
            return (
              <View key={cardIndex} style={styles.commentsCard}>
                <View style={{height: 150, width: '97%', alignSelf: 'center'}}>
                  <Text style={styles.text}>{reviewCard.name}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Rating
                      type="custom"
                      ratingBackgroundColor="#bfbfbf"
                      tintColor="#fff"
                      ratingCount={5}
                      imageSize={25}
                      startingValue={reviewCard.rate}
                      fractions={1}
                      readonly={true}
                      style={{
                        marginRight: 10,
                      }}></Rating>
                    <Text style={styles.text}>{reviewCard.date}</Text>
                  </View>
                  <Text style={styles.text}>{reviewCard.review}</Text>
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        <Text style={{alignSelf: 'center', fontSize: 15}}>
          No reviews found
        </Text>
      )}
      <AwesomeAlert
        show={alert}
        showProgress={true}
        title="Booking appointment"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
      />
      {/* <FlashMessage position="top" icon="auto" /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff000'
  },

  headerContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    // backgroundColor: "#fff0f0",
  },

  header: {
    // flex: 1,
    backgroundColor: '#1c1bad',
    height: 150,
  },
  avatar: {
    // flex: 1,
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 80,
    backgroundColor: '#fff',
  },

  body: {
    width: '99%',
    flexDirection: 'column',
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'#ff0ff0',
  },

  text: {
    fontSize: 19,
    color: '#000',
    margin: 1,
  },

  dr_name: {
    fontSize: 28,
    color: '#000',
    fontWeight: 'bold',
  },

  speciality: {
    fontSize: 16,
    color: '#1c1bad',
    margin: 5,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 16,
    color: '#000',
    margin: 5,
    textAlign: 'center',
  },

  review: {
    fontSize: 19,
    color: '#000',
    marginLeft: 5,
  },

  appointmentsContainer: {
    height: 280,
    flexDirection: 'column',
    // backgroundColor: '#ff0',
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

  bookButton: {
    width: 100,
    paddingTop: '6%',
    paddingBottom: '6%',
    borderRadius: 30,
    backgroundColor: '#1c1bad',
    borderWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
    borderColor: '#fff',
    color: '#fff',
  },

  commentsCard: {
    backgroundColor: '#fff',
    width: '95%',
    margin: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },

  customRatingBar: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5,
  },

  starImg: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: 'bold',
    color: '#000',
    margin: 10,
    alignSelf:'center'
  },
    subtitle: {
    fontSize: 16,
    color: '#1c1bad',
    margin: 5,
    fontWeight: 'bold',
  },

  reviewsArea: {
    width: '100%',
  },
  loadingIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
