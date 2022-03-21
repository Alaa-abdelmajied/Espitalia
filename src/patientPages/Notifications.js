import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  SectionList,
  RefreshControl,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Dialog from "react-native-dialog";


export default function Notification({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [Items, setItems] = useState([
    { key: '1', name: 'hospital name', msg: "message" },
    { key: '2', name: 'Item 2', msg: "awte4h" },
    { key: '3', name: 'Item 3', msg: "e4hse46y" },
    { key: '4', name: 'Item 4', msg: "hgsefjjzrbzmrbhsjk" },
    { key: '5', name: 'Item 5', msg: "gfdjngdngfxjgnshg" },
    { key: '6', name: 'Item 6', msg: "kjdfjhtdkmhdtjgd" },
    { key: '7', name: 'Item 7', msg: "hjtdjgtdehtyjtedjykdf" },
    { key: '8', name: 'Item 8', msg: "hjdfjgdhgthgdg" },
    { key: '9', name: 'Item 999', msg: "hjdsgajkfasrgkajsrgdrzbgdrzbg,zdh" },
  ])

  const showDialog = () => {
    setVisible(true);
  };

  const handleAccept = () => {
    setVisible(false);
  };

  const handleIgnore = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };


  return (
    <FlatList
      data={Items}
      renderItem={({ item }) => (
        //  <View style={StyleSheet.container} >
        //    <View style={{flexDirection:'row',marginLeft:10}}>
        //      <Text style={{color:'#1B6ADF',fontSize:15}}>{item.name /n}</Text>
        //     <View>
        //      <Text style={{color:'#646768'}}>{item.msg}</Text>
        //      </View>
        //    </View>
        //  </View>
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={showDialog}>
          <View style={styles.buttonContainer}>
            <Text style={{ color: '#5f9ea0', fontSize: 15, marginLeft: 10 }}>{item.name}    </Text>
            <Text>{item.msg}</Text>
            <Dialog.Container visible={visible}>
              <Dialog.Title>Blood Rquest</Dialog.Title>
              <Dialog.Description>
                notification details
              </Dialog.Description>
              <Dialog.Button label="Accept" onPress={handleAccept} />
              <Dialog.Button label="Ignore" onPress={handleIgnore} />
            </Dialog.Container>
          </View>
        </TouchableOpacity>
      )}


    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 0,
    height: 100,
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: "100%",
    borderRadius: 15,
    backgroundColor: "#f0f8ff",
  },
})