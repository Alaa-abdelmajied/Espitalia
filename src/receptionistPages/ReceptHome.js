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
TouchableOpacity
} from 'react-native';

const data = [
  { id: 1, icon: "https://bootdey.com/img/Content/avatar/avatar1.png", description: "Dr Ahmed mohamed" },
  { id: 2, icon: "https://bootdey.com/img/Content/avatar/avatar2.png", description: "Dr Ahmed Yousry" },
  { id: 3, icon: "https://bootdey.com/img/Content/avatar/avatar3.png", description: "Dr Amira Amr" },
  { id: 4, icon: "https://bootdey.com/img/Content/avatar/avatar4.png", description: "Dr Mariam Mohamed" },
  { id: 5, icon: "https://bootdey.com/img/Content/avatar/avatar5.png", description: "Dr Layla Amir" },
  { id: 6, icon: "https://bootdey.com/img/Content/avatar/avatar6.png", description: "Dr karima mohamed" },
  { id: 7, icon: "https://bootdey.com/img/Content/avatar/avatar1.png", description: "Dr Amira Ali" },
  { id: 8, icon: "https://bootdey.com/img/Content/avatar/avatar2.png", description: "Dr Karma Slem" },
  { id: 9, icon: "https://bootdey.com/img/Content/avatar/avatar3.png", description: "Dr Nadia Khairy" },
  { id: 10, icon: "https://bootdey.com/img/Content/avatar/avatar4.png", description: "Dr Marwa Mohamed" },
  { id: 11, icon: "https://bootdey.com/img/Content/avatar/avatar5.png", description: "Dr Malak Amr" },
  { id: 12, icon: "https://bootdey.com/img/Content/avatar/avatar6.png", description: "Dr karima Ali" },
  { id: 13, icon: "https://bootdey.com/img/Content/avatar/avatar1.png", description: "Dr myriam selim" },
  { id: 14, icon: "https://bootdey.com/img/Content/avatar/avatar6.png", description: "Dr Layla mohamed" },
  { id: 15, icon: "https://bootdey.com/img/Content/avatar/avatar1.png", description: "Dr Mohamed Ali" },
  { id: 16, icon: "https://bootdey.com/img/Content/avatar/avatar2.png", description: "Dr Nayera Yousry" },
  { id: 17, icon: "https://bootdey.com/img/Content/avatar/avatar3.png", description: "Dr Yasmine Amr" },
  { id: 18, icon: "https://bootdey.com/img/Content/avatar/avatar4.png", description: "Dr Logine Mohamed" },
  { id: 19, icon: "https://bootdey.com/img/Content/avatar/avatar5.png", description: "Dr Marcelle Amir" },
  { id: 20, icon: "https://bootdey.com/img/Content/avatar/avatar6.png", description: "Dr Mayar mohamed" },
  { id: 21, icon: "https://bootdey.com/img/Content/avatar/avatar1.png", description: "Dr Anir Mohamed" },
];

export default function ContactsView({ navigation }) {

  const [nameAddress,setNameAddress] = useState('')
  return (
    <View style={styles.container}>
      <View style={styles.formContent}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            useref={'txtPassword'}
            placeholder="Search"
            underlineColorAndroid='transparent'
            onChangeText={(name_address) => setNameAddress(name_address)} />
        </View>
      </View>

      <FlatList
        style={styles.notificationList}
        data={data}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('doctorPage')}>
            <View style={styles.notificationBox}>
              <Image style={styles.image}
                source={{ uri: item.icon }} />

              <Text style={styles.name}>{item.description}</Text>
            </View>
            </TouchableOpacity>
          )
        }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  formContent: {
    flexDirection: 'row',
    marginTop: 10,
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
  notificationList: {
    marginTop: 0,
    padding: 0,
  },
  notificationBox: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
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
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#000000",
    marginLeft: 10,
    alignSelf: 'center'
  },
}); 