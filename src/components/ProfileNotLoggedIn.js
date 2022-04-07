import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../data';

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProfileNotLoggedIn(props) {

    const storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value)
        } catch (e) {
          // saving error
        }
      }

    return(
        <View style={styles.root}>

            <TouchableOpacity style={styles.button} onPress={() => {login({"PhoneNumber": "6929", "Password": "1234"}).then((data) => {
                if (data[0] == 200) {
                    var token = data[1]["Token"]
                    var id = data[1]["ID"]
                    storeData('token', token)
                    storeData('id', id.toString())
                    props.setRefresh(true)
                }
            })}}>
                <Text style={styles.buttontext}>Log in</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: "#F9ADA0"}]}>
                <Text style={styles.buttontext}>Sign up</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor:"white",
        alignItems:"center",
        paddingTop: windowHeight*0.4
    },
    button: {
        width: windowWidth*0.7,
        height: windowHeight*0.1,
        backgroundColor:"#83B692",
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 10,
        marginVertical: "5%"
    },
    buttontext: {
        fontSize: windowHeight/40
    }
})