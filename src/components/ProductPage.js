import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { fetchUserInfo } from "../data";

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProductPage(props) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        fetchUserInfo(props.product.UserID, setUser)
    }, [])

    useEffect(() => {
        user !== null ? console.log(user) : {}
    }, [user])

    if (user === null) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.sellerinfo}>
                    <Text style={{ fontSize: windowHeight*0.03}}>{user.Name}</Text>
                </View>

                <View style={styles.img} >
                    <Text>PRODUCT IMAGE</Text>
                </View>

                <View style={styles.description} >
                    <Text style={{ fontSize:windowHeight*0.035 }}>{props.product.Price} kr</Text>
                    <Text style={{ fontSize:windowHeight*0.03 }}>{props.product.Description}</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight*0.65,
        backgroundColor:"white"
    },
    sellerinfo: {
        width: windowWidth,
        height: windowHeight*0.1,
        paddingLeft: "5%",
        justifyContent:"center"
    },
    img: {
        width: windowWidth,
        height: windowHeight*0.25,
        backgroundColor:"blue",
        justifyContent:"center",
        alignItems:"center"
    },
    description: {
        width: windowWidth,
        height: windowHeight*0.3,
        paddingLeft: "5%",
        justifyContent:"space-evenly"
    }
})