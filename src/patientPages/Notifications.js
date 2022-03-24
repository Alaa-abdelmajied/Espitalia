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
  TouchableOpacity,
} from 'react-native';
import Dialog from "react-native-dialog";


export default function Notification({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [Items, setItems] = useState([
    { key: '1', name: 'hospital name', msg: "message message message message" },
    { key: '2', name: 'Item 2', msg: "awte4h" },
    { key: '3', name: 'Item 3', msg: "e4hse46y" },
    { key: '4', name: 'Item 4', msg: "hgsefjjzrbzmrbhsjk" },
    { key: '5', name: 'Item 5', msg: "gfdjngdngfxjgnshg" },
    { key: '6', name: 'Item 6', msg: "kjdfjhtdkmhdtjgd" },
    { key: '7', name: 'Item 7', msg: "hjtdjgtdehtyjtedjykdf" },
    { key: '8', name: 'Item 8', msg: "hjdfjgdhgthgdg" },
    { key: '9', name: 'Item 999', msg: "hjdsgajkfasrgkajsrgdrzbgdrzbg,zdh" },
    { key: '10', name: 'Item 6', msg: "kjdfjhtdkmhdtjgd" },
    { key: '11', name: 'Item 7', msg: "hjtdjgtdehtyjtedjykdf" },
    { key: '12', name: 'Item 8', msg: "hjdfjgdhgthgdg" },
    { key: '13', name: 'Item 999', msg: "hjdsgajkfasrgkajsrgdrzbgdrzbg,zdh" },
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
    <View style={styles.container}>
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
          <TouchableOpacity style={styles.notificationsCard} onPress={showDialog}>
            {/* <View style={styles.textContainer}> */}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#0d259e', fontSize: 17, margin: '3%' }}>{item.name}</Text>
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
              <Text style={{ color: '#000', fontSize: 17 }}>{item.msg}</Text>
            </View>
            <Dialog.Container visible={visible}>
              <Dialog.Title>Blood Rquest</Dialog.Title>
              <Dialog.Description>
                notification details
              </Dialog.Description>
              <Dialog.Button label="Accept" onPress={handleAccept} />
              <Dialog.Button label="Ignore" onPress={handleIgnore} />
            </Dialog.Container>
            {/* </View> */}
          </TouchableOpacity>
        )}


      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    // height: '100%',
    // padding: 15,
    // backgroundColor: 'white',
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  notificationsCard: {
    // alignItems: 'center',
    // marginTop: 5,
    paddingTop: 9,
    paddingBottom: 9,
    margin: 4,
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

  textContainer: {
    height: 100,
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    width: '98%',
    borderRadius: 15,
    backgroundColor: "#ff0f",
  },
})