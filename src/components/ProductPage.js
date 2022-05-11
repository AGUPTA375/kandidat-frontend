import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native"
import { fetchUserInfo, pinProduct } from "../data";

import { AntDesign } from '@expo/vector-icons';

var base64 = require('base-64');

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProductPage(props) {


    const [user, setUser] = useState(null)
    const [pinned, setPinned] = useState(false)

    useEffect(() => {
        fetchUserInfo(props.product.user_id, setUser)
    }, [])

    useEffect(() => {
        if (pinned) {
            pinProduct(props.product)
        }
    }, [pinned])

    if (user === null) {

        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    } else {
        var img = `data:image/png;base64,${base64.decode(props.product.picture)}`
        return (
            <View style={styles.container}>
                <View style={styles.sellerinfo}>
                    <Text style={{ fontSize: windowHeight*0.03}}>{user.name}</Text>
                    <TouchableOpacity onPress={() => setPinned(!pinned)}>
                        <AntDesign style={{ marginRight: "5%"}} name="pushpin" size={windowHeight*0.06} color={pinned ? "red": "black"} />
                    </TouchableOpacity>
                </View>

                <Image source={{uri:img}} style={styles.img} resizeMode="contain" />

                <View style={styles.description} >
                    <Text style={{ fontSize:windowHeight*0.035 }}>{props.product.price} kr</Text>
                    <Text style={{ fontSize:windowHeight*0.03 }}>{props.product.description}</Text>
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
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-between"
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