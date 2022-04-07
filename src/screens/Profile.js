import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ProfileNotLoggedIn from '../components/ProfileNotLoggedIn'; // Not logged in
import ProfileLoggedIn from '../components/ProfileLoggedIn'; // Logged in


// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Profile() {

    const [token, setToken] = useState(null)

    useEffect(() => {
        getData();
    }, [])
    
    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('token', value)
        } catch (e) {
          // saving error
        }
      }

    const getData = async () => {
        try {
        const value = await AsyncStorage.getItem('token')
        if(value !== null) {
            setToken(value)
        } else {
            setToken(null)
        }
        } catch(e) {
        // error reading value
        }
    }
    
    if (token == null) {
        return (
            <ProfileNotLoggedIn />
        )
    } else  {
        return (
            <ProfileLoggedIn />
        )
    }

    
}

const styles = StyleSheet.create({
    profilepic: {
        width: windowWidth/2.5,
        height: windowHeight/5,
        borderRadius: 1000,
        marginTop: "5%",
        marginBottom: "2%"
    },
    profile: {
        height: windowHeight/3,
        width: windowWidth,
        alignItems:"center",
        marginTop: "15%"
    },
    name: {
        fontSize: windowHeight/30
    },
    followers: {
        fontSize: windowHeight/50
    },
    textinput: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "black",
        width: windowWidth*0.7,
        paddingLeft: "10%",
        height: windowHeight*0.04,
        marginRight: "10%"
    },
    search: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "6%",
    },
    searchIcon: {
        position: "absolute",
        paddingLeft: windowWidth*0.02,
    },
    root: {
        flex:1,
        backgroundColor:"white"
    }
})