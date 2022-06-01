import { View, StyleSheet, Dimensions, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

import { FontAwesome, Entypo } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width

export default function SearchUser() {

    useEffect(() => {

    }, [])

    const [search, setSearch] = useState("")
    const [users, setUsers] = useState(null)
    const [searchResults, setSearchResults] = useState(null)

    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <FontAwesome style={styles.searchIcon} name="search" size={windowHeight*0.025} color="#EDB219" />
                <TextInput
                onChangeText={setSearch}
                style={styles.textinput}
                placeholder={"Search..."}
                value={search}
                />
            </View>

            <View style={styles.usersView}>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight*0.77,
    },
    topView : {
        width: windowWidth,
        height: windowHeight*0.15,
        backgroundColor:"#7f0001",
        justifyContent:"center"
    },
    searchIcon: {
        position: "absolute",
        marginLeft:"13%"
    },
    textinput: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "black",
        width: windowWidth*0.8,
        paddingLeft: "12%",
        height: windowHeight*0.06,
        marginLeft:" 10%",
        color: "#EDB219",
        fontWeight: "bold"
    },
    usersView: {
        width: windowWidth,
        height: windowHeight*0.62,
    }
})