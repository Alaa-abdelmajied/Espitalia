import React, { useState } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    Modal,
    TextInput
} from 'react-native';
import * as Animatable from 'react-native-animatable';
// import NestedListView, { NestedRow } from 'react-native-nested-listview';

// // const DUMMY_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

// // const CONTENT = [
// //     {
// //         title: '17/3',
// //         content: DUMMY_TEXT,
// //     },
// //     {
// //         title: '18/3',
// //         content: DUMMY_TEXT,
// //     },
// //     {
// //         title: '19/3',
// //         content: DUMMY_TEXT,
// //     }
// // ];

const data = [
    {
        title: '17/3',
        items: ['Alaa','Maram']
    },
    {
        title: '18/3',
        items: ['Alaa','Nadeen']
    },
    {
        title: '19/3',
        items: ['Shalaby']
    }
]

export default function UpcomingReservations() {

    const [activeSections, setActiveSections] = useState([]);

    const setSections = (sections) => {
        setActiveSections(sections.includes(undefined) ? [] : sections);
    }

    const renderHeader = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={[styles.header, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >
                <Text style={styles.headerText}>{section.title}</Text>
            </Animatable.View>
        );
    }

    const renderContent = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={[styles.content, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >
                {section.items.map(name => <Text>{name}</Text>)}
            </Animatable.View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.pageHeader}>UpcomingReservations</Text>
                <Text style={styles.title}>Upcoming appointments</Text>
                <Accordion
                    activeSections={activeSections}
                    sections={data}
                    touchableComponent={TouchableOpacity}
                    expandMultiple={false}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    duration={400}
                    onChange={setSections}
                    renderAsFlatList={false}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    pageHeader: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20,
        backgroundColor: '#00ffff'
    },
    title: {
        textAlign: 'left',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20,
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    headerText: {
        //textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: 'rgba(100,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    }
});


// export default function UpcomingReservations() {
//     return(
//     <NestedListView
//         data={data}
//         getChildrenName={(node) => 'items'}
//         keepOpenedState={true}
//         renderNode={(node, level, isLastLevel) => (
//             <NestedRow
//                 level={level}
//                 style={styles.row}
//             >
//                 <Text>{node.title}</Text>
//             </NestedRow>
//         )}
//     />
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F5FCFF',
//     },
//     pageHeader: {
//         textAlign: 'center',
//         fontSize: 22,
//         fontWeight: '700',
//         marginBottom: 20,
//         backgroundColor: '#00ffff'
//     },
//     title: {
//         textAlign: 'left',
//         fontSize: 22,
//         fontWeight: '700',
//         marginBottom: 20,
//     },
//     header: {
//         backgroundColor: '#F5FCFF',
//         padding: 10,
//     },
//     headerText: {
//         //textAlign: 'center',
//         fontSize: 16,
//         fontWeight: '500',
//     },
//     content: {
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     active: {
//         backgroundColor: 'rgba(100,255,255,1)',
//     },
//     inactive: {
//         backgroundColor: 'rgba(245,252,255,1)',
//     },
//     selectors: {
//         marginBottom: 10,
//         flexDirection: 'row',
//         justifyContent: 'center',
//     },
//     selector: {
//         backgroundColor: '#F5FCFF',
//         padding: 10,
//     },
//     modal: {
//         width: 300,
//         height: 300,
//         backgroundColor: '#ffffff',
//         borderWidth: 1,
//         borderColor: '#000',
//         borderRadius: 20,
//     },
//     centeredView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#00000099'
//     },
//     modalTitle: {
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#ff0',
//         borderTopRightRadius: 20,
//         borderTopLeftRadius: 20,
//     },
//     modalBody: {
//         height: 200,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     modalButton: {
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     inputFeilds: {
//         width: 200,
//         borderWidth: 1,
//         borderColor: '#555',
//         borderRadius: 5,
//         textAlign: 'center',
//         fontSize: 20,
//         marginBottom: 10,
//     }
// });