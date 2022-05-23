import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    Alert,
    ScrollView,
    TextInput,
    FlatList,
    TouchableOpacity
} from 'react-native';

import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Server_URL, Token_Secret, Credintials_Secret } from '@env';


export default function ContactsView({ navigation, route }) {
    // console.log(route.params.name);
    console.log(Server_URL);
    const [doctors, setDoctors] = useState([]);
    const [dataChanged, setDataChanged] = useState(true);
    var token;
    const getDoctorsWithSpecificSpecialization = async () => {
        token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
        console.log("..",route.params.name);
        // console.log(token);
        // console.log('hi');

        axios({
            method: 'get',
            url: `${Server_URL}:3000/receptionist/getDoctorsWithSpecificSpecialization/${route.params.name}`,
            headers: {
                'x-auth-token': token
            }
        })
            .then(function (response) {
                console.log(response.data);
                setDoctors(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        if (dataChanged) {
            getDoctorsWithSpecificSpecialization();
            setDataChanged(false);
        }
    });

    const [nameAddress, setNameAddress] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.formContent}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        useref={'txtPassword'}
                        placeholder="Search"
                        underlineColorAndroid='transparent'
                        onChangeText={(name_address) => setNameAddress(name_address)} />
                </View>
            </View>

            <FlatList
                style={styles.notificationList}
                data={doctors}
                keyExtractor={(item) => {
                    return item._id.toString();
                }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('DoctorPage', { id: item._id })}>
                            <View style={styles.notificationBox}>

                                <Text style={styles.name}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEBEB',
    },
    formContent: {
        flexDirection: 'row',
        marginTop: 10,
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderBottomWidth: 1,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        margin: 10,
    },
    icon: {
        width: 30,
        height: 30,
    },
    iconBtnSearch: {
        alignSelf: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        marginLeft: 15,
        justifyContent: 'center'
    },
    notificationList: {
        height: '100%',
        marginTop: 0,
        padding: 0,
    },
    notificationBox: {
        margin: 10,
        height: 80,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 5,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 10,
        elevation: 4,
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 20,
        marginLeft: 20
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#000000",
        marginLeft: 10,
        alignSelf: 'center'
    },
}); 