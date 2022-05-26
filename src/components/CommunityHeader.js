import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CommunityHeader(props) {
    return (
        <View style={styles.container}>

            <View style={styles.headerSides}>
                <TouchableOpacity onPress={() => props.nav.goBack()}>
                    <AntDesign name="left" size={windowHeight*0.045} color="#EDB219" />
                </TouchableOpacity>

            </View>

            <View style={styles.headerMid}>
                <Text style={styles.goldText}>{props.title}</Text>
            </View>

            <View style={styles.headerSides}>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight*0.1,
        backgroundColor:"#7f0001",
        flexDirection:"row",
        alignItems:"center",
        justifyContent: "space-evenly"
    },
    headerSides: {
        width: windowWidth*0.2,
        height: windowHeight*0.1,
        justifyContent:"center",
        alignItems: "center"
    },
    headerMid: {
        width: windowWidth*0.6,
        height: windowHeight*0.1,
        justifyContent:"center",
        alignItems:"center"
    },
    goldText: { 
        color: "#EDB219", 
        fontSize:windowHeight*0.03, 
        fontWeight:"bold"
    },
})