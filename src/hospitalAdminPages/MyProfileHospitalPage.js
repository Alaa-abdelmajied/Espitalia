import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FlashMessage from 'react-native-flash-message';

import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Server_URL, Token_Secret } from '@env';

export default function MyProfileHospitalPage({ route, navigation }) {
    const { name, address, email } = route.params;
    console.log(name);
    const [newName, setNewName] = useState(name);
    const [newEmail, setNewEmail] = useState(email);
    const [newAddress, setNewAddress] = useState(address);

    //const [hospitalData, setHospitalData] = useState({});
    const editProfile = async () => {
        try {
            const token = JSON.parse(
                await EncryptedStorage.getItem(Token_Secret),
            ).token;
            console.log(token);
            console.log("wooow");
            axios
                .put(`${Server_URL}:3000/hospital/editProfile`, {
                    newName: newName,
                    newAddress: newAddress,
                    newEmail: newEmail,
                }, {
                    headers: {
                        'x-auth-token': token,
                    }
                })
                .then(async function (response) {
                    console.log('done');
                    showMessage({
                        message: 'Info updated successfully',
                        type: 'success',
                    });
                })
                .catch(function (error) {
                    const err = error.response.data;
                    console.log(err);
                });
        } catch (err) {
            Alert.alert('Error', err.code, [
                { text: 'Exit', onPress: () => BackHandler.exitApp() },
            ]);
        }
    };

    useEffect(() => {
        editProfile();
    }, []
    )
    return (
        <ScrollView>
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <FontAwesome
                            name={'id-card'}
                            size={20}
                            color={'#000'}></FontAwesome>
                        <Text style={styles.mainText}>Name</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder={name}
                        onChangeText={text => setNewName(text)}></TextInput>
                </View>


                <View style={styles.bodyContent}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <FontAwesome
                            name={'id-card'}
                            size={20}
                            color={'#000'}></FontAwesome>
                        <Text style={styles.mainText}>Address</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder={address}
                        onChangeText={text => setNewAddress(text)}></TextInput>
                </View>
                <Pressable style={styles.button} onPress={editProfile}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() => {
                    navigation.navigate('ChangePassword', {
                        profileChangePassword: true,
                        type:'hospital'
                    });
                }}>
                    <Text style={styles.buttonText}>Change password</Text>
                </Pressable>
            </View>
            <FlashMessage position="top" icon="auto" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    body: {
        marginTop: 10,
        alignItems: 'center',
    },
    bodyContent: {
        width: 380,
        flexDirection: 'column',
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainText: {
        color: '#000',
        fontSize: 18,
        alignSelf: 'center',
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#1c1bad',
        borderRadius: 5,
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 20,
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
    },



});