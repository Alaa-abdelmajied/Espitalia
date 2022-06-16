import React, { useState, useEffect } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    Modal,
    TextInput,
    Pressable,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from 'react-native-flash-message';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Server_URL, Token_Secret, Credintials_Secret } from '@env';

const patientAccordion = ({ item, navigation }) => {
    const [activeSections, setActiveSections] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([item]);

    console.log(data[0]);

    const endAppointment = async () => {
        try {
            const token = JSON.parse(
                await EncryptedStorage.getItem(Token_Secret),
            ).token;
            console.log(data[0].patients[activeSections[0]].appointmentID);
            await axios
                .post(`${Server_URL}:3000/doctor/endAppointments`, {
                    scheduleId: data[0].patients[activeSections[0]].scheduleID,
                    appointmentId: data[0].patients[activeSections[0]].appointmentID,
                    patientId: data[0].patients[activeSections[0]].patientID
                }, {
                    headers: {
                        'x-auth-token': token,
                    }
                })
                .then(response => {
                    console.log('here');
                    data[0].patients.splice(activeSections[0], 1);
                    setActiveSections([]);
                    showMessage({
                        message: 'Appointment ended',
                        type: 'success',
                    });
                    console.log(response.data);
                })
                .catch(function (error) {
                    if (error.response.data == 'no ongoing') {
                        showMessage({
                            message: 'There are no ongoing appointment',
                            type: 'warning',
                        });
                    }
                    console.log(error.response.data);
                });
        } catch (err) {
            Alert.alert('Error', err.code, [
                { text: 'Exit', onPress: () => BackHandler.exitApp() },
            ]);
        }
    };

    const onPressEntered = async () => {
        try {
            const token = JSON.parse(
                await EncryptedStorage.getItem(Token_Secret),
            ).token;
            console.log(data[0].patients[activeSections[0]].appointmentID);
            await axios
                .post(`${Server_URL}:3000/doctor/patientEntered`, {
                    scheduleId: data[0].patients[activeSections[0]].scheduleID
                }, {
                    headers: {
                        'x-auth-token': token,
                    }
                })
                .then(response => {
                    console.log('here');
                    showMessage({
                        message: 'Appointment started',
                        type: 'success',
                    });
                    console.log(response.data);
                })
                .catch(function (error) {
                    if (error.response.data == 'still ongoing') {
                        showMessage({
                            message: 'There are already an ongoing appointment',
                            type: 'warning',
                        });
                    }
                    console.log(error.response.data);
                });
        } catch (err) {
            Alert.alert('Error', err.code, [
                { text: 'Exit', onPress: () => BackHandler.exitApp() },
            ]);
        }
    };

    const setSections = sections => {
        setActiveSections(sections.includes(undefined) ? [] : sections);
    };

    const renderHeader = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={[styles.header, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
                flexDirection="row">
                <Text style={{ color: '#000', fontSize: 18 }}>Patient: </Text>

                <Text style={styles.headerText}>{section.patientName}</Text>
            </Animatable.View>
        );
    };

    const onPressHistory = () => {
        navigation.navigate('History', {
            patientId: data[0].patients[activeSections[0]].patientID,
            patientName: data[0].patients[activeSections[0]].patientName
        });
    };

    const renderContent = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={[styles.content, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor">
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Pressable style={{ backgroundColor: '#1c1bad', padding: 5 }}
                        onPress={onPressEntered}>
                        <Text style={{ color: '#fff' }}>Entered</Text>
                    </Pressable>
                    <Pressable
                        style={{ backgroundColor: '#1c1bad', padding: 5 }}
                        onPress={onPressHistory}>
                        <Text style={{ color: '#fff' }}>Show History</Text>
                    </Pressable>
                    <Pressable
                        style={{ backgroundColor: '#1c1bad', padding: 5 }}
                        onPress={() => setShowModal(true)}>
                        <Text style={{ color: '#fff' }}>Add Report</Text>
                    </Pressable>
                    <Pressable
                        style={{ backgroundColor: '#1c1bad', padding: 5 }}
                        onPress={endAppointment}>
                        <Text style={{ color: '#fff' }}>End Appointment</Text>
                    </Pressable>
                </View>
            </Animatable.View>
        );
    };

    const onPressSave = () => {
        setShowModal(false);
    };

    return (
        <View>
            <Modal
                visible={showModal}
                transparent
                onRequestClose={() => setShowModal(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modal}>
                        <View style={styles.modalTitle}>
                            <Text style={{ color: '#fff', fontSize: 25 }}>Enter</Text>
                        </View>
                        <View style={styles.modalBody}>
                            <TextInput
                                style={styles.inputFeilds}
                                placeholder="Report"></TextInput>
                            <TextInput
                                style={styles.inputFeilds}
                                placeholder="Prescription"></TextInput>
                        </View>
                        <View style={styles.modalButton}>
                            <Button title="Save" onPress={onPressSave}></Button>
                        </View>
                    </View>
                </View>
            </Modal>
            <Text>
                from: {data[0].from} To: {data[0].to}
            </Text>
            <Accordion
                activeSections={activeSections}
                sections={data[0].patients}
                touchableComponent={TouchableOpacity}
                expandMultiple={false}
                renderHeader={renderHeader}
                renderContent={renderContent}
                duration={400}
                onChange={setSections}
                renderAsFlatList={false}
            />
            <FlashMessage position="top" icon="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pageHeader: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20,
        backgroundColor: '#00ffff',
    },
    header_: {
        height: '8%',
        backgroundColor: '#0d159e',
        justifyContent: 'center',
    },

    Image: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        // marginTop:10,
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '700',
        color: 'bold',
        color: '#000',
        margin: '2%',

        // marginBottom: 20,
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    headerText: {
        //textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        color: '#0d159e',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },
    active: {
        // backgroundColor: 'rgba(100,255,255,1)',
        backgroundColor: '#f0f0f0',
    },
    inactive: {
        // backgroundColor: 'rgba(245,252,255,1)',
        backgroundColor: '#f0f0f0',
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    modal: {
        width: 300,
        height: 300,
        backgroundColor: '#ffffff',
        // borderWidth: 1,
        // borderColor: '#000',
        borderRadius: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    modalTitle: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0d159e',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        overflow: 'hidden',
    },
    modalBody: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputFeilds: {
        width: 200,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },

    accordionButtons: {
        backgroundColor: '#1c1bad',
        padding: 5,
    },
});

export default patientAccordion;
