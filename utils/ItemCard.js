import React, { memo } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const Item = (props) => {
    const date = new Date(props.item.date);
    return (
        <View style={styles.appointmentsCard}>
            <View style={styles.infoView}>
                <Text style={styles.infoText}>
                    Hospital Name: {props.item.hospital_Name}{' '}
                </Text>
                <Text style={styles.infoText}>Blood Type: {props.item.bloodType} </Text>
                <Text style={styles.infoText}>Date : {date.toLocaleDateString()} </Text>
                <Text style={styles.infoText}>Time : {date.toLocaleTimeString()} </Text>
            </View>
            <View style={styles.buttonView}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>ACCEPT</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    appointmentsCard: {
        flexDirection: 'column',
        width: '95%',
        height: 230,
        borderRadius: 15,
        backgroundColor: '#fff',
        alignSelf: 'center',
        margin: 4,
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        elevation: 2,
        overflow: 'hidden',
    },

    infoView: {
        flex: 1,
        flexDirection: 'column',
        height: '90%',
        alignSelf: 'center',
        // backgroundColor: '#fff',
        // marginTop:'2%',
        // marginBottom: '5%',
        justifyContent: 'center',
        margin: '1%',
    },
    infoText: {
        color: '#000',
        margin: 10,
        fontSize: 15,
    },
    buttonView: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2%',
    },
    buttonText: {
        color: '#fff',
        margin: 15,
        fontSize: 15,
    },
    button: {
        backgroundColor: '#0d259e',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: 160,
        color: '#fff',
    },
});

export default memo(Item);
