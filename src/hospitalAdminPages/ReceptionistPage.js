import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Input, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import ReceptionistCard from './ReceptionistCard'

import axios from "axios";
import EncryptedStorage from 'react-native-encrypted-storage';
import { Server_URL, Token_Secret, Credintials_Secret } from '@env';

const Receptionistpage = ({ navigation, route }) => {
    const [recepitionists, setRecepitionists] = useState();

    const getReceptionists = async () => {
        const token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
        // console.log('token',token);
        axios
            .get(`${Server_URL}:3000/hospital/viewReceptionists`, {
                headers: {
                    'x-auth-token': token
                }
            })
            .then(function (response) {
                // console.log(response.data);
                setRecepitionists(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {  
        getReceptionists();
    }, []);

    const recepitionistSearch = async (search) => {
        const token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
         //console.log(token);
        axios
            .get(`${Server_URL}:3000/hospital//searchReceptionist/${search}`, {
                headers: {
                    'x-auth-token': token
                }
            })
            .then(response => {
                setRecepitionists(response.data);
            })
            .catch(function (error) {
                const err = error.response.data;
                if (err == 'No Receptionists found') {
                    setRecepitionists([]);
                }
            });
    }

    const updateSearch = search => {
        console.log(search);
        if (search.length > 0) {
            recepitionistSearch(search);
        } else {
            getReceptionists();
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View>
                    <TextInput placeholder='🔍Search' style={styles.input} onChangeText={value => updateSearch(value)} />
                </View>
                <FlatList
                    data={recepitionists}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={styles.doctorCard} onPress={() => navigation.navigate('ReceptionistProfile', item)}>
                            <View style={styles.doctorView}>
                                <View>
                                    <Text style={styles.doctorText}>{item.name}</Text>
                                    <Text style={styles.doctorText}>{item.specialization}</Text>
                                </View>
                                <Icon name='angle-double-right' style={styles.icon} />

                            </View>
                        </TouchableOpacity>
                    }
                />
                <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={() => navigation.navigate('AddnewReceptionist')}
                >
                    <Ionicons style={styles.addButton} name='ios-person-add' />

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
        fontSize: 30,
        color: 'white',
    },
    doctorCard: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'gray',
        margin: 5,
        elevation: 5,
    },
    doctorView: {
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    doctorText: {
        fontSize: 15,
        color: 'black'
    },
    icon: {
        color: 'black',
        fontSize: 30,
    },

});

export default Receptionistpage;

