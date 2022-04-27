import React, { useState } from 'react';
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
} from 'react-native';

// import SearchBar from 'react-native-search-bar';
import { SearchBar } from 'react-native-elements';

export default function Speciality({ navigation }) {


  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  const data = [
    { id: 1, description: "Dermatology" },
    { id: 2, description: "Dentistry" },
    { id: 3, description: "Psychiatry" },
    { id: 4, description: "Pediatrics and New Born" },
    { id: 5, description: "Neurology" },
    { id: 6, description: "Orthopedics" },
    { id: 7, description: "Gynaecology and Infertility" },
    { id: 8, description: "Ear, Nose and Throat" },
    { id: 9, description: "Cardiology and Vascular Disease" },
    { id: 10, description: "Allergy and Immunology" },
    { id: 11, description: "Andrology and Male Infertility" },
    { id: 12, description: "Audiology" },
    { id: 13, description: "Cardiology and Thoracic Surgery" },
    { id: 14, description: "Chest and Respiratory" },
  ]

  const onPress = () => {
    navigation.navigate('DoctorsScreen');
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
      {/* <View style={styles.header}>
        <Image style={styles.Image} source={require('../images/app_logo-removebg-preview.png')}></Image>
      </View> */}
      <FlatList
        data={data}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.specializationCard} onPress={onPress}>
              {/* <View style={styles.specializationContainer} > */}
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image style={styles.image}
                  source={{ uri: "https://w7.pngwing.com/pngs/996/486/png-transparent-health-care-internal-medicine-physician-family-medicine-health-logo-dentistry-medicine.png " }} />
              </View>
              <View style={{ flex: 2, justifyContent: 'center' }}>

                <Text style={styles.speciality}>{item.description}</Text>
              </View>

              {/* </View> */}
            </TouchableOpacity>
          )
        }} />
    </View >
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  specializationCard: {
    // width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    // margin: '1%',
    margin: 3,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
  },

  specializationContainer:
  {
    flexDirection: 'row',
    width: '98%',
    justifyContent: 'center',
  }
  ,
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    margin: '3%'
  },

  speciality: {
    fontSize: 20,
    color: "#000",
  },

});