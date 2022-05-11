import React, { useState } from 'react';
import {SafeAreaView, View, StyleSheet, Text, Input, TextInput, FlatList, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import ReceptionistCard from './ReceptionistCard' 

const Receptionistpage = ({navigation, route}) => {
    const [text,setText] = useState('');
    const onChange = (textValue) => setText(textValue);
    const [Reciptionists, setReciptionist] = useState([
        {name: 'Omar Shalaby', age: 40},
        {name: 'Nadeen el Gazzar', age: 45},
        {name: 'Maram Ghazal', age: 12},
        {name: 'Mayar Adel', age: 20},
        {name: 'Alaa Abdel Majied',age: 15}
    ]);
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <View>
                <TextInput placeholder='🔍Search' style={styles.input} onChangeText={onChange} />
            </View>
            <FlatList
                data={Reciptionists}
                renderItem={({item}) => <ReceptionistCard item={item} />}
            />
            <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={() => navigation.navigate('AddnewReceptionist')}
                >
                    <Icon style={styles.addButton} name='plus' />
                    
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
        backgroundColor: 'blue',
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

export default Receptionistpage;

