import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Button, Pressable, ScrollView, Modal, Alert } from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon5 from 'react-native-vector-icons/dist/FontAwesome5';
import datePackage from 'date-and-time';

import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Server_URL, Token_Secret, Credintials_Secret } from '@env';
import { CommonActions, StackActions } from '@react-navigation/native';
// import validator from'validator';
const validator = require('validator');

//https://www.npmjs.com/package/react-native-multi-selectbox
//https://retool.com/blog/react-native-datepicker-libraries/
/*
dbachmann0@ning.com
n8RPhN
*/

const Day = ['Saterday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const AddDoctorPage = ({ navigation, route }) => {
    // const [specializationsObj, setSpecializationsObj] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    useEffect(() => {
        const getSpecialization = async () => {
            const token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
            // console.log('Getting Spec.');
            axios
                .get(`${Server_URL}:3000/hospital/getSpecializations`, {
                    headers: {
                        'x-auth-token': token
                    }
                })
                .then(function (response) {
                    // setSpecializations([...specializations, response.data]);
                    setSpecializations(response.data);
                    // console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        getSpecialization();
    }, []);
    // const [nameError, setNameError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessage2, setErrorMessage2] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const [today,] = useState(new Date());
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
        const currentDate = selectedDate || new Date(1999, 11, 31);
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
        // console.log("helloooo", newWorkingDays);
        return newWorkingDays;
    }

    const AddNewDoctor = async () => {
        if (name == '') setErrorMessage2('Enter Name');
        else if (email == '') setErrorMessage2('Enter Email');
        else if (selectedSpecialization == '') setErrorMessage2('Select Specialization');
        else if (date == today) setErrorMessage2('select a proper date');
        else if (workingDays.length == 0) setErrorMessage2('Make a working days');
        else if (emailError != '') null;
        else {
            setErrorMessage2('');
            const token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
            axios({
                method: 'post',
                url: `${Server_URL}:3000/hospital/addDoctor`,
                data: {
                    name: name,
                    userName: name,
                    specialization: selectedSpecialization,
                    email: email,
                    password: '123456789',
                    workingDays: makeValidWorkingDays()
                },
                headers: {
                    'x-auth-token': token
                }
            })
                .then(function (response) {
                    // console.log(response.data);
                    navigation.goBack();
                    // navigation.navigate("Doctors") 
                    // navigation.navigate("HosptialAdminHomePage") 
                    // navigation.dispatch(StackActions.popToTop());
                    // navigation.dispatch(
                    //     StackActions.replace('HosptialAdminHomePage', { screen: 'Home' })
                    // );
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    /*
    Create a function that create a compontent every time the plus button being pressed:
    Component : day - From - To
    this component return an object(workingday = {
                                                    day,
                                                    from,
                                                    to
                                                }
    )
    then we have a [workingDays, setWorkingDays] = useState([]) store all working days in array to save it in database
    
    
    */

    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                    <Text style={styles.label}>Name:</Text>
                </View>
                <Text style={{ color: '#000' }}>Dr.</Text>
                <TextInput style={styles.input} placeholder='ex.: Joe McLoy' onChangeText={text => setName(text)} />
            </View>
            <View style={styles.view}>
                <Text style={styles.label}>Email:</Text>
                <TextInput style={styles.input} placeholder='ex. jeo.McLoy@Gmail.com' onChangeText={text => {
                    setEmail(text);
                    if (!validator.isEmail(text)) setEmailError('! Invalid Email');
                    else setEmailError('');
                }} />
            </View>
            {emailError != '' &&
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#f00' }}>{emailError}</Text>
                </View>
            }

            <View style={styles.view}>
                <Text style={styles.label}>specialization:</Text>
                <SelectDropdown
                    renderDropdownIcon={() => <Ionicons
                        name={'chevron-down'}
                        size={20}
                        color={'#000'}
                    />}
                    dropdownBackgroundColor='#fff'
                    dropdownOverlayColor='transparent'
                    buttonStyle={[styles.dayInput, { width: 230 }]}
                    defaultButtonText='Specialization'
                    buttonTextStyle={{ color: '#a1a1a1', fontSize: 16 }}
                    data={specializations}
                    onSelect={(selectedItem, index) => {
                        setSelectedSpecialization(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                />
            </View>
            <View style={styles.view}>
                <Text style={styles.label}>Date of Birth:</Text>
                <View style={[{ justifyContent: 'center', width: 200 }]}>
                    <Button
                        title={text}
                        color={'#1c1bad'}
                        onPress={OpenDateWindow}
                    />
                    {show && (
                        <DateTimePicker
                            mode='date'
                            value={date}
                            maximumDate={new Date((today.getFullYear() - 25), 11, 31)}
                            onChange={handleDate}
                            isDatePickerVisible
                        />)}
                </View>
            </View>

            <ScrollView>
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
            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 50 }}>
                {errorMessage2 != '' &&
                    <Text style={{ color: '#f00' }}>{errorMessage2}</Text>
                }
                <Pressable
                    // onPress={() => { } }
                    onPress={AddNewDoctor}
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
        </View>
    );

};

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
    },
    label: {
        flex: 1,
        color: 'black',
        fontSize: 15,
        padding: 10,
    },
    input: {
        flex: 2,
        padding: 5,
        marginRight: 10,
        borderBottomColor: '#1c1bad',
        borderBottomWidth: 1,
        color: 'black',
        fontSize: 15,
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

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
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    newDay: {
        fontSize: 30,
        color: 'white',
    },
    addNewScheduleContainter: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
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
        // fontSize: 18,
        // color: '#000',
        marginLeft: 5,
        // marginTop: 10,
        // textAlign: 'center'
    },
});

export default AddDoctorPage;