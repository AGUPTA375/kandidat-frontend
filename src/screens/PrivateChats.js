import { StyleSheet, View, Dimensions, TouchableOpacity, Text, FlatList, Image } from "react-native";
import { useEffect, useState } from "react";
import { getChattingUsers } from "../data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var base64 = require('base-64');

export default function PrivateChats(props) {

    const getID = async () => {
        try {
        const value = await AsyncStorage.getItem('id')
        if(value !== null) {
            setID(value)
            
        } else {
            setID(null)
        }
        setReady(true)
        } catch(e) {
        // error reading value
        }
    }

    const [users, setUsers] = useState(null)
    const [id, setID] = useState(null)

    useEffect(() => {
        getID()
    }, [])

    useEffect(() => {
        if (id !== null) {
            getChattingUsers(id, setUsers)
        }
    }, [id])

    useFocusEffect(() => {
        if (id !== null) {
            getChattingUsers(id, setUsers)
        }
    })


    if (id !== null) {
        return(
            <View style={styles.container}>

                <FlatList 
                data={users}
                keyExtractor={item => item.user_id}
                contentContainerStyle={{ alignItems:"center" }}
                renderItem={({ item }) => {
                    var im = `data:image/png;base64,${base64.decode(item.picture)}`
                    return(
                        <TouchableOpacity style={styles.users} onPress={() => props.navigation.navigate("UserChat", {user:item, id: id})}>
                            <Image source={{ uri: im }} style={styles.im}/>
                            <Text style={styles.nameText}>{item.name}</Text>
                            <AntDesign name="right" size={windowHeight*0.05} color="black" style={{ marginRight: "5%" }} />
                        </TouchableOpacity>
                    )
                }}
                />
    
            </View>
        )
    } else {
        return null
    }

}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight*0.77,
    },
    users: {
        width: windowWidth*0.9,
        height: windowHeight*0.1,
        backgroundColor: "#d8d8d8",
        borderRadius: 20,
        alignItems:"center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: "3%"
    },
    im: { 
        width: windowWidth*0.15, 
        height: windowHeight*0.075, 
        marginLeft: "5%",
        borderRadius: 1000
    },
    nameText: {
        fontSize: windowHeight*0.03
    },
})