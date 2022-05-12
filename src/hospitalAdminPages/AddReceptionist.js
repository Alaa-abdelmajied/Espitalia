import React, { useState } from 'react';
import {View, Text, Button, SafeAreaView, StyleSheet, TextInput, Pressable, ScrollView, Modal } from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Day = ['Saterday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];

const AddReceptionist = ({navigation, route}) => {
    const today = new Date();
    const [text, setText] = useState('📅 DD/MM/YYYY');
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());

    const [fromText, setFromText] = useState('From');
    const [from, setFrom] = useState(new Date());
    const [toText, setToText] = useState('To');
    const [to, setTo] = useState(new Date());

    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);

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
        let fullDate = "📅 "+tmpDate.getDate()+"/"+(tmpDate.getMonth()+1)+"/"+tmpDate.getFullYear();
        setText(fullDate);
    }
    const handelFrom = (event, selectedTime) => {
        console.log(selectedTime);
        //const currentFrom = selectedTime || new Date();
        setShowFrom(false);
        const time = JSON.stringify(selectedTime).split('');
        const Time = time[12]+time[13]+time[14]+time[15]+time[16];
        setFromText(Time);
        setFrom(selectedTime);
    }
    const handelTo = (event, selectedTime) => {
        
        console.log('grenetsh');
        console.log(selectedTime);
        setShowTo(false);
        
        //selectedTime = datePackage.addHours(selectedTime,2);
        console.log('cairo');
        console.log(selectedTime);
        const time = JSON.stringify(selectedTime).split('');
        
        const Time = time[12]+time[13]+time[14]+time[15]+time[16];
        setToText(Time);
        setTo(selectedTime);
    }

    const [isSelectBoxVisible, setSelectBoxVisibility] = useState(false);
    const [SelectedDays, setSelectedDays] = useState([]);
    const [periodFrom, setPeriodFrom] = useState([]);
    const [periodTo, setPeriodTo] = useState([]);
    
    //const [selectedTeams, setSelectedTeams] = useState([]);
    function onMultiChange() {
        return (item) => setSelectedDays(xorBy(SelectedDays, [item], 'id'))
    }
    function onChangeFrom() {
        return (val) => setPeriodFrom(val)
    }
    function onChangeTo() {
        return (val) => setPeriodTo(val)
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.view}>
                <View style={{flexDirection: 'row',alignItems:'center',justifyContent:'space-between',flex:1 }}>
                    <Text style={styles.label}>Name:</Text> 
                </View>
                <TextInput style={styles.inputText} placeholder='ex. Yassmine' />
            </View>
            <View style={styles.view}>
                <Text style={styles.label}>Email:</Text>
                <TextInput style={styles.inputText} placeholder='ex. Yassmin@yahoo.com' />
            </View>
            <View style={styles.view}>
                <Text style={styles.label}>Department:</Text>
                <TextInput style={styles.inputText} placeholder='ex. South' />
            </View>
            <View style={styles.view}>
                <Text style={styles.label}>Date of Birth:</Text>
                <View style={[{justifyContent:'center', width: 200}]}>
                    <Button 
                    title={text} 
                    color='#1c1bad'
                    onPress={OpenDateWindow}
                    />
                    {show && (
                    <DateTimePicker
                    mode='date'
                    value={date}
                    maximumDate={new Date((today.getFullYear()-18),11,31)}
                    onChange={handleDate}
                    isDatePickerVisible
                    />)}
                </View>
            </View>
            <View style={styles.workingDay}>
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
                        console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                />
                <View style={{width:'100%', flexDirection:'row'}}>
                    <View style={styles.timeInput}>
                        <Button 
                        style={styles.dateInput}
                        title={fromText}
                        color={'#1c1bad'}
                        onPress={OpenFromWindow}
                        />
                    </View>
                    { showFrom &&
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

                    { showTo &&
                        <DateTimePicker
                        mode='time'
                        value={to}
                        onChange={handelTo}
                        />
                    }
                </View>
            </View>
            <View style={styles.addNewScheduleContainter}>
                <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={() => {console.log('add new Working Day')}}
                    >
                    <Icon style={styles.newDay} name='plus' />
                </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Pressable 
                onPress={() => {navigation.navigate("Reciptionist",{name:'hi'})}}
                style={({pressed}) => [
                {
                    backgroundColor: pressed? '#55f':'#1c1bad',
                    //borderWidth: pressed? 1: 0,
                },
                styles.button   
                ]}>
                    {({ pressed }) => (
                        <Text style={{color:'white'}}>
                            {/*pressed ? 'Pressed!' : 'Press Me'*/}
                            Add
                        </Text>
                        
                    )}
                    
                </Pressable>
            </View>
        </ScrollView>
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
        justifyContent: 'flex-start',
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
    button: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 5,
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
        //flex: 1,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        //borderWidth: 1,
        //borderColor: 'black',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 30,
    },
    dayInput:{
        width: '50%',
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
    timeInput:{
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
        width: 40,
        height: 40,
        borderRadius: 100,
        elevation: 10,
        
    },
    workingDay: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    newDay: {
        fontSize:25,
        color:'white',
    },
    addNewScheduleContainter: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    }
});

export default AddReceptionist;