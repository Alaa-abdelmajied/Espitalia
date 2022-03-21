import React, { useRef } from "react";
import { useState } from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const images = [
  { id: 1, img: require("../../images/backg.jpg"), title: "Beautiful Coral Reef", color: "#0d259e" },
  { id: 2, img: require("../../images/backg.jpg"), title: "Beautiful Sea Wave", color: "#0d259e" },
  { id: 3, img: require("../../images/backg.jpg"), title: "Ice Galcier Mystery", color: "#0d259e" },
  { id: 4, img: require("../../images/backg.jpg"), title: "Wonderful Jelly fish Group", color: "#0d259e" },
  { id: 5, img: require("../../images/backg.jpg"), title: "Fresh Sea Water", color: "#0d259e" },
  { id: 6, img: require("../../images/backg.jpg"), title: "Sea the Universe", color: "#0d259e" },
]

const appointments = [
  { key: 1, date: 'Thurs. 9/3/2022', from: '14:00', to: '16:00', color: "#0d259e" },
  { key: 2, date: 'Sat. 11/3/2022', from: '11:00', to: '17:00', color: "#0d259e" },
  { key: 3, date: 'Sun. 12/3/2022', from: '11:00', to: '17:00', color: "#0d259e" },
  { key: 4, date: 'Tues. 14/3/2022', from: '16:00', to: '19:00', color: "#0d259e" },
  { key: 5, date: 'Wed.: 15/3/2022', from: '16:00', to: '19:00', color: "#0d259e" },
]

const Tab = createBottomTabNavigator();

// function HomeScreen() {

//   return (
//     // <ImageBackground style={styles.Image2} source={require('./images/Untitled.png')}>
//     <View style={styles.body}>
//       <Image style={styles.logo} source={require('../images/applogo-removebg-preview.png')}></Image>
//       <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>WELCOME TO ESBITALIA</Text>
//       <View style={styles.main}>
//         <Pressable onPress={() => navigation.navigate('LoginScreen')} style={styles.userButton} >
//           <Text style={styles.buttonText}> USER </Text>
//         </Pressable>
//         <Pressable style={styles.staffButton} onPress={() => navigation.navigate('StaffScreen')}>
//           <Text style={styles.buttonText2}> STAFF </Text>
//         </Pressable>
//       </View>
//     </View>

//     // </ImageBackground >
//   );

// }

