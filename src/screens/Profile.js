import { useEffect, useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ProfileNotLoggedIn from '../components/ProfileNotLoggedIn'; // Not logged in
import ProfileLoggedIn from '../components/ProfileLoggedIn'; // Logged in

export default function Profile(props) {

    const [token, setToken] = useState(null)
    const [id, setID] = useState(null)
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        getToken();
        getID();
    }, [])

    useEffect(() => {
        if (refresh === true) {
            getToken()
            getID()
        }
    }, [refresh])

    const getToken = async () => {
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

    const getID = async () => {
        try {
        const value = await AsyncStorage.getItem('id')
        if(value !== null) {
            setID(value)
        } else {
            setID(null)
        }
        } catch(e) {
        // error reading value
        }
    }


    if (token == null && id == null) {
        return (
            <ProfileNotLoggedIn setToken={setToken} setID={setID} setRefresh={setRefresh}/>
        )
    } else if(token != null && id != null) {
        return (
            <ProfileLoggedIn setToken={setToken} token={token} id={id} setID={setID} setRefresh={setRefresh} />
        )
    } else {
        return (
            <View></View>
        )
    }

    
}