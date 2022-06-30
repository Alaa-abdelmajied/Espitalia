import React, { useState } from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Pressable, ScrollView, Modal } from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon5 from 'react-native-vector-icons/dist/FontAwesome5';

import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Server_URL, Token_Secret, Credintials_Secret } from '@env';
import { CommonActions, StackActions } from '@react-navigation/native';
// import validator from'validator';
const validator = require('validator');

const Day = ['Saterday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const AddReceptionist = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessage2, setErrorMessage2] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const today = new Date();
    const [text, setText] = useState('📅 DD/MM/YYYY');
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(today);

    const [day, setDay] = useState('');
    const [fromText, setFromText] = useState('From');
    const [from, setFrom] = useState(today);
    const [toText, setToText] = useState('To');
    const [to, setTo] = useState(today);

    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);

    const [workingDays, setWorkingDays] = useState([]);


    const OpenDateWindow = () => {
        setShow(true);
    }
    const OpenFromWindow = () => {
        setShowFrom(true);
    }
    const OpenToWindow = () => {
        setShowTo(true);
    }

    const handleDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);

        let tmpDate = new Date(currentDate);
        let fullDate = "📅 " + tmpDate.getDate() + "/" + (tmpDate.getMonth() + 1) + "/" + tmpDate.getFullYear();
        setText(fullDate);
    }
    const handelFrom = (event, selectedTime) => {
        setShowFrom(false);
        setFrom(selectedTime);
        const time = selectedTime.getHours() + ':' + selectedTime.getMinutes()
        setFromText(time);
    }
    const handelTo = (event, selectedTime) => {
        setShowTo(false);
        setTo(selectedTime);
        const time = selectedTime.getHours() + ':' + selectedTime.getMinutes()
        setToText(time);
    }

    const handelWorkingDay = (d, f, t) => {
        const workingDay = {
            day: d,
            from: from,
            to: to
        };
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
            console.log(workingDay);
            setWorkingDays([...workingDays, workingDay]);
            setErrorMessage('');
            setModalVisible(!modalVisible);
            handelCloseModal();
        }
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
    const removeWorkingDay = (d, f, t) => {
        const workingDay = {
            day: d,
            from: f,
            to: t
        };
        setWorkingDays(workingDays.filter(item => JSON.stringify(item) !== JSON.stringify(workingDay)));
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
        return newWorkingDays;
    }
    const AddNewReceptionist = async () => {
        if (name == '') setErrorMessage2('Enter Name');
        else if (emailError != '') setErrorMessage2('Enter a valid Email');
        else if (phoneNumber == '') setErrorMessage2('Enter phone number');
        else if (date === today) setErrorMessage2('select a proper date');
        else if (workingDays.length == 0) setErrorMessage2('Add at least one working day');
        else {
            setErrorMessage2('');
            const token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
            axios({
                method: 'post',
                url: `${Server_URL}:3000/hospital/addReceptionist`,
                data: {
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    workingDays: makeValidWorkingDays()
                },
                headers: {
                    'x-auth-token': token
                }
            })
                .then(function (response) {
                    navigation.goBack();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        console.log(errorMessage2, date, today);
    }

    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput style={styles.inputText} placeholder='ex. Yassmine' onChangeText={text => setName(text)} />
                </View>
            </View>
            <View style={styles.view}>
                <Text style={styles.label}>Email:</Text>
                <TextInput style={styles.inputText} placeholder='ex. Yassmin@yahoo.com' onChangeText={text => {
                    setEmail(text);
                    if (!validator.isEmail(text)) setEmailError('Invalid Email');
                    else setEmailError('');
                }} />
            </View>
            {emailError != '' &&
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#f00' }}>{emailError}</Text>
                </View>
            }
            <View style={styles.view}>
                <Text style={styles.label}>Phone Number:</Text>
                <TextInput style={styles.inputText} placeholder='ex. +20 1XXX XXXXXX' onChangeText={text => setPhoneNumber(text)} />
            </View>
            <View style={styles.view}>
                <Text style={styles.label}>Date of Birth:</Text>
                <View style={[{ justifyContent: 'center', width: 200 }]}>
                    <Button
                        title={text}
                        color='#1c1bad'
                        onPress={OpenDateWindow}
                    />
                    {show && (
                        <DateTimePicker
                            mode='date'
                            value={date}
                            maximumDate={new Date((today.getFullYear() - 18), 11, 31)}
                            onChange={handleDate}
                            isDatePickerVisible
                        />)}
                </View>
            </View>

            <View style={styles.addNewScheduleContainter}>
                <ScrollView style={{ width: '100%', margin: 10 }}>
                    {workingDays.length != 0 ? workingDays.map((workingDayCard, cardIndex) => {
                        return (
                            <View
                                key={cardIndex.toString()}
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
                                    style={{ width: '97%', alignSelf: 'center', justifyContent: 'center' }}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                                        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                                            <Text style={styles.name}>Day: {workingDayCard.day} |</Text>
                                            <Text style={styles.name}>From: {workingDayCard.from.getHours() + ':' + workingDayCard.from.getMinutes()} |</Text>
                                            <Text style={styles.name}>To: {workingDayCard.to.getHours() + ':' + workingDayCard.to.getMinutes()}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={[styles.touchableOpacity, { backgroundColor: "#f00", width: 35, height: 35, }]}
                                            onPress={() => {
                                                removeWorkingDay(workingDayCard.day, workingDayCard.from, workingDayCard.to);
                                            }}
                                        >
                                            <Icon style={[styles.newDay, { fontSize: 20 }]} name='trash-o' />
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginLeft: 5,
                                        }}>

                                    </View>
                                </View>
                            </View>
                        );
                    }) : null}
                </ScrollView>
                <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <Icon5 style={styles.newDay} name='calendar-plus' />
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    hardwareAccelerated={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
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
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {errorMessage2 != '' &&
                    <Text style={{ color: '#f00' }}>{errorMessage2}</Text>
                }
                <Pressable
                    onPress={() => {
                        AddNewReceptionist();
                    }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#55f' : '#1c1bad',
                            //borderWidth: pressed? 1: 0,
                        },
                        styles.button
                    ]}>
                    {({ pressed }) => (
                        <Text style={{ color: 'white' }}>
                            {/*pressed ? 'Pressed!' : 'Press Me'*/}
                            Add
                        </Text>

                    )}

                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        //marginBottom: 50,
    },
    view: {
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        marginTop: 10,
        // justifyContent: 'flex-start',
    },
    label: {
        flex: 1,
        color: 'black',
        fontSize: 15,
        padding: 10,
    },
    inputText: {
        flex: 2,
        padding: 5,
        marginRight: 10,
        borderBottomColor: 'blue',
        borderBottomWidth: 1,
        color: 'black',
        fontSize: 15,
    },
    slctbox: {
        flex: 1,
        padding: 10,
        margin: 10,
    },
    btnTxt: {
        color: 'white',
        fontSize: 15,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

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
    workingDay: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
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
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    name: {
        // fontSize: 18,
        // color: '#000',
        marginLeft: 5,
        // marginTop: 10,
        // textAlign: 'center'
    },

});

export default AddReceptionist;