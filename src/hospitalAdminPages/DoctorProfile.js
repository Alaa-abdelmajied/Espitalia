import React, { useRef } from 'react';
import { useState, useEffect } from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
} from 'react-native';

import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon5 from 'react-native-vector-icons/dist/FontAwesome5';

import axios from "axios";
import EncryptedStorage from 'react-native-encrypted-storage';
import { Server_URL, Token_Secret, Credintials_Secret } from '@env';

/*
dbachmann0@ning.com
n8RPhN
*/

export default function ProfileScreen({ navigation, route }) {
  // const [doctor, setDoctor] = useState(route.params);
  const Day = ['Saterday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [doctor, setDoctor] = useState(route.params);
  const [workingDays, setWorkingDays] = useState([]);

  const [tempDoctor, setTempDoctor] = useState({});

  const [today,] = useState(new Date());
  const [day, setDay] = useState('');
  const [fromText, setFromText] = useState('From');
  const [from, setFrom] = useState(today);
  const [toText, setToText] = useState('To');
  const [to, setTo] = useState(today);
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const getDoctor = async () => {
    const token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
    console.log(Server_URL);
    axios
      .get(`${Server_URL}:3000/hospital/getDoctor/${route.params._id}`, {
        headers: {
          'x-auth-token': token
        }
      })
      .then(function (response) {
        setDoctor(response.data);
        setWorkingDays(response.data.workingDays);
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  useEffect(() => {

    getDoctor();
    //console.log(doctor.workingDays);

  }, []);

  const OpenFromWindow = () => {
    setShowFrom(true);
  }
  const OpenToWindow = () => {
    setShowTo(true);
  }
  const handelFrom = (event, selectedTime) => {
    setShowFrom(false);
    setFrom(selectedTime);
    const time = selectedTime.getHours() + ':' + selectedTime.getMinutes()
    setFromText(time);
    // console.log(from);
  }
  const handelTo = (event, selectedTime) => {
    setShowTo(false);
    setTo(selectedTime);
    const time = selectedTime.getHours() + ':' + selectedTime.getMinutes()
    setToText(time);
    // console.log(to);
  }
  const handelWorkingDay = (d, f, t) => {
    const workingDay = {
      day: d,
      // from: f.getHours() + ':' + f.getMinutes(),
      // to: t.getHours() + ':' + t.getMinutes()
      from: from,
      to: to
    };
    // console.log(checkWorkingDays(workingDay, workingDays));
    console.log(d);
    if (d == '') {
      setErrorMessage('Select a Day');
    }
    else if (f == today) {
      setErrorMessage('Select a From');
    }
    else if (t == today) {
      setErrorMessage('Select a To');
    }
    else if (!checkWorkingDays(workingDay, workingDays)) {
      setErrorMessage('Working day is already exists');
    }
    else {
      // console.log('handel Working Days');
      console.log(workingDay);
      setWorkingDays([...workingDays, workingDay]);
      setErrorMessage('');
      setModalVisible(!modalVisible);
      handelCloseModal();
      AddWorkingDay(workingDay)
    }
  }

  const AddWorkingDay = async (workingDay) => {
    try {
      const token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
      //console.log(token);
      // console.log(doctor._id, workingDay._id, Server_URL);
      axios({
        method: 'put',
        url: `${Server_URL}:3000/hospital/addWorkingDay`,
        data: {
          doctorID: doctor._id,
          day: workingDay.day,
          from: workingDay.from.getHours()+':'+workingDay.from.getMinutes(),
          to: workingDay.to.getHours()+':'+workingDay.to.getMinutes()
        },
        headers: {
          'x-auth-token': token
        }
      })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      catch (error) {
        console.log(error);
        // console.log("no try");
      }
      getDoctor();
    }
  const checkWorkingDays = (newWD, WDs) => {
    if (WDs.length == 0) return true;
    for (var i = 0; i < WDs.length; i++) {
      if (newWD.day == WDs[i].day) {
        if (newWD.from <= WDs[i].from && newWD.to >= WDs[i].to) {
          return false;
        }
        else if (newWD.from <= WDs[i].from && newWD.to >= WDs[i].from) {
          return false;
        }
        else if (newWD.from >= WDs[i].from && newWD.to <= WDs[i].to) {
          return false;
        }
        else if (newWD.from >= WDs[i].from && newWD.from <= WDs[i].to) {
          return false;
        }
      }
    }
    return true;
  }
  const handelCloseModal = () => {
    setDay('');
    setFrom(today);
    setFromText('From');
    setTo(today);
    setToText('To');
    setErrorMessage('');
  }
  const makeValidWorkingDays = () => {
    const newWorkingDays = [];
    for (var i = 0; i < workingDays.length; i++) {
      newWorkingDays.push({
        day: workingDays[i].day,
        from: workingDays[i].from.getHours() + ':' + workingDays[i].from.getMinutes(),
        to: workingDays[i].to.getHours() + ':' + workingDays[i].to.getMinutes()
      });
    }
    // console.log("helloooo", newWorkingDays);
    return newWorkingDays;
  }
  const removeSchedle = async (workingDay) => {
    try {
      const token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
      //console.log(token);
      console.log(doctor._id, workingDay._id, Server_URL);
      axios({
        method: 'put',
        url: `${Server_URL}:3000/hospital/removeWorkingDay`,
        data: {
          doctorID: route.params._id,
          workingDay: workingDay._id,
        },
        headers: {
          'x-auth-token': token
        }
      })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    catch (error) {
      console.log(error);
      // console.log("no try");
    }
    getDoctor();
  }

  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const scrollX = useRef(new Animated.Value(0)).current;

  let { width: windowWidth, height: windowHeight } = useWindowDimensions();
  windowHeight = windowHeight - 300;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}></View>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
          />
          <View style={styles.body}>
            {/* <View style={styles.bodyContent}> */}
            <Text style={styles.dr_name}>{doctor.name}</Text>
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
            scrollEventThrottle={16}>
            {doctor._id ? doctor.workingDays.map((card, cardIndex) => {
              return (
                <Animated.View style={{ width: windowWidth }} key={card.key}>
                  <View style={styles.scheduleCard}>
                    <View style={styles.dateHeader}>
                      <Text style={{ color: '#fff', fontSize: 20 }}>
                        {card.day}
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
                    <Pressable style={styles.bookButton} onPress={() => removeSchedle(card)}>
                      <Text style={{ color: '#fff' }}>Remove</Text>
                    </Pressable>
                  </View>
                </Animated.View>
              );
            }) : null}
          </ScrollView>
          <View style={styles.indicatorContainer}>
            {doctor._id ? doctor.workingDays.map((card, cardIndex) => {
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
                    { width },
                    { backgroundColor: card.color },
                  ]}
                  key={cardIndex}
                />
              );
            }) : null}
          </View>
        </View>
        <View>
          <View style={styles.addNewScheduleContainter}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                //handelWorkingDay(day, from, to);
                setModalVisible(!modalVisible);
              }}
            >
              <Icon5 style={styles.newDay} name='calendar-plus' />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.reviewsArea}>
          <Modal
            animationType="slide"
            transparent={true}
            hardwareAccelerated={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={[styles.centeredView]}>
              <View style={[styles.modalView]}>
                <View style={[styles.workingDay, { width: '100%', alignItems: 'center' }]}>
                  <SelectDropdown
                    renderDropdownIcon={() => <Ionicons
                      name={'chevron-down'}
                      size={20}
                      color={'#000'}
                    />}
                    dropdownBackgroundColor='#fff'
                    dropdownOverlayColor='transparent'
                    buttonStyle={styles.dayInput}
                    defaultButtonText='Day'
                    buttonTextStyle={{ color: '#a1a1a1', fontSize: 16 }}
                    data={Day}
                    onSelect={(selectedItem, index) => {
                      setDay(selectedItem[0] + selectedItem[1] + selectedItem[2]);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                      return item
                    }}
                  />
                  <View style={{ width: '200%', flexDirection: 'row', marginTop: 10 }}>
                    <View style={styles.timeInput}>
                      <Button
                        value={today}
                        style={styles.dateInput}
                        title={fromText}
                        color={'#1c1bad'}
                        onPress={OpenFromWindow}
                      />
                    </View>
                    {showFrom &&
                      <DateTimePicker
                        mode='time'
                        value={from}
                        onChange={handelFrom}
                      />
                    }
                    <View style={styles.timeInput}>
                      <Button
                        title={toText}
                        color={'#1c1bad'}
                        onPress={OpenToWindow}
                      />
                    </View>

                    {showTo &&
                      <DateTimePicker
                        mode='time'
                        value={to}
                        onChange={handelTo}
                      />
                    }
                  </View>
                </View>
                {errorMessage != '' &&
                  <Text style={{ color: '#f00' }}>{errorMessage}</Text>
                }
                <View style={{ flexDirection: 'row' }}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      handelWorkingDay(day, from, to);
                      console.log(day, from, to);
                    }
                    }
                  >
                    <Icon style={styles.newDay} name='check' />
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose, { backgroundColor: "#f00" }]}
                    onPress={() => {
                      handelCloseModal();
                      setModalVisible(!modalVisible)
                    }}
                  >
                    <Icon style={styles.newDay} name='close' />
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Text style={styles.title}>Ratings and Reviews</Text>

          {doctor._id ? doctor.reviews.map((reviewCard, cardIndex) => {
            return (
              <View
                style={{
                  backgroundColor: '#fff',
                  width: '95%',
                  margin: 5,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  borderRadius: 10,
                  shadowColor: '#000000',
                  shadowOffset: { width: -2, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  elevation: 2,
                }}>
                <View
                  style={{ height: 150, width: '97%', alignSelf: 'center' }}
                  key={reviewCard.key}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.name}>{reviewCard.reviewer_name}</Text>
                    <Text style={styles.name}>{reviewCard.date}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 5,
                    }}>
                    {maxRating.map((item, key) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          key={key}
                          onPress={() => setDefaultRating(item)}>
                          <FontAwesome
                            name={item <= defaultRating ? 'star' : 'star-o'}
                            size={25}
                            color="#FDCC0D"
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <Text style={styles.review}>{reviewCard.review}</Text>
                </View>
              </View>
            );
          }) : null}
        </View>
        {/* <View style={{ backgroundColor: '#FDCC0D', width: '100%', height: 100, justifyContent: 'center', alignItems: 'center' }}><Text style={styles.title}>Comments Section - To be continued</Text></View> */}
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
  bookButton: {
    width: 100,
    paddingTop: '6%',
    paddingBottom: '6%',
    borderRadius: 30,
    backgroundColor: '#bf0000',
    borderWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
    borderColor: '#fff',
    color: '#fff',
  },
  touchableOpacity: {
    backgroundColor: '#1c1bad',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 50,
    height: 50,
    borderRadius: 100,
    elevation: 10,
  },
  addNewScheduleContainter: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  newDay: {
    fontSize: 25,
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  // button: {
  //     borderRadius: 20,
  //     padding: 10,
  //     elevation: 2
  // },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  name: {
    fontSize: 18,
    color: '#000',
    marginLeft: 5,
    // marginTop: 10,
    // textAlign: 'center'
  },
  workingDay: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  dayInput: {
    // width: '50%',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    // margin: 5,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  timeInput: {
    width: '20%',
    margin: 5,
  },
  dateInput: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    margin: 5,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  button: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 5,
  },
});
