import { useState } from "react";
import { View, Text, Modal, StyleSheet, Dimensions, TextInput, Alert } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { postProduct } from "../data";

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CreateProduct(props) {
//name,service,price,upload_date,description,fk_user_id
    const [name, setName] = useState(null)
    const [service, setService] = useState(null)
    const [price, setPrice] = useState(null)
    const [uploadDate, setUploadDate] = useState(null)
    const [description, setDescription] = useState(null)
    const [userID, setUserID] = useState(null)

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
                    placeholder="Enter product price..."
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric" />

                    <TextInput
                    style={styles.textinput}
                    placeholder="Enter product description..."
                    value={description}
                    onChangeText={setDescription} />

                    <TouchableOpacity onPress={() => {
                        if (name === null || price === null || description === null) {
                            Alert.alert("Error", "All fields must be filled", [{ text:"OK" }])
                        } else {
                            var todayDate = new Date().toISOString().slice(0, 10);
                            postProduct(props.id, { 
                                name: name, 
                                service: false, 
                                price: parseInt(price), 
                                uploaddate: todayDate, 
                                description: description, 
                                fk_user_id: parseInt(props.id) }).then((data) => {
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
                    }}>
                        <Text>Upload product</Text>
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
})

