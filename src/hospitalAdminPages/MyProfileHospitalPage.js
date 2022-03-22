import React, {useState} from "react";
import {View, Text, ScrollView, TextInput, Button, StyleSheet} from 'react-native';

const MyProfileHospitalPage = ({navigation, route}) => {

    return(
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.text}>Name:</Text>
                <TextInput style={styles.textInput} placeholder="Hospital"/>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Addresses</Text>
                <View style={styles.textInput}>
                    <TextInput placeholder="Address 1"/>
                    <TextInput placeholder="Address 2"/>
                    <TextInput placeholder="Address 3"/>
                    <TextInput placeholder="Address 4"/>
                </View>
            </View>
            <Button title="Save"/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        flex: 1,
    },
    textInput: {
        flex: 2,
    }
});

export default MyProfileHospitalPage;