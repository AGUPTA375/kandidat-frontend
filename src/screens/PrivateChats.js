import { StyleSheet, View, Dimensions, TouchableOpacity, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getChattingUsers } from "../data";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


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

    useEffect(() => {
        console.log(users)
    }, [users])

    if (id !== null) {
        return(
            <View style={styles.container}>


    
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
    }
})