import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, Alert, Modal, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, signup } from '../data';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProfileNotLoggedIn(props) {

    const [phone, setPhone] = useState(null)
    const [password, setPassword] = useState(null)
    const [register, setRegister] = useState(false)
    const [nameRegister, setNameRegister] = useState(null)
    const [phoneRegister, setPhoneRegister] = useState(null)
    const [passwordRegister, setPasswordRegister] = useState(null)
    const [reset, setReset] = useState(false)
    const [imgb64, setimgb64] = useState(null)

    useEffect(() => {
        if (reset) {
            setNameRegister(null)
            setPhoneRegister(null)
            setPasswordRegister(null)
            setReset(false)
        }
    }, [reset])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 0.5,
        });
            
        const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
    
        if (!result.cancelled) {
            setimgb64(base64)
        }
      };

    const storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value)
        } catch (e) {
          // saving error
        }
    }

    return(
        <View style={styles.root}>

            <View style={styles.image}>
                <Image style={styles.logo} source={require('../assets/amargbo.png')} />
            </View>
            <Modal
            animationType='slide'
            visible={register} 
            transparent={true}
            onRequestClose={() => setRegister(!register)}>
                <View style={styles.modal}>
                        <TouchableOpacity
                        style={{ width: windowWidth*0.3, height:windowHeight*0.08, backgroundColor:"#7f0001", justifyContent:"center", alignItems:"center", borderRadius:20 }}
                        onPress={() => {setRegister(!register); setReset(true)}} >
                            <Text style={{fontSize:windowHeight*0.03}} >Close</Text>
                        </TouchableOpacity>
                        <View style={{ alignItems:"center"}}>

                            <TextInput
                            style={styles.textinput}
                            placeholder="Set name..."
                            value={nameRegister}
                            onChangeText={setNameRegister} />

                            <TextInput
                            style={styles.textinput}
                            placeholder="Set phone number..."
                            value={phoneRegister}
                            onChangeText={setPhoneRegister} />

                            <TextInput
                            style={styles.textinput}
                            placeholder="Set password..."
                            value={passwordRegister}
                            onChangeText={setPasswordRegister}
                            secureTextEntry={true} />

                            <TouchableOpacity
                            onPress={() => pickImage()}
                            style={{width: windowWidth*0.5, height:windowHeight*0.05, justifyContent:"center", alignItems:"center", borderRadius:30, backgroundColor:"#7f0001"}}>
                                <Text>Choose image</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                            onPress={() => signup({name: nameRegister, phonenumber: phoneRegister.toString(), password: passwordRegister, picture: imgb64 })
                            .then((data) => {
                                if (data[0] === 200) {
                                    Alert.alert(
                                        "Account created!",
                                        "You can now login.",
                                        [
                                            {
                                                text: "OK"
                                            }
                                        ]
                                    )
                                    setRegister(!register)
                                } else {
                                    Alert.alert(
                                        "Something went wrong...",
                                        "Try again",
                                        [
                                            { text: "OK" }
                                        ]
                                    )
                                }
                            })}
                            style={{width: windowWidth*0.5, height:windowHeight*0.05, justifyContent:"center", alignItems:"center", borderRadius:30, backgroundColor:"#7f0001"}}>
                                <Text>Create account</Text>
                            </TouchableOpacity>

                        </View>

                </View>
            </Modal>
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
                } else {
                    Alert.alert(
                        "Login failed",
                        "Wrong phone number or password.",
                        [
                            {
                                text: "Try again"
                            }
                        ]
                    )
                }
            })}}>
                <Text style={styles.buttontext}>Log in</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: "#F9ADA0"}]}
            onPress={() => setRegister(!register)}>
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
    modal: {
        width: windowWidth*0.9,
        height: windowHeight*0.6,
        backgroundColor: "white",
        borderRadius: 20,
        marginLeft: windowWidth*0.05,
        flexDirection:"column",
        borderWidth: 1,
        borderColor:"black",
        alignItems:"center",
        marginTop: windowHeight*0.2
    },
    image: {
        width: windowWidth,
        height: windowHeight*0.22,
        alignItems:"center",
        backgroundColor:"#7f0001",
        justifyContent:"center",
        marginBottom: "15%"
    },
    logo: {
        width: windowWidth*0.8,
        height: windowHeight*0.1,
        marginTop: "10%"
    }
})