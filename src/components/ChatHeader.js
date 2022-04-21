import { StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ChatHeader(props) {


    // States
    const [line, setLine] = useState(props.screen)

    useEffect(() => {
        props.nav.setParams({screen: line})
    }, [line])


    return (
        <View style={styles.header}>
            <View style={{flex: 0.7, justifyContent: "flex-end"}}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.headerLower}>

                <TouchableOpacity style={styles.headerButton} onPress={() => {setLine(0)}}>
                    <Text style={[styles.headerText, { color: line == 0 ? "#EDB219" : "#8D5B10"}]} >SELLING</Text>
                    <View style={[styles.headerUnderLine, {backgroundColor: line == 0 ? "#EDB219" : "transparent"}]}></View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.headerButton} onPress={() => {setLine(1); }} >
                    <Text style={[styles.headerText,{ color: line == 1 ? "#EDB219" : "#8D5B10"}]} >BUYING</Text>
                    <View style={[styles.headerUnderLine, {backgroundColor: line == 1 ? "#EDB219" : "transparent"}]}></View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.headerButton} onPress={() => {setLine(2)}}>
                    <Text style={[styles.headerText, { color: line == 2 ? "#EDB219" : "#8D5B10"}]} >COMMUNITIES</Text>
                    <View style={[styles.headerUnderLine, {backgroundColor: line == 2 ? "#EDB219" : "transparent"}]}></View>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: windowHeight*0.2,
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor:"#7f0001"
    },
    title: {
        fontFamily: "TharLon",
        fontSize: windowHeight/45,
        marginBottom: "4%",
        color: "#EDB219"
    },
    headerButton: {
        width: windowWidth/3,
        alignItems:"center",
        height: "100%",
        justifyContent: "center"
    },
    headerLower: {
        flex: 0.3, 
        width:windowWidth, 
        flexDirection:"row", 
        justifyContent:"space-around",
        alignItems:"flex-end",
    },
    headerText: {
        fontFamily: "TharLon",
    },
    headerUnderLine: {
        width: windowWidth/5, 
        height: 1, 
        marginTop: "5%"
    }
})
