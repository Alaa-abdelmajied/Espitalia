import React, {useState} from "react";
import {View, StyleSheet, Button, Text, Image} from 'react-native';

const Homepage = ({navigation}) => {
    /*const [items, setItems] = useState([
        {id: Math.random(), text: 'Milk'},
        {id: Math.random(), text: 'Eggs'},
        {id: Math.random(), text: 'Bread'},
        {id: Math.random(), text: 'Juice'},
      ]);
    
      const deleteItem = (id) => {
        setItems(prevItems => {
          return prevItems.filter(item => item.id !=id);
        });
      };
    
      const addItem = (text) => {
        if(!text){
          Alert.alert('Error','Please Enter an Item');
        }
        else{
          setItems(prevItems => {
            return [{id: Math.random(), text},...prevItems];
          });
        }
      };
    
      return (
        <View style={styles.container}>
          <Header />
          <AddItem addItem = {addItem}/>
          <FlatList
            data={items}
            renderItem={({item}) => <ListItem item={item} deleteItem={deleteItem} />}
          />
        </View>
      );*/

      const hospitalData = {
        id: 1,
        name: 'Andalosia',
        Address: ['Smouha'],
      };

      return(
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image source={{uri:'https://images.assets-landingi.com/ezfQc3bO/logo_01.png'}} style={styles.img} />  
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>Hospital:{'\t'} <Text style={styles.data}>{hospitalData.name}</Text></Text>
            
            <Text style={styles.label}>Adress:{'\t\t\t'} <Text style={styles.data}>{hospitalData.Address}</Text></Text>
          </View>
          
          <View style={styles.buttons}>
            <Button
              title="Doctors"
              color={'#1c1bad'}
              onPress={() => navigation.navigate('Doctors',hospitalData)}
            />
            <Button
              title="Reciptionists"
              color={'#1c1bad'}
              onPress={() => navigation.navigate('Reciptionist',hospitalData)}
            />
          </View>
          <Button
            title="Go to Profile"
            color={'#1c1bad'}
            onPress={() => navigation.navigate('Profile', {name:'Omar'})}
          />
        </View>
        
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    
  },
  logo: {
    alignContent: 'center',
    alignItems: 'center'
  },  
  img: {
    width: 139,
    height: 74,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    padding: 15,
  },
  label: {
    flex: 1,
    fontSize: 20,
    color: 'black',
    fontFamily: 'sans-serif',
  },
  buttons:{
    flex: 2,
    margin: 50,
    justifyContent: 'space-evenly'
  },
  button: {
    margin: 10,
  },
  data:{
    fontWeight: 'bold',
  },

});

export default Homepage;