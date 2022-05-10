import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native"
import { fetchUserInfo } from "../data";

var base64 = require('base-64');

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProductPage(props) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        fetchUserInfo(props.product.UserID, setUser)
    }, [])

    if (user === null) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    } else {
        var img = `data:image/png;base64,${base64.decode(props.product.Picture)}`
        console.log(props.product.Service)
        return (
            <View style={styles.container}>
                <View style={styles.sellerinfo}>
                    <Text style={{ fontSize: windowHeight*0.03}}>{user.Name}</Text>
                </View>

                <Image source={{uri:img}} style={styles.img} />

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
        height: windowHeight*0.7,
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
    },
    description: {
        width: windowWidth,
        height: windowHeight*0.3,
        paddingLeft: "5%",
        justifyContent:"space-evenly"
    }
})