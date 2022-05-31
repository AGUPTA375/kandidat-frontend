import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from "react-native";

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function PrivateChats(props) {

    console.log(props)
    return(
        <View style={styles.container}>

            <TouchableOpacity onPress={() => props.navigation.navigate("UsrChat")}>
                <Text>
                    REEE
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight*0.77,
    }
})