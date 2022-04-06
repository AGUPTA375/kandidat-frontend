import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import { getUserInfo } from '../data';
import { Buffer } from 'buffer';

var base64 = require('base-64');

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Icons
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default function Profile() {

    // State
    const [img, setImg] = useState(null)
    const [name, setName] = useState(null)
    const [search, setSearch] = useState(null)

    useEffect(() => {
        getUserInfo(4).then((data) => {
            if(data[0] === 200) {
                var user = data[1]
                setImg(`data:image/png;base64,${base64.decode(user.Picture)}`)
                setName(user.Name)
            }
        })
    }, [])

    return (
        <View style={styles.root}>
            <View style={styles.profile}>
                <Image style={styles.profilepic} source={{ uri: img}} />
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.followers}>6 followers • 10 following</Text>
            </View>
            <View style={styles.search}>
                <FontAwesome style={styles.searchIcon} name="search" size={windowHeight*0.03} color="black" />
                <TextInput
                onChangeText={setSearch}
                style={styles.textinput}
                placeholder={"Search your ads..."}
                value={search}
                />
                <Ionicons name="add-circle-outline" size={windowHeight/30} color="black" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profilepic: {
        width: windowWidth/2.5,
        height: windowHeight/5,
        borderRadius: 1000,
        marginTop: "5%",
        marginBottom: "2%"
    },
    profile: {
        height: windowHeight/3,
        width: windowWidth,
        alignItems:"center",
        marginTop: "15%"
    },
    name: {
        fontSize: windowHeight/30
    },
    followers: {
        fontSize: windowHeight/50
    },
    textinput: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "black",
        width: windowWidth*0.7,
        paddingLeft: "10%",
        height: windowHeight*0.04,
        marginRight: "10%"
    },
    search: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "6%",
    },
    searchIcon: {
        position: "absolute",
        paddingLeft: windowWidth*0.02,
    },
    root: {
        flex:1,
        backgroundColor:"white"
    }
})