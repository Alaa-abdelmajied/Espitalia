import React, { useState } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';


import { SearchBar } from 'react-native-elements';

export default function Search({ navigation }) {


    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
        setSearch(search);
    };
 

    return (
        <View style={styles.container}>
            <SearchBar
                lightTheme={true}
                placeholder="Search"
                onChangeText={updateSearch}
                value={search}
                containerStyle={{ backgroundColor: '#f0f0f0' }}
                inputContainerStyle={{ borderRadius: 50, backgroundColor: '#fff' }}
            />

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    formContent: {
        flexDirection: 'row',
        marginTop: 10,
    },

    header: {
        marginBottom: 5,
        height: '11%',
        backgroundColor: '#0d259e',
    },

    Image: {
        width: 80,
        height: 80,
        alignSelf: 'center'
        // marginTop:10,
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

    // notificationList: {
    //   marginTop: 0,
    //   padding: 0,
    // },

    specializationBox: {
        paddingTop: '2%',
        paddingBottom: '2%',
        // marginTop: 5,
        margin: '1%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 10,
    },

    image: {
        width: 45,
        height: 45,
        borderRadius: 20,
        marginLeft: 20
    },

    speciality: {
        fontSize: 20,
        color: "#000000",
        marginLeft: 10,
        alignSelf: 'center'
    },

    search: {
        borderRadius: 20,
        height: 50,
    }
});