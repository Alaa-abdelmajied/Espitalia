import React, {useState} from 'react';
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
import Dialog from 'react-native-dialog';

export default function Notification({navigation}) {
  const [visible, setVisible] = useState(false);
  const [Items, setItems] = useState([
    {
      key: '1',
      name: 'Royal Hospital',
      msg: 'notification content',
      date: '22/3/2022',
    },
    {
      key: '2',
      name: 'Al Andalusia',
      msg: 'notification content',
      date: '22/3/2022',
    },
    {
      key: '3',
      name: 'Alex Sydney',
      msg: 'notification content',
      date: '22/3/2022',
    },
    {
      key: '4',
      name: 'German Hospital',
      msg: 'notification content',
      date: '22/3/2022',
    },
    {
      key: '5',
      name: 'Middle East Hospital',
      msg: 'notification content',
      date: '22/3/2022',
    },
    {
      key: '6',
      name: 'Hospital Name',
      msg: 'notification content',
      date: '22/3/2022',
    },
    {
      key: '7',
      name: 'Hospital Name',
      msg: 'notification content',
      date: '22/3/2022',
    },
    {
      key: '8',
      name: 'Hospital Name',
      msg: 'notification content',
      date: '22/3/2022',
    },
    {
      key: '9',
      name: 'Hospital Name',
      msg: 'notification content',
      date: '22/3/2022',
    },
    {
      key: '10',
      name: 'Hospital Name',
      msg: 'notification content',
      date: '22/3/2022',
    },
    {
      key: '11',
      name: 'Hospital Name',
      msg: 'notification content',
      date: '22/3/2022',
    },
    {
      key: '12',
      name: 'Hospital Name',
      msg: 'notification content',
      date: '22/3/2022',
    },
    {
      key: '13',
      name: 'Hospital Name',
      msg: 'notification content',
      date: '22/3/2022',
    },
  ]);

  const showDialog = () => {
    setVisible(true);
  };

  const handleAccept = () => {
    setVisible(false);
  };

  const handleIgnore = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Items}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.notificationsCard}
            onPress={showDialog}>
            {/* <View style={styles.textContainer}> */}
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#1c1bad', fontSize: 17, margin: '3%'}}>
                {item.name}
              </Text>
              <Text style={{color: '#000', fontSize: 13}}>
                Date: {item.date}
              </Text>
            </View>
            <View
              style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#000', fontSize: 17}}>{item.msg}</Text>
            </View>
            <Dialog.Container visible={visible}>
              <Dialog.Title>Blood Rquest</Dialog.Title>
              <Dialog.Description>notification details</Dialog.Description>
              <Dialog.Button label="Accept" onPress={handleAccept} />
              <Dialog.Button label="Ignore" onPress={handleIgnore} />
            </Dialog.Container>
            {/* </View> */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
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
    backgroundColor: '#ff0f',
  },
});
