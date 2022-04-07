import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../data';

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProfileNotLoggedIn(props) {

    const [phone, setPhone] = useState(null)
    const [password, setPassword] = useState(null)

    const storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value)
        } catch (e) {
          // saving error
        }
      }

    return(
        <View style={styles.root}>
            <View style={styles.inputs}>

                <TextInput 
                style={styles.textinput}
                onChangeText={setPhone}
                value={phone}
                placeholder={"Enter phone number..."}/>

                <TextInput 
                style={styles.textinput}
                onChangeText={setPassword}
                value={password}
                placeholder={"Enter password..."}
                secureTextEntry={true}/>

            </View>
            <TouchableOpacity style={styles.button} onPress={() => {login({"PhoneNumber": phone, "Password": password})
            .then((data) => {
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
        paddingTop: windowHeight*0.3
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
    },
    textinput: {
        width: windowWidth*0.7,
        height: windowHeight*0.05,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        paddingLeft: "5%",
        marginVertical: "5%"
    },
    inputs: {

    }
})