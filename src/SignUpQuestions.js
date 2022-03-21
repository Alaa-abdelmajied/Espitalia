import React, { useState } from 'react';

import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    SectionList,
    FlatList,
    RefreshControl,
    TextInput,
    Alert,
    ImageBackground,
    Pressable,
    Dimensions
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import Svg, { Path } from 'react-native-svg';
import { NavigationContainer } from '@react-navigation/native';

import {
    Colors,
    DebugInstructions,
    LearnMoreLinks,
    Header,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';


/***************** List *********************/


export default function Questions({ navigation }) {
    // const onPressHandler = () => {
    //     navigation.goBack();
    // }

    const [selectedValue, setSelectedValue] = useState("no");
    const [bloodType, setBloodType] = useState("a+");


    return (

        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={styles.body}>
                <Svg
                    height={200}
                    width={Dimensions.get('screen').width}
                >

                    <Path
                        fill="#0d259e"
                        d='M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,197.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'
                    />
                    {/* <Text style={styles.MainText}>
                        Sign Up
                    </Text> */}

                </Svg>
                {/* <Image style={styles.Image} source={require('../images/applogo-removebg-preview.png')}></Image> */}
                <View style={styles.cards}>
                    {/* <LinearGradient start={{x: 0, y: 0.75}} end={{x: 1, y: 0}} colors={[ '#09344d' , '#09344d' , '#09344d' , '#3096d1', '#3096d1']} style={styles.cards}> */}
                    <Text style={styles.MainText}>
                        Sign Up
                    </Text>



                    <View style={styles.QuestionsView}>
                        <View style={styles.container}>
                            <Text style={styles.PickerText}>Diabetic?</Text>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Yes" value="yes" />
                                <Picker.Item label="No" value="no" />
                                <Picker.Item label="I don't know" value="idk" />
                            </Picker>
                        </View>

                        <View style={styles.container}>
                            <Text style={styles.PickerText}>Blood Type</Text>

                            <Picker
                                bloodType={bloodType}
                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => setBloodType(itemValue)}
                            >
                                <Picker.Item label="A+" value="a+" />
                                <Picker.Item label="A-" value="a-" />
                                <Picker.Item label="B+" value="b+" />
                                <Picker.Item label="B-" value="b-" />
                                <Picker.Item label="O+" value="o+" />
                                <Picker.Item label="O-" value="o-" />
                                <Picker.Item label="AB+" value="ab+" />
                                <Picker.Item label="AB-" value="ab-" />
                                <Picker.Item label="Unknown" value="unknown" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.QuestionsView}>
                        <View style={styles.container}>
                            <Text style={styles.PickerText}>Allergic?</Text>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Yes" value="yes" />
                                <Picker.Item label="No" value="no" />
                                <Picker.Item label="I don't know" value="idk" />
                            </Picker>
                        </View>

                        <View style={styles.container}>
                            <Text style={styles.PickerText}>High Blood Pressure?</Text>

                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Yes" value="yes" />
                                <Picker.Item label="No" value="no" />
                                <Picker.Item label="I don't know" value="idk" />
                            </Picker>
                        </View>
                    </View>
                    <Pressable onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'Patient' }],
                    })}>
                        <Text style={styles.SignInButton}>Sign up</Text>
                    </Pressable>
                </View>
                {/* </LinearGradient> */}
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({

    body: {
        flex: 1,
        flexDirection: 'column',
        backgrundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        backgroundColor: '#fff',
        borderRadius: 45,
        margin: 10,
        height: 70,
        shadowColor: '#000000',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 1,

    },
    cards: {
        flex: 2,
        width: 350,
        height: '100%',
        margin: 10,
        alignSelf: 'center',
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 6,
        justifyContent: 'center',
    },


    view: {
        flex: 2,
        width: 380,
        height: '80%',
        marginBottom: 5,
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 25,
        // backgroundColor: '#0d259e',
        alignItems: 'center',
        // shadowColor: '#000000',
        // shadowOffset: { width: -2, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 3,
        // elevation: 6,
        justifyContent: 'center',
    },

    QuestionsView: {
        // flex: 1,
        width: 350,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },

    MainText: {
        textAlign: 'center',
        justifyContent: 'center',
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold',
        margin: 20,
        // fontWeight: 'bold'
    },
    Image: {
        width: 80,
        height: 80,
        // marginTop:10,
    },

    PickerText: {
        color: '#000',
        margin: 5,
        fontSize: 10,
    },
    QuestionText: {
        color: '#000',
        margin: 10,
        // fontSize:15,
    },

    SignInButton: {
        width: 130,
        marginTop: 30,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 30,
        backgroundColor: '#0d259e',
        borderWidth: 1,
        alignItems: 'center',
        textAlign: 'center',
        borderColor: '#0d259e',
        color: '#fff',
        shadowColor: '#000000',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 1,
    },

    input: {
        width: 330,
        borderRadius: 45,
        borderWidth: 1,
        textAlign: 'center',
        borderColor: '#fff',
        margin: 10,
        backgroundColor: '#f0f0f0',
        shadowColor: '#000000',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 1,
    }
});

