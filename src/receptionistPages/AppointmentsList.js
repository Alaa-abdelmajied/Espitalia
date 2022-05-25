import React, { useEffect, useState, useCallback } from 'react';
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
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon5 from 'react-native-vector-icons/dist/FontAwesome5';

import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Server_URL, Token_Secret, Credintials_Secret } from '@env';


export default function ContactsView({ navigation, route }) {
    // console.log(route.params.name);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAppointmentList().then(setRefreshing(false));
    }, []);

    const [appointmentsList, setAppointmentsList] = useState([]);
    // console.log(route.params.doctorID);
    var token;
    const getAppointmentList = async () => {
        console.log(Server_URL);
        token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
        axios({
            method: 'get',
            url: `${Server_URL}:3000/receptionist/getAppointmentsList/${route.params.doctorID}/${route.params.scheduleID}`,
            headers: {
                'x-auth-token': token
            }
        })
            .then(function (response) {
                // console.log(response.data);
                setAppointmentsList(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const deleteAppointment = async (appoint_id) => {
        const token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
        axios({
            method: 'delete',
            url: `${Server_URL}:3000/receptionist/cancelAppointment`,
            data: {
                appointmentID: appoint_id
            },
            headers: {
                'x-auth-token': token
            }
        })
        .then(function (response) {
            console.log(response.data);
            onRefresh();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        getAppointmentList();
    }, []);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            {appointmentsList.length != 0 ? appointmentsList.map((appointmentsListCard, cardIndex) => {
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
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 }}>
                                <View style={{ flexDirection: 'column', paddingTop: 5 }}>
                                    <Text style={styles.name}>Name: {appointmentsListCard.name}</Text>
                                    <Text style={styles.name}>Phone: {appointmentsListCard.phoneNumber}</Text>
                                    <Text style={styles.name}>Flow number: {appointmentsListCard.flowNumber}</Text>
                                </View>
                                <TouchableOpacity
                                    style={[styles.touchableOpacity, { backgroundColor: "#f00", width: 50, height: 50, }]}
                                    onPress={() => {deleteAppointment(appointmentsListCard._id)}}
                                >
                                    <Icon style={[styles.newDay, { fontSize: 25 }]} name='trash-o' />
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
            }) : <Text>No Appointment Found</Text>}
        </ScrollView>
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
        // alignSelf: 'center'
    },
    touchableOpacity: {
        backgroundColor: '#1c1bad',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: 70,
        height: 70,
        borderRadius: 100,
        elevation: 10,

    },
    newDay: {
        fontSize: 30,
        color: 'white',
    },
}); 