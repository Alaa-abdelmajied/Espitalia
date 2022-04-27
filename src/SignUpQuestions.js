import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import Svg, { Path } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';


export default function Questions({ navigation }) {

    const [diabetic, setDiabetic] = useState("no");
    const [bloodPressure, setBloodPressure] = useState("no");
    const [allergic, setAllergic] = useState("no");
    const [bloodType, setBloodType] = useState("a+");

    return (
        <ScrollView>
            <View style={styles.WaveHeader}>
                <Svg>
                    <Path
                        fill="#0d159e"
                        d='M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,197.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'
                    />

                </Svg>
            </View>
            <View style={styles.RegisterRegion}>
                <View style={styles.RegisterCard}>
                    <Text style={styles.TitleText}>
                        Questions
                    </Text>
                    <View style={styles.QuestionsRegion}>
                        <View style={styles.questionContainer}>
                            <Text style={styles.PickerText}>What is your blood type?</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={bloodType}
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
                                    <Picker.Item label="I don't know" value="idk" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.questionContainer}>
                            <Text style={styles.PickerText}>Are you diabetic?</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={diabetic}
                                    onValueChange={(itemValue, itemIndex) => setDiabetic(itemValue)}
                                >
                                    <Picker.Item label="Yes" value="yes" />
                                    <Picker.Item label="No" value="no" />
                                    <Picker.Item label="I don't know" value="idk" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.questionContainer}>
                            <Text style={styles.PickerText}>Do you have blood pressure problems?</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={bloodPressure}
                                    onValueChange={(itemValue, itemIndex) => setBloodPressure(itemValue)}
                                >
                                    <Picker.Item label="Yes" value="yes" />
                                    <Picker.Item label="No" value="no" />
                                    <Picker.Item label="I don't know" value="idk" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.questionContainer}>
                            <Text style={styles.PickerText}>Are you allergic to anything?</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={allergic}
                                    onValueChange={(itemValue, itemIndex) => setAllergic(itemValue)}
                                >
                                    <Picker.Item label="Yes" value="yes" />
                                    <Picker.Item label="No" value="no" />
                                    <Picker.Item label="I don't know" value="idk" />
                                </Picker>
                            </View>
                        </View>
                        {/* <TextInput style={[styles.pickerContainer, { width: 300, textAlign: 'center' }]} placeholder="enter your allergy">
                        </TextInput> */}
                    </View>
                    <Pressable style={styles.RegisterButton} onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'Patient' }],
                    })}>
                        <Text style={{ color: '#fff' }}>Sign up</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({


    WaveHeader: {
        // flex: 1,
        height: 200,
        width: '100%',
    },

    RegisterRegion: {
        width: '100%',
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center'
    },

    TitleText: {
        color: '#000',
        fontSize: 25,
        margin: '5%',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center'
    },

    QuestionsRegion: {
        justifyContent: 'center',
        alignItems: 'center',

    },

    questionContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },

    PickerText: {
        color: '#000',
        fontSize: 15,
    },

    pickerContainer: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 5,
        height: 50,
        width: 200,
        shadowColor: '#000000',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
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

    QuestionText: {
        color: '#000',
        margin: 10,
        // fontSize:15,
    },

    RegisterButton: {
        width: 130,
        margin: '5%',
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 10,
        backgroundColor: '#1c1bad',
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center'
        // color: '#fff'
    },


});
