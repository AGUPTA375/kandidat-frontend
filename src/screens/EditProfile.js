import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Modal, TextInput, Alert, Image } from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

import { AntDesign } from '@expo/vector-icons';

import { updateUser, fetchUserInfo } from '../data';

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function EditProfile(props) {

    const [nameModal, setNameModal] = useState(false)
    const [newName, setNewName] = useState(null)

    const [passwordModal, setPasswordModal] = useState(false)
    const [newPassword, setNewPassword] = useState(null)

    const [phoneModal, setPhoneModal] = useState(false)
    const [newPhone, setNewPhone] = useState(null)

    const [imageModal, setImageModal] = useState(false)
    const [newImage, setNewImage] = useState(null)

    const [businessModal, setBusinessModal] = useState(false)


    const [id, setID] = useState(null)
    const [user, setUser] = useState(null)
    const [img, setImg] = useState("f")
    const [imgb64, setimgb64] = useState(null)

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
            setImg(result.uri)
            setimgb64(base64)
        }
      };

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

    useEffect(() => {
        getID()
    }, [])

    useEffect(() => {
        id !== null ? fetchUserInfo(id, setUser) : {}
    }, [id])

    return (
        <View style={styles.container}>

            {/* Change name */}
            <Modal
            animationType='slide'
            transparent={true}
            visible={nameModal}
            onRequestClose={() => setNameModal(!nameModal)}>
                <View style={styles.modalView}>

                    <View style={styles.modalHeader}>
                        <TouchableOpacity
                        onPress={() => setNameModal(!nameModal)}>
                            <AntDesign name="closecircleo" size={windowHeight*0.06} color="black" style={{ marginRight: "5%", }} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalRoot}>
                        <TextInput 
                        style={styles.textInput}
                        value={newName}
                        onChangeText={setNewName}
                        placeholder='Set new name...' />

                        <TouchableOpacity style={styles.modalButton} onPress={() => {
                            if (newName === null || newName === "") {
                                Alert.alert("Error", 'Name cannot be empty', [ { text: "OK" } ])
                            }
                            updateUser(id, { name: newName, password: user.password, phone_number: user.phone_number, picture: user.picture, business: user.business }).then((data) => {
                                if (data[0] === 201) {
                                    Alert.alert("Name changed", "Your name has been updated. Please restart the app", [
                                        {
                                            text: "OK",
                                            onPress: setNameModal(!nameModal)
                                        }
                                    ])
                                }
                            })
                        }}
                        >
                            <Text style={styles.goldText}>Update</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>

            {/* Change password */}
            <Modal
            animationType='slide'
            transparent={true}
            visible={passwordModal}
            onRequestClose={() => setPasswordModal(!passwordModal)}>
                <View style={styles.modalView}>

                    <View style={styles.modalHeader}>
                        <TouchableOpacity
                        onPress={() => setPasswordModal(!passwordModal)}>
                            <AntDesign name="closecircleo" size={windowHeight*0.06} color="black" style={{ marginRight: "5%", }} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalRoot}>
                        <TextInput 
                        secureTextEntry={true}
                        style={styles.textInput}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder='Set new password...' />

                        <TouchableOpacity style={styles.modalButton} onPress={() => {
                            if (newPassword === null || newPassword === "") {
                                Alert.alert("Error", 'Password cannot be empty', [ { text: "OK" } ])
                            } else {
                                updateUser(id, { name: user.name, password: newPassword, phone_number: user.phone_number, picture: user.picture, business: user.business }).then((data) => {
                                    if (data[0] === 201) {
                                        Alert.alert("Password changed", "Your password has been updated. Please restart the app", [
                                            {
                                                text: "OK",
                                                onPress: setPasswordModal(!passwordModal)
                                            }
                                        ])
                                    }
                                })
                            }
                        }}
                        >
                            <Text style={styles.goldText}>Update</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>

            {/* Change phone number */}
            <Modal
            animationType='slide'
            transparent={true}
            visible={phoneModal}
            onRequestClose={() => setPhoneModal(!phoneModal)}>
                <View style={styles.modalView}>

                    <View style={styles.modalHeader}>
                        <TouchableOpacity
                        onPress={() => setPhoneModal(!phoneModal)}>
                            <AntDesign name="closecircleo" size={windowHeight*0.06} color="black" style={{ marginRight: "5%", }} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalRoot}>
                        <TextInput 
                        style={styles.textInput}
                        value={newPhone}
                        onChangeText={setNewPhone}
                        placeholder='+46761234567' />

                        <TouchableOpacity style={styles.modalButton} onPress={() => {
                            if (newPhone === null || newPhone === "") {
                                Alert.alert("Error", 'Phone number cannot be empty', [ { text: "OK" } ])
                            } else {
                                updateUser(id, { name: user.name, password: user.password, phone_number: newPhone, picture: user.picture, business: user.business }).then((data) => {
                                    if (data[0] === 201) {
                                        Alert.alert("Phone number changed", "Your phone number has been updated. Please restart the app", [
                                            {
                                                text: "OK",
                                                onPress: setPhoneModal(!phoneModal)
                                            }
                                        ])
                                    }
                                })
                            }
                        }}
                        >
                            <Text style={styles.goldText}>Update</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>

            {/* Change image */}
            <Modal
            animationType='slide'
            transparent={true}
            visible={imageModal}
            onRequestClose={() => setImageModal(!imageModal)}>
                <View style={[styles.modalView, { height: windowHeight*0.6 }]}>

                    <View style={styles.modalHeader}>
                        <TouchableOpacity
                        onPress={() => setImageModal(!imageModal)}>
                            <AntDesign name="closecircleo" size={windowHeight*0.06} color="black" style={{ marginRight: "5%", }} />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.modalRoot, { height: windowHeight*0.5}]}>

                        <Image style={{ width: windowWidth*0.7, height: windowHeight*0.3, backgroundColor:"#d8d8d8" }} source={{uri:img}} />
                        

                        <TouchableOpacity style={styles.modalButton} onPress={() => pickImage()}>
                            <Text style={styles.goldText}>Choose image</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.modalButton} onPress={() => {
                            if (img === "f") {
                                Alert.alert("Error", 'Please choose an image.', [ { text: "OK" } ])
                            } else {
                                updateUser(id, { name: user.name, password: user.password, phone_number: user.phone_number, picture: imgb64, business: user.business }).then((data) => {
                                    if (data[0] === 201) {
                                        Alert.alert("Profice picture changed", "Your profile picture has been updated. Please restart the app", [
                                            {
                                                text: "OK",
                                                onPress: setImageModal(!imageModal)
                                            }
                                        ])
                                    }
                                })
                            }
                            
                        }}
                        >
                            <Text style={styles.goldText}>Update</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>

            <View style={styles.header}>

                <TouchableOpacity style={styles.headerSides} onPress={() => props.navigation.goBack()}>

                    <AntDesign name="left" size={windowHeight*0.045} color="#EDB219" />

                </TouchableOpacity>

                <View style={styles.headerMid}>
                    <Text style={styles.goldText}>Edit profile</Text>
                </View>


                <View style={styles.headerSides}>

                </View>

            </View>

            <View style={styles.root}>

                <TouchableOpacity onPress={() => setNameModal(!nameModal)} style={styles.buttons}>
                    <Text style={styles.goldText}>Update name</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setPasswordModal(!passwordModal)} style={styles.buttons}>
                    <Text style={styles.goldText}>Update password</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setPhoneModal(!phoneModal)} style={styles.buttons}>
                    <Text style={styles.goldText}>Update phone number</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setImageModal(!imageModal)} style={styles.buttons}>
                    <Text style={styles.goldText}>Change profile picture</Text>
                </TouchableOpacity>

            </View>


            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight*0.9
    },
    header: {
        width: windowWidth,
        height: windowHeight*0.15,
        backgroundColor:"#7f0001",
        flexDirection:"row",
        alignItems:"center",
        paddingTop: "5%"
    },
    root: {
        width: windowWidth,
        height: windowHeight*0.75,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-evenly"
    },
    headerMid: {
        width:windowWidth*0.6,
        height: windowHeight*0.15,
        justifyContent:"center",
        alignItems:"center"
    },
    headerSides: {
        height: windowHeight*0.15,
        width: windowWidth*0.2,
        alignItems:"center",
        justifyContent:"center"
    },
    goldText: {
        fontSize: windowHeight*0.03,
        fontWeight: "bold",
        color: "#EDB219",
        alignSelf:"center"
    },
    modalView: {
        width: windowWidth*0.9,
        height: windowHeight*0.35,
        borderRadius: 30,
        alignSelf:"center",
        marginTop: windowHeight*0.175,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        backgroundColor:"white"
    },
    modalHeader: {
        width: "100%",
        height: windowHeight*0.08,
        justifyContent:"center",
        alignItems:"flex-end"
    },
    modalRoot: {
        width: "100%",
        height: windowHeight*0.25,
        flexDirection: "column",
        alignItems:"center",
        justifyContent:"space-evenly"
    },
    textInput: {
        width: windowWidth*0.75,
        height: windowHeight*0.075,
        borderRadius: 20,
        paddingLeft: "3%",
        borderWidth: 1
    },
    modalButton: {
        width: windowWidth*0.5,
        height: windowHeight*0.06,
        backgroundColor: "#7f0001",
        justifyContent:"center",
        alignContent:"center",
        borderRadius: 20,
        borderWidth: 1.5
    },
    buttons: {
        width: windowWidth*0.8,
        height:windowHeight*0.075,
        backgroundColor: "#7f0001",
        borderRadius: 20,
        justifyContent:"center",
        alignItems:"center"
    }
})