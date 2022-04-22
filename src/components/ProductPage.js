import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProductPage(props) {
    return (
        <View style={styles.container}>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight*0.65,
        backgroundColor:"white"
    }
})