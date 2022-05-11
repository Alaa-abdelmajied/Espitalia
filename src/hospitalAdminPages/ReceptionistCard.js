import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput,TouchableOpacity, Button} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import ScrollViewCommands from 'react-native/Libraries/Components/ScrollView/ScrollViewCommands';




const ReceptionistCard = ({item}) => {
  return (
    <TouchableOpacity style={styles.receptionistCard}>
        <View style={styles.receptionistView}>
            <View>
                <Text style={styles.receptionistText}>{item.name}</Text>
                <Text style={styles.receptionistText}>{item.age}</Text>
            </View>
            <Icon name='angle-double-right' style={styles.icon}/>

        </View>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  receptionistCard: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'gray',
    margin: 5,
    elevation: 5,
  },
  receptionistView: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  receptionistText: {
    fontSize: 15,
    color: 'black'
  },
  icon: {
    color: 'black',
    fontSize: 30,
  },
});

export default ReceptionistCard;