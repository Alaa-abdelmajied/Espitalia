import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Input, Image, TextInput, FlatList, TouchableOpacity, VirtualizedList } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import DoctorCard from './DoctorCard';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { normalizeRect } from 'react-native/Libraries/StyleSheet/Rect';

const Doctorspage = ({ navigation, route }) => {
    const [text, setText] = useState('');
    const onChange = (textValue) => setText(textValue);
    const [Doctors, setDoctor] = useState([
        { id: 1, name: 'Omar Shalaby', age: 22, specialization: 'mo5 w 23sab' },
        { id: 2, name: 'Nadeen el Gazzar', age: 45, specialization: 'asnan' },
        { id: 3, name: 'Maram Ghazal', age: 12, specialization: 'ta8zya' },
        { id: 4, name: 'Mayar Adel', age: 20, specialization: 'ay 7aga' },
        { id: 5, name: 'Alaa Abdel Majied', age: 15, specialization: 'Doctor w 5alas' },
        { id: 6, name: 'Omar Shalaby', age: 22, specialization: 'mo5 w 23sab' },
        { id: 7, name: 'Nadeen el Gazzar', age: 45, specialization: 'asnan' },
        { id: 8, name: 'Maram Ghazal', age: 12, specialization: 'ta8zya' },
        { id: 9, name: 'Mayar Adel', age: 20, specialization: 'ay 7aga' },
        { id: 10, name: 'Omar Shalaby', age: 22, specialization: 'mo5 w 23sab' },
        { id: 11, name: 'Nadeen el Gazzar', age: 45, specialization: 'asnan' },
        { id: 12, name: 'Maram Ghazal', age: 12, specialization: 'ta8zya' },
        { id: 13, name: 'Mayar Adel', age: 20, specialization: 'ay 7aga' },
        { id: 14, name: 'Alaa Abdel Majied', age: 15, specialization: 'Doctor w 5alas' },
        { id: 15, name: 'Alaa Abdel Majied', age: 15, specialization: 'Doctor w 5alas' },
        { id: 16, name: 'Alaa Abdel Majied', age: 15, specialization: 'Doctor w 5alas' },
        { id: 17, name: 'Omar Shalaby', age: 22, specialization: 'mo5 w 23sab' }
    ]);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.titleStyle}>
                    <TextInput placeholder='🔍Search' style={styles.input} onChangeText={onChange} />
                </View>
                <FlatList
                    data={Doctors}
                    renderItem={({ item }) => <DoctorCard item={item} />}
                />
                <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={() => navigation.navigate('AddnewDoctor')}
                >
                    <Icon style={styles.addButton} name='user-plus' />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    titleStyle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        height: 40,
        padding: 8,
        paddingLeft: 15,
        paddingRight: 15,
        margin: 5,
        fontSize: 16,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        color: 'black',
        elevation: 1,
    },
    touchableOpacity: {
        backgroundColor: '#1c1bad',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 100,
        right: 40,
        bottom: 40,
        elevation: 10,
        
    },
    addButton: {
        fontSize:30,
        color:'white',
    },

});

export default Doctorspage;