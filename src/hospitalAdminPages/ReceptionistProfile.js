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
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

import axios from "axios";
import EncryptedStorage from 'react-native-encrypted-storage';
import { Server_URL, Token_Secret, Credintials_Secret } from '@env';

/*
dbachmann0@ning.com
n8RPhN
*/

export default function ProfileScreen({ navigation, route }) {
  
  const Day = ['Saterday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const [recepitionist, setRecepitionist] = useState(route.params);
  const [workingDays, setWorkingDays] = useState([]);

  const [today,] = useState(new Date());
  const [day, setDay] = useState('');
  const [fromText, setFromText] = useState('From');
  const [from, setFrom] = useState(today);
  const [toText, setToText] = useState('To');
  const [to, setTo] = useState(today);
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  // const [errorMessage2, setErrorMessage2] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const getReceptionist = async () => {
    const token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
    console.log(Server_URL);
    axios
      .get(`${Server_URL}:3000/hospital/getReceptionist/${route.params._id}`, {
        headers: {
          'x-auth-token': token
        }
      })
      .then(function (response) {
        setRecepitionist(response.data);
        setWorkingDays(response.data.workingDays);
        // console.log(response.data.workingDays);
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  useEffect(() => {
    getReceptionist();
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
      from: f,
      to: t
    };
    if (d == '') {
      setErrorMessage('Select a Day');
      console.log('day error');
    }
    else if (f == today) {
      setErrorMessage('Select a From');
      console.log('from error');
    }
    else if (t == today) {
      setErrorMessage('Select a To');
      console.log('to error');
    }
    else if (!checkWorkingDays(workingDay, workingDays)) {
      setErrorMessage('Working day is already exists');
      console.log('overlapping error');
    }
    else {
      console.log('adding workingday...');
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
      axios({
        method: 'put',
        url: `${Server_URL}:3000/hospital/addWorkingDayRecept`,
        data: {
          receptionistID: recepitionist._id,
          day: workingDay.day,
          from: workingDay.from.getHours() + ':' + workingDay.from.getMinutes(),
          to: workingDay.to.getHours() + ':' + workingDay.to.getMinutes()
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
    getReceptionist();
  }
  const checkWorkingDays = (newWD, WDs) => {
    if (WDs.length == 0) return true;
    for (var i = 0; i < WDs.length; i++) {
      if (newWD.day == WDs[i].day) {
        const fromTime = {
          hours: WDs[i].from.split(':')[0],
          minutes: WDs[i].from.split(':')[1],
        }
        const toTime = {
          hours: WDs[i].to.split(':')[0],
          minutes: WDs[i].to.split(':')[1],
        }
        const tempFrom = new Date();
        tempFrom.setHours(fromTime.hours);
        tempFrom.setMinutes(fromTime.minutes);
        tempFrom.setSeconds(0);

        const tempTo = new Date();
        tempTo.setHours(toTime.hours);
        tempTo.setMinutes(toTime.minutes);
        tempTo.setSeconds(0);

        newWD.from.setSeconds(0);
        newWD.to.setSeconds(0);
        console.log(newWD.from, "->", newWD.to);
        console.log(tempFrom, "->", tempTo);
        if (newWD.from <= tempFrom && newWD.to >= tempTo) {
          return false;
        }
        else if (newWD.from <= tempFrom && newWD.to >= tempFrom) {
          return false;
        }
        else if (newWD.from >= tempFrom && newWD.to <= tempTo) {
          return false;
        }
        else if (newWD.from >= tempFrom && newWD.from <= tempTo) {
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
      console.log(recepitionist._id, workingDay._id, Server_URL);
      axios({
        method: 'put',
        url: `${Server_URL}:3000/hospital/removeWorkingDayRecept`,
        data: {
          receptionistID: route.params._id,
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
    getReceptionist();
  }
  const deactivateReceptionist = async () => {
    // console.log('deactivate');
    try {
      const token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
      //console.log(token);
      axios({
        method: 'put',
        url: `${Server_URL}:3000/hospital/deactivateReceptionist`,
        data: {
          receptionistID: route.params._id,
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
  }

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
            <Text style={styles.dr_name}>{recepitionist.name}</Text>
            <Text style={styles.speciality}>{recepitionist.specialization}</Text>
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
            {recepitionist._id ? recepitionist.workingDays.map((card, cardIndex) => {
              return (
                <Animated.View style={{ width: windowWidth }} key={cardIndex.toString()}>
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
            {recepitionist._id ? recepitionist.workingDays.map((card, cardIndex) => {
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
                  key={cardIndex.toString()}
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
        </View>
        <View style={{ alignItems: 'center', margin: 20 }}>
          <TouchableOpacity
            style={[styles.touchableOpacity, { width: 150, backgroundColor: '#f00', flexDirection: 'row', justifyContent: 'space-evenly' }]}
            onPress={deactivateReceptionist}
          >
            <AntDesign style={styles.newDay} name='deleteuser' /><Text style={{ color: '#fff' }}>Deactivate</Text>
          </TouchableOpacity>
        </View>
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
  review: {
    fontSize: 16,
    color: '#000',
    marginLeft: 5,
  },
  appointmentsContainer: {
    height: 280,
    flexDirection: 'column',
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
  buttonClose: {
    backgroundColor: "#2196F3",
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
