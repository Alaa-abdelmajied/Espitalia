import React, { useRef, useEffect, useCallback } from 'react';
import { useState } from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  Image,
  Text,
  Pressable,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon5 from 'react-native-vector-icons/dist/FontAwesome5';

import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Server_URL, Token_Secret, Credintials_Secret } from '@env';

export default function ProfileScreen({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  // Modal data
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  //---
  const [doctor, setDoctor] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [dataChanged, setDataChanged] = useState(true);
  var token;
  const [cardData, setCardData] = useState({});

  // console.log(dataChanged);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getDoctor().then(setRefreshing(false));
  }, []);
  const getDoctor = async () => {
    console.log(Server_URL);
    token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
    //console.log("..",route.params.id);
    // console.log(token);
    // console.log('hi');

    axios({
      method: 'get',
      url: `${Server_URL}:3000/receptionist/getDoctor/${route.params.id}`,
      headers: {
        'x-auth-token': token,
      },
    })
      .then(function (response) {
        // console.log(response.data);
        setDoctor(response.data);
        setAppointments(response.data.schedule);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (dataChanged) {
      console.log(dataChanged);
      getDoctor();
      setDataChanged(false);
    }
  });

  const DoBooking = async () => {
    console.log(Server_URL);

    const token = JSON.parse(
      await EncryptedStorage.getItem(Token_Secret),
    ).token;
    axios({
      method: 'post',
      url: `${Server_URL}:3000/receptionist/book`,
      data: {
        patientPhoneNumber: phoneNumber,
        patientName: name,
        drId: doctor._id,
        date: cardData.date,
        from: cardData.from,
        to: cardData.to,
      },
      headers: {
        'x-auth-token': token,
      },
    })
      .then(function (response) {
        console.log('done');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const scrollX = useRef(new Animated.Value(0)).current;

  let { width: windowWidth, height: windowHeight } = useWindowDimensions();
  windowHeight = windowHeight - 300;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}></View>
          <Image
            style={styles.avatar}
            // source={require('../../images/DoctorIcon_black.png')}
            source={require('../../images/doctor_logo.png')}
          />
          <View style={styles.body}>
            {/* <View style={styles.bodyContent}> */}
            <Text style={styles.dr_name}>Dr {doctor.name}</Text>
            <Text style={styles.speciality}>{doctor.specialization}</Text>
          </View>
        </View>
        <View style={styles.appointmentsContainer}>
          <ScrollView
            horizontal={true}
            style={styles.scrollViewStyle}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false },
            )}
            scrollEventThrottle={15}>
            {appointments.map((card, cardIndex) => {
              return (
                <Animated.View
                  style={{ width: windowWidth }}
                  key={cardIndex.toString()}>
                  <View style={styles.scheduleCard}>
                    <View style={styles.dateHeader}>
                      <Text style={{ color: '#fff', fontSize: 20 }}>
                        {card.date.split('T')[0]}
                      </Text>
                    </View>
                    <View style={{ margin: 30, alignItems: 'center' }}>
                      <Text style={{ color: '#000', fontSize: 20 }}>
                        From: {card.from}
                      </Text>
                      <Text style={{ color: '#000', fontSize: 20 }}>
                        To: {card.to}
                      </Text>
                    </View>
                  </View>
                  <Modal
                    animationType="slide"
                    transparent
                    hardwareAccelerated={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View style={[styles.centeredView]}>
                      <View style={[styles.modalView]}>
                        <View style={[styles.workingDay, { width: '100%', alignItems: 'center' }]}>
                          <TextInput style={styles.inputData} placeholder='Name' onChangeText={text => setName(text)} />
                          <TextInput style={styles.inputData} placeholder='Phone number' onChangeText={text => setPhoneNumber(text)} />
                          <View style={{ flexDirection: 'row' }}>
                            <Pressable
                              style={[styles.button, styles.buttonClose]}
                              onPress={() => {
                                setModalVisible(!modalVisible);
                                DoBooking()
                              }
                              }
                            >
                              <Icon style={styles.newDay} name='check' />
                            </Pressable>
                            <Pressable
                              style={[styles.button, styles.buttonClose, { backgroundColor: "#f00" }]}
                              onPress={() => {
                                setModalVisible(!modalVisible)
                              }}
                            >
                              <Icon style={styles.newDay} name='close' />
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Modal>
                </Animated.View>
              );
            })}
          </ScrollView>
          <View style={styles.indicatorContainer}>
            {appointments.map((card, cardIndex) => {
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
                    { width: 2 },
                    { backgroundColor: card.color },
                  ]}
                  key={cardIndex.toString()}
                />
              );
            })}
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          hardwareAccelerated={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={[styles.centeredView]}>
            <View style={[styles.modalView]}>
              <View
                style={[
                  styles.workingDay,
                  { width: '100%', alignItems: 'center' },
                ]}>
                <TextInput
                  style={styles.inputData}
                  placeholder="Name"
                  onChangeText={text => setName(text)}
                />
                <TextInput
                  style={styles.inputData}
                  placeholder="Phone number"
                  onChangeText={text => setPhoneNumber(text)}
                />
                <View style={{ flexDirection: 'row' }}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      DoBooking();
                    }}>
                    <Icon style={styles.newDay} name="check" />
                  </Pressable>
                  <Pressable
                    style={[
                      styles.button,
                      styles.buttonClose,
                      { backgroundColor: '#f00' },
                    ]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <Icon style={styles.newDay} name="close" />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
  view: {
    // flexDirection: 'row',
    // height: 180,
    // width: 200,
    // padding: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
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
    borderRadius: 100,
    // borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#000',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 80,
    // marginBottom: 80,
  },

  body: {
    flexDirection: 'column',
    marginTop: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'#ff0ff0',
  },

  // bodyContent: {
  //   // flex: 1,
  //   // flexDirection: 'column',
  //   alignItems: 'center',
  //   // backgroundColor: '#f0ff7f',
  //   // padding: 30,
  //   // marginTop:150,
  // },

  name: {
    fontSize: 20,
    color: '#000',
    marginLeft: 5,
    // marginTop: 10,
    // textAlign: 'center'
  },

  dr_name: {
    marginTop: 20,
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
    fontSize: 16,
    color: '#000',
    marginLeft: 5,
  },

  // scheduleContainer:
  // {
  //   height: 280,
  //   margin: '2%',
  //   flexDirection: 'column',
  //   // backgroundColor: '#ff0fff',
  //   // justifyContent: 'space-evenly'
  // },

  appointmentsContainer: {
    height: 280,
    flexDirection: 'column',
    // backgroundColor: '#ff0',
  },

  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 20,
    // backgroundColor: '#ff0fff',
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
    shadowOffset: { width: -2, height: 2 },
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

  customRatingBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 5,
  },

  starImg: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },

  title: {
    // textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: 'bold',
    color: '#000',
    margin: 15,
  },

  reviewsArea: {
    width: '100%',
    // backgroundColor:'#f0f'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  input: {
    flex: 1,
    // width: '100%',
    // padding: 5,
    margin: 10,
    borderBottomColor: '#1c1bad',
    borderBottomWidth: 1,
    color: 'black',
    fontSize: 15,
  },
  workingDay: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  inputData: {
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1c1bad',
    margin: 5,
    width: 200,
    padding: 10,
  },
  ScrollView: {
    height: 300,
  },
});
