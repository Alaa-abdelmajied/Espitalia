import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput,TouchableOpacity, Button} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';



const DoctorCard = ({item}) => {
  return (
    <TouchableOpacity style={styles.doctorCard}>
        <View style={styles.doctorView}>
            <View>
                <Text style={styles.doctorText}>{item.name}</Text>
                <Text style={styles.doctorText}>{item.age}</Text>
                <Text style={styles.doctorText}>{item.specialization}</Text>
            </View>
            <Icon name='angle-double-right' style={styles.icon}/>

        </View>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
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

export default DoctorCard;