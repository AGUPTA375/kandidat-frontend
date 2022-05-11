import { useEffect, useState } from "react";
import { View, Text, Modal, StyleSheet, Dimensions, TextInput, Alert } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { postProduct } from "../data";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Switch } from "react-native-paper";

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CreateProduct(props) {
//name,service,price,upload_date,description,fk_user_id
    const [name, setName] = useState(null)
    const [service, setService] = useState(false)
    const [price, setPrice] = useState(null)
    const [description, setDescription] = useState(null)
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
            setimgb64(base64)
        }
      };

    // Clear inputs in modal when its closed
    useEffect(() => {
        if (!props.modal) {
            setName(null)
            setService(false)
            setPrice(null)
            setDescription(null)
            setDescription(null)
            setimgb64(null)
        }
    }, [props.modal])

    return (
        <Modal
        animationType="slide"
        visible={props.modal}
        transparent={true}
        onRequestClose={() => props.setModal(!props.modal)} >
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={{ fontSize:windowHeight*0.03, marginRight: "25%"}}>Upload product</Text>
                    <TouchableOpacity
                    onPress={() => props.setModal(!props.modal)}>
                        <AntDesign name="closecircleo" size={windowHeight*0.06} color="black" style={{ marginRight: "5%", }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputs}>
                    <TextInput
                    style={styles.textinput}
                    placeholder="Enter product name..."
                    value={name}
                    onChangeText={setName} />

                    <TextInput
                    style={styles.textinput}
                    placeholder="Enter product description..."
                    value={description}
                    onChangeText={setDescription} />

                    <View style={{ flexDirection: "row", alignItems:"center", width: windowWidth*0.7, justifyContent:"space-between"}}>
                        <TextInput
                        style={[styles.textinput, { width: windowWidth*0.4}]}
                        placeholder="Enter product price..."
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric" />
                        <View style={{ flexDirection:"column"}}>
                            <Text style={{ fontWeight: "bold"}}>Service?</Text>
                            <Switch value={service} onValueChange={() => setService(!service)} color="#7f0001" style={{
                                marginBottom: "45%",
                                marginTop: "15%"
                            }}/>
                        </View>

                    </View>


                    

                    <TouchableOpacity onPress={() => pickImage()}
                    style={styles.modalbuttons}>
                        <Text style={styles.goldTextBold}>Choose image</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        if (name === null || price === null || description === null || imgb64 === null) {
                            Alert.alert("Error", "All fields must be filled", [{ text:"OK" }])
                        } else {
                            postProduct(props.id, { 
                                name: name, 
                                service: service, 
                                price: parseInt(price), 
                                description: description,
                                picture: imgb64, 
                                user_id: parseInt(props.id) }).then((data) => {
                                    if (data[0] === 201) {
                                        Alert.alert(
                                            "Item uploaded!",
                                            "Your item has been uploaded.",
                                            [{ text: "OK" }]
                                        )
                                    } else {
                                        Alert.alert("Error!", "Something went wrong...", [{ text: "OK" }])
                                    }
                                })
                        }
                    }}
                    style={styles.modalbuttons}>
                        <Text style={styles.goldTextBold}>Upload product</Text>
                    </TouchableOpacity>


                </View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth*0.9,
        height: windowHeight*0.8,
        backgroundColor:"white",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 40,
        alignSelf:"center",
        marginTop: "20%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    top: {
        width: windowWidth*0.9,
        height: windowHeight*0.1,
        justifyContent:"flex-end",
        flexDirection:"row",
        alignItems:"center",
    },
    inputs: {
        width: windowWidth*0.9,
        height: windowHeight*0.6,
        alignItems:"center"
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
    modalbuttons: {
        width: windowWidth*0.5, 
        height:windowHeight*0.05, 
        justifyContent:"center", 
        alignItems:"center", 
        borderRadius:30, 
        backgroundColor:"#7f0001",
        marginVertical: "3%"
    },
    goldTextBold: {
        color: "#EDB219", 
        fontWeight: "bold"
    },
})

