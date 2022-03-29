import { StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ChatHeader(props) {
    return (
        <ImageBackground style={styles.header} source={require('../assets/bg.jpg')} resizeMode="cover">
            <View style={{flex: 0.7, justifyContent: "flex-end"}}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.headerLower}>

                <TouchableOpacity style={styles.headerButton}>
                    <Text>Selling</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.headerButton}>
                    <Text>Buying</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.headerButton}>
                    <Text>Communities</Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    header: {
        height: windowHeight*0.2,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    title: {
        fontFamily: "TharLon",
        fontSize: windowHeight/45
    },
    headerButton: {

    },
    headerLower: {
        flex: 0.3, 
        width:windowWidth, 
        flexDirection:"row", 
        justifyContent:"space-around",
        alignItems:"flex-end",
        paddingBottom: windowHeight/80
    }
})
