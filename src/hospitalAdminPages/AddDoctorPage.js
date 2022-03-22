import React, { useState } from 'react';
import {View, Text, SafeAreaView, StyleSheet, TextInput, Button, Pressable, ScrollView, Modal, Alert} from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import DateTimePicker from '@react-native-community/datetimepicker';



//https://www.npmjs.com/package/react-native-multi-selectbox
//https://retool.com/blog/react-native-datepicker-libraries/

const AMPM = [
    {
        item: 'AM',
        id: 'am'
    },
    {
        item: 'PM',
        id: 'pm'
    }
];
const Days = [
    {
      item: 'Saterday',
      id: 'Sat',
    },
    {
      item: 'Sunday',
      id: 'Sun',
    },
    {
      item: 'Monday',
      id: 'Mon',
    },
    {
      item: 'Tuesday',
      id: 'Tues',
    },
    {
      item: 'Wednesday',
      id: 'Wed',
    },
    {
      item: 'Thursday',
      id: 'Thurs',
    },
    {
      item: 'Friday',
      id: 'Fri',
    },
  ]
  

const AddDoctorPage = ({navigation, route}) => {
    const today = new Date();
    const [text, setText] = useState('📅 DD/MM/YYYY');
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());

    const OpenDateWindow = () => {
        setShow(true);
    }
    const handleDate = (event, selectedDate) => {
        const currentDate = selectedDate || new Date(1999,11,31);
        setShow(false);
        setDate(currentDate);

        let tmpDate = new Date(currentDate);
        let fullDate = "📅 "+tmpDate.getDate()+"/"+(tmpDate.getMonth()+1)+"/"+tmpDate.getFullYear();
        setText(fullDate);
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

    return (
        <ScrollView style={styles.container}>
            <View style={styles.view}>
                <View style={{flexDirection: 'row',alignItems:'center',justifyContent:'space-between',flex:1 }}>
                    <Text style={styles.label}>Name:</Text> 
                </View>
                <Text style={{color: '#000'}}>Dr.</Text>
                <TextInput style={styles.input} placeholder='ex.: Joe McLoy' />
            </View>
            <View style={styles.view}>
                <Text style={styles.label}>Email:</Text>
                <TextInput style={styles.input} placeholder='ex. jeo.McLoy@Gmail.com' />
            </View>
            <View style={styles.view}>
                <Text style={styles.label}>specialization:</Text>
                <TextInput style={styles.input} placeholder='ex. Ophthalmologists' />
            </View>
            <View style={styles.view}>
                <Text style={styles.label}>Date of Birth:</Text>
                <View style={[{justifyContent:'center', width: 200}]}>
                    <Button 
                    title={text} 
                    color={'#1c1bad'}
                    onPress={OpenDateWindow}
                    />
                    {show && (
                    <DateTimePicker
                    mode='date'
                    value={date}
                    maximumDate={new Date((today.getFullYear()-25),11,31)}
                    onChange={handleDate}
                    isDatePickerVisible
                    />)}
                </View>
            </View>
            
            <View style={styles.view}>
                <Text style={styles.label}>Days:</Text>
                <View style={[{justifyContent:'center', width: 200}]}>
                    <Button
                    title={'Pick Days'}
                    color={'#1c1bad'}
                    onPress={() => {setSelectBoxVisibility(!isSelectBoxVisible)}}
                    />
                    
                </View>
            </View>
            <Modal
            animationType='slide'
            transparent={true}
            visible={isSelectBoxVisible}
            onRequestClose={() => {
                //Alert.alert("Modal has been Closed");
                setSelectBoxVisibility(!isSelectBoxVisible);
            }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <SelectBox
                            width='50%'
                            label=""
                            arrowIconColor='#1c1bad'
                            searchIconColor='#1c1bad'
                            toggleIconColor='#1c1bad'
                            multiOptionContainerStyle={{backgroundColor:'blue',}}
                            containerStyle={{width: 200}}
                            
                            options={Days}
                            selectedValues={SelectedDays}
                            onMultiSelect={onMultiChange()}
                            onTapClose={onMultiChange()}
                            hideInputFilter={true}
                            isMulti
                            inputPlaceholder='Select Days'
                        />
                        <Pressable style={({pressed}) => [
                        {
                            backgroundColor: pressed? '#55f':'#1c1bad',
                            //borderWidth: pressed? 1: 0,
                        },
                        styles.button   
                        ]}
                        onPress={() => {setSelectBoxVisibility(!isSelectBoxVisible)}}
                        >
                            {({ pressed }) => (
                                <Text style={{color:'white'}}>
                                    {/*pressed ? 'Pressed!' : 'Press Me'*/}
                                    Done
                                </Text>
                                
                            )}
                            
                        </Pressable>
                    </View>
                </View>
            </Modal>
            
            <View style={styles.view}>
                <Text style={styles.label}>From: </Text>
                <TextInput style={styles.input} placeholder='8:00' />
                <SelectBox
                    width='20%'
                    label=""
                    selectedValues={AMPM[1]}
                    options={AMPM}
                    arrowIconColor='#1c1bad'
                    value={periodFrom}
                    onChange={onChangeFrom()}
                    hideInputFilter={true}
                    inputPlaceholder='AM'
                    style={styles.slctbox}
                />
            </View>
            <View style={styles.view}>
                <Text style={styles.label}>To: </Text>
                <TextInput style={styles.input} placeholder='5:00' />
                <SelectBox
                    width='20%'
                    label=""
                    options={AMPM}
                    arrowIconColor='#1c1bad'
                    value={periodTo}
                    onChange={onChangeTo()}
                    hideInputFilter={true}
                    inputPlaceholder='AM'
                />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Pressable
                onPress={() => {navigation.navigate("Doctors",{name:'hi'})}}
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
    }
});

export default AddDoctorPage;