import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable
} from 'react-native';

const data = [
  { id: 1, day: 1, month: 'Sep' },
  { id: 2, day: 2, month: 'Sep' },
  { id: 3, day: 3, month: 'Sep' },
  { id: 4, day: 4, month: 'Sep' },
  { id: 5, day: 5, month: 'Sep' },
  { id: 6, day: 6, month: 'Sep' },
  { id: 7, day: 7, month: 'Sep' },
  { id: 8, day: 8, month: 'Sep' },
  { id: 9, day: 9, month: 'Sep' },
];


export default function EventsView() {
  const [showModal, setShowModal] = useState(false);

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: [
  //       {id:1, day:1, month: 'Sep'}, 
  //       {id:2, day:2, month: 'Sep'}, 
  //       {id:3, day:3, month: 'Sep'}, 
  //       {id:4, day:4, month: 'Sep'}, 
  //       {id:5, day:5, month: 'Sep'}, 
  //       {id:6, day:6, month: 'Sep'}, 
  //       {id:7, day:7, month: 'Sep'},
  //       {id:8, day:8, month: 'Sep'},
  //       {id:9, day:9, month: 'Sep'},
  //     ],
  //   };
  // }

  // const eventClickListener = (viewId) => {
  //   Alert.alert("alert", "event clicked");
  // }

  return (
    <View style={styles.container}>
      <Modal
        visible={showModal}
        transparent
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modal}>
            <View style={styles.modalTitle}>
              <Text style={styles.text}>Enter</Text>
            </View>
            <View style={styles.modalBody}>
              {/* beaker and calender */}
              <TextInput style={styles.inputFeilds}
                placeholder='Comments'></TextInput>
            </View>

            <View style={styles.modalButton}>
              <Button title='Save' onPress={()=>setShowModal(false)}></Button>
            </View>
          </View>
        </View>
      </Modal>
   
      <View >
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'grey' : 'blue',
          },styles.button
        ]}
        onPress={() => setShowModal(true)}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>

      <FlatList
        enableEmptySections={true}
        style={styles.eventList}
        data={data}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => Alert.alert("alert", "event clicked")}>
              <View style={styles.eventBox}>
                <View style={styles.eventDate}>
                  <Text style={styles.eventDay}>{item.day}</Text>
                  <Text style={styles.eventMonth}>{item.month}</Text>
                </View>
                <View style={styles.eventContent}>
                  <Text style={styles.userName}>Request Donation</Text>
                  <Text style={styles.description}>Urgent case at Andalusia Hospital Blood type :AB+</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DCDCDC",
  },
  eventList: {
    marginTop: 20,
  },
  eventBox: {
    padding: 10,
    paddingTop:0,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
  },
  eventDate: {
    flexDirection: 'column',
  },
  eventDay: {
    fontSize: 50,
    color: "#0099FF",
    fontWeight: "600",
  },
  eventMonth: {
    fontSize: 16,
    color: "#0099FF",
    fontWeight: "600",
  },
  eventContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10
  },
  description: {
    fontSize: 15,
    color: "#646464",
  },
  eventTime: {
    fontSize: 18,
    color: "#151515",
  },
  userName: {
    fontSize: 16,
    color: "#151515",
  },
  modal: {
    width: 300,
    height: 300,
    backgroundColor: '#ffff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099'
  },
  modalTitle: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0099FF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  modalBody: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFeilds: {
    width: 200,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'flex-end',
    marginTop:10,
    marginRight:10,
  },
  buttonText: {
    fontSize: 50,
    color: 'white',
    //fontWeight:600,
  }  
});
