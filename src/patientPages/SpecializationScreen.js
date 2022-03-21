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
    { id: 1, icon: "https://w7.pngwing.com/pngs/996/486/png-transparent-health-care-internal-medicine-physician-family-medicine-health-logo-dentistry-medicine.png", description: "Dermatology" },
    { id: 2, icon: "https://w7.pngwing.com/pngs/996/486/png-transparent-health-care-internal-medicine-physician-family-medicine-health-logo-dentistry-medicine.png", description: "Dentistry" },
    { id: 3, icon: "https://w7.pngwing.com/pngs/996/486/png-transparent-health-care-internal-medicine-physician-family-medicine-health-logo-dentistry-medicine.png", description: "Psychiatry" },
    { id: 4, icon: "https://w7.pngwing.com/pngs/996/486/png-transparent-health-care-internal-medicine-physician-family-medicine-health-logo-dentistry-medicine.png", description: "Pediatrics and New Born" },
    { id: 5, icon: "https://w7.pngwing.com/pngs/996/486/png-transparent-health-care-internal-medicine-physician-family-medicine-health-logo-dentistry-medicine.png", description: "Neurology" },
    { id: 6, icon: "https://w7.pngwing.com/pngs/996/486/png-transparent-health-care-internal-medicine-physician-family-medicine-health-logo-dentistry-medicine.png", description: "Orthopedics" },
    { id: 7, icon: "https://w7.pngwing.com/pngs/996/486/png-transparent-health-care-internal-medicine-physician-family-medicine-health-logo-dentistry-medicine.png", description: "Gynaecology and Infertility" },
    { id: 8, icon: "https://w7.pngwing.com/pngs/996/486/png-transparent-health-care-internal-medicine-physician-family-medicine-health-logo-dentistry-medicine.png", description: "Ear, Nose and Throat" },
    { id: 9, icon: "https://w7.pngwing.com/pngs/996/486/png-transparent-health-care-internal-medicine-physician-family-medicine-health-logo-dentistry-medicine.png", description: "Cardiology and Vascular Disease" },
    { id: 10, icon: "https://w7.pngwing.com/pngs/996/486/png-transparent-health-care-internal-medicine-physician-family-medicine-health-logo-dentistry-medicine.png", description: "Allergy and Immunology" },
    { id: 11, icon: "https://w7.pngwing.com/pngs/996/486/png-transparent-health-care-internal-medicine-physician-family-medicine-health-logo-dentistry-medicine.png", description: "Andrology and Male Infertility" },
    { id: 12, icon: "https://w7.pngwing.com/pngs/996/486/png-transparent-health-care-internal-medicine-physician-family-medicine-health-logo-dentistry-medicine.png", description: "Audiology" },
    { id: 13, icon: "https://w7.pngwing.com/pngs/996/486/png-transparent-health-care-internal-medicine-physician-family-medicine-health-logo-dentistry-medicine.png", description: "Cardiology and Thoracic Surgery" },
    { id: 14, icon: "https://w7.pngwing.com/pngs/996/486/png-transparent-health-care-internal-medicine-physician-family-medicine-health-logo-dentistry-medicine.png", description: "Chest and Respiratory" },
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
            <TouchableOpacity style={styles.specializationBox} onPress={onPress}>
              <Image style={styles.image}
                source={{ uri: item.icon }} />
              <Text style={styles.speciality}>{item.description}</Text>
            </TouchableOpacity>
          )
        }} />
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