export default function ProfileScreen({ navigation }) {


  const scrollX = useRef(new Animated.Value(0)).current;

  let { width: windowWidth, height: windowHeight } = useWindowDimensions();
  windowHeight = windowHeight - 300;

  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'
  const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'


  return (

    <View style={styles.container}>
      {/* <View style={styles.header2}>
        <Image style={styles.Image} source={require('../images/app_logo-removebg-preview.png')}></Image>
      </View> */}
      <View style={styles.headerContainer}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>Dr Ahmed</Text>
            <Text style={styles.info}>Dermatologist</Text>
            <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
            <View style={styles.customRatingBar}>
              {
                maxRating.map((item, key) => {
                  return (
                    <TouchableOpacity activeOpacity={0.7}
                      key={key}
                      onPress={() => setDefaultRating(item)}>
                      <Image style={styles.starImg} source={item <= defaultRating ? { uri: starImgFilled } : { uri: starImgCorner }}></Image>
                      {/* <Text> Rate is {item} / 5</Text> */}
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
          {/* </View> */}
        </View>
        {/* </LinearGradient> */}

      </View>

      {/* <View style={styles.textAreaContainer}>

        {appointments.map((image, cardIndex) => {

          const inputRange = [
            windowWidth * (cardIndex - 1),
            windowWidth * (cardIndex),
            windowWidth * (cardIndex + 1),
          ];
          return (
            <Animated.Text style={[styles.textView, {
              transform: [
                {
                  translateY: scrollX.interpolate({
                    inputRange,
                    outputRange: [-500, -50, 0],
                  })
                }
              ]
            }, {
              opacity: scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0]
              })
            }, {
              color: card.color
            }]}>
              {card.title}
            </Animated.Text>
          );
        })}

      </View> */}

      {/* <View style={[styles.scrollContainer, { height: windowHeight }]}> */}
      <View style={styles.scrollContainer}>

        <ScrollView
          horizontal={true}
          style={styles.scrollViewStyle}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >

          {appointments.map((card, cardIndex) => {
            return (
              <Animated.View
                style={{ width: windowWidth, }}
                key={cardIndex}
              >
                {/* <Image source={card.img} style={styles.card} /> */}
                <View style={styles.cards} key={cardIndex}>
                  <View style={styles.dateHeader} ><Text style={{ color: '#fff', fontSize: 20 }}>{card.date}</Text></View>
                  <View style={{ margin: 30, alignItems: 'center' }}>
                    <Text style={{ color: '#000', fontSize: 20 }}>From: {card.from}</Text>
                    <Text style={{ color: '#000', fontSize: 20 }}>To: {card.to}</Text>
                  </View>
                  <Pressable style={styles.SignUpButton} >
                    <Text style={{ color: '#fff' }} >Book</Text>
                  </Pressable>

                </View>

              </Animated.View>
            );
          })}

          {/* <View style={styles.cards}>

          </View> */}
        </ScrollView>

      </View>

      {/* for the dots */}
      <View style={styles.indicatorContainer}>

        {
          appointments.map((card, cardIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (cardIndex - 1),
                windowWidth * (cardIndex),
                windowWidth * (cardIndex + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: "clamp",
            })

            return (
              <Animated.View style={[styles.normalDots, { width }, { backgroundColor: card.color }]} />


            );
          })
        }

      </View>
      {/* <View style={{ height: 150, width: 100, backgroundColor: '#0f0'}}></View> */}
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: '#000'
  },

  headerContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    // backgroundColor: "#000",

  },

  header: {
    // flex: 1,
    backgroundColor: "#0d259e",
    height: 150,

  },
  avatar: {
    // flex: 1,
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#fff",
    //   "&:hover": {
    //     borderColor:"#000"
    // },
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 80,
  },

  body: {
    // flex: 1,
    flexDirection: 'column',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'#ff0',
  },
  bodyContent: {
    // flex: 1,
    // flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor:'#f0f',
    padding: 30,
    // marginTop:150,
  },
  name: {
    fontSize: 28,
    color: "#000",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#0d259e",
    marginTop: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: "#000",
    marginTop: 10,
    textAlign: 'center'
  },

  scrollContainer: {
    // flex:2,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: -10,
    },
    shadowOpacity: 1,
    // backgroundColor: '#ff0',
    height: 250,
    // marginTop: -50,
    // alignItems: 'center'
  },

  // card: {
  //   flex: 1,
  //   marginVertical: 10,
  //   width: 350,
  //   overflow: "hidden",
  //   alignSelf: "center",

  // },

  cards: {
    flex: 1,
    margin: 10,
    // marginTop: 10,
    // marginBottom: 10,
    width: 200,
    height: 250,
    overflow: "hidden",
    alignSelf: "center",
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 35,
    shadowColor: '#000000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 6,
  },

  dateHeader: {
    backgroundColor: '#0d259e',
    height: '25%',
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  normalDots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  textAreaContainer: {
    width: "100%",
    marginBottom: 10,
  },
  textView: {
    position: "absolute",
    fontSize: 22,
    // fontFamily: "Avenir",
    // fontWeight: "600",
    // textAlign: "center",
    // width: "100%"
    color: '#000', fontSize: 20, margin: 40,
  },

  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#0d259e",
  },

  SignUpButton: {
    width: 100,
    // marginTop:-30,
    // margin:40,
    paddingTop: 15,
    paddingBottom: 15,
    // marginLeft: 30,
    // marginRight: 30,
    borderRadius: 30,
    backgroundColor: '#0d259e',
    borderWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
    borderColor: '#fff',
    color: '#fff'
  },



  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },

  buttonText2: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },

  logo: {
    width: 200,
    height: 220,
    // resizeMode: 'cover'
    marginTop: 180,
  },

  Image2: {
    width: '100%',
    height: '100%',
  },

  main: {
    flexDirection: 'row',
  },

  userButton: {
    width: 130,
    marginTop: 30,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center'
  },

  staffButton: {
    width: 130,
    marginTop: 30,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#0d259e',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    // borderColor:'#000'
  },
  customRatingBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,

  },
  starImg: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
  header2: {
    height: '8%',
    backgroundColor: '#0d159e',
    justifyContent: 'center'
  },

  Image: {
    width: 50,
    height: 50,
    alignSelf: 'center'
    // marginTop:10,
  },

});

