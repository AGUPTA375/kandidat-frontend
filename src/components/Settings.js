import { useState } from "react";
import { View, Text, Modal, StyleSheet, Dimensions, FlatList } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Settings(props) {

    var settings = [
        {
            name: "Edit profile",
            nav: "EditProfile"
        }
    ]


    return (
            <Modal
            animationType="slide"
            visible={props.modal}
            transparent={true}
            onRequestClose={() => props.setModal(!props.modal)} >

                <View style={styles.container}>
                    <View style={styles.top}>
                        <Text style={{ fontSize:windowHeight*0.03, marginRight: "50%"}}>Settings</Text>
                        <TouchableOpacity
                        onPress={() => props.setModal(!props.modal)}>
                            <AntDesign name="closecircleo" size={windowHeight*0.06} color="black" style={{ marginRight: "5%", }} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.mid}>
                        <FlatList
                        scrollEnabled={false}
                        contentContainerStyle={{ alignItems:"center", marginTop: "5%"}}
                        data={settings}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={styles.flbutton} onPress={() => {props.setModal(!props.modal); props.navigation.navigate(item.nav)}}>
                                    <Text style={styles.nameText}>{item.name}</Text>
                                    <AntDesign name="right" size={windowHeight*0.05} color="black" style={{ marginRight: "5%" }} />
                                </TouchableOpacity>
                            )
                        }} />
                    </View>

                    <View style={styles.bottom}>
                        <TouchableOpacity
                        style={styles.logout}
                        onPress={() => {props.setModal(!props.modal); props.clear()}}>
                            <Text style={{ fontSize:windowHeight*0.03}}>Logout</Text>
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
        justifyContent:"space-between"
    },
    top: {
        width: windowWidth*0.9,
        height: windowHeight*0.1,
        justifyContent:"flex-end",
        flexDirection:"row",
        alignItems:"center",
    },
    bottom: {
        width: windowWidth*0.9,
        height: windowHeight*0.1,
        justifyContent:"center",
    },
    logout: {
        width: windowWidth*0.4,
        height: windowHeight*0.08, 
        justifyContent:"center",
        alignItems:"center"
    },
    mid: {
        width: windowWidth*0.9,
        height: windowHeight*0.6,
    },
    flbutton: {
        width: windowWidth*0.8,
        height: windowHeight*0.1,
        backgroundColor: "#d8d8d8",
        alignItems:"center",
        paddingLeft:"5%",
        borderRadius: 30,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    nameText: {
        fontSize: windowHeight*0.025,
        fontWeight:"bold"
    }
})