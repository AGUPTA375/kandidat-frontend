import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Settings from './Settings';

// Icons
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { getUserInfo } from '../data';

var base64 = require('base-64');


// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProfileLoggedIn(props) {

    useEffect(() => {
        if (props.id != null) {
            props.setID(props.id)
        }
    }, [props.id])

    const clearAll = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
          // clear error
        }
        props.setToken(null)
        props.setID(null)
        props.setRefresh(false)
      }

    // State
    const [img, setImg] = useState(null)
    const [name, setName] = useState(null)
    const [search, setSearch] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        getUserInfo(props.id).then((data) => {
            if(data[0] === 200) {
                var user = data[1]
                setImg(`data:image/png;base64,${base64.decode(user.Picture)}`)
                setName(user.Name)
            }
        });
    }, [])

    return (
        <View style={styles.root}>
            <Settings modal={modalVisible} setModal={setModalVisible} clear={clearAll}/>
            <View style={styles.profile}>
                <View style={{ width: windowWidth*0.2, height: windowHeight/2.5}}>

                </View>
                <View style={styles.info}>
                    <Image style={styles.profilepic} source={{ uri: img}} />
                    <Text style={styles.name}>{name}</Text>
                </View>
                <View style={{ width: windowWidth*0.2, height: windowHeight/2.5, marginTop: "45%"}}>
                    <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}>
                        <Ionicons name="settings-sharp" size={windowHeight*0.05} color="#EDB219" />
                    </TouchableOpacity>
                </View>
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
        height: windowHeight/2.5,
        width: windowWidth,
        alignItems:"center",
        paddingBottom: "10%",
        flexDirection:"row",
        backgroundColor: "#7f0001"
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
        backgroundColor:"white",
        alignItems:"center"
    },
    info: {
        width: windowWidth*0.6,
        height: windowHeight/2.5,
        alignItems:"center",
        justifyContent:"flex-end"
    }
})