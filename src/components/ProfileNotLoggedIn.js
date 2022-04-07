import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProfileNotLoggedIn(props) {
    return(
        <View style={styles.root}>

            <TouchableOpacity style={styles.button}>
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