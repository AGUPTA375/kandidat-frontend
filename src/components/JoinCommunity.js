import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from "react"

// Helper functions
import { searchCommunities } from "../funcs"

// Icons
import { FontAwesome } from '@expo/vector-icons';

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function JoinCommunity(props) {

    var colors = ["#83B692", "#F9ADA0", "#F9627D", "#C65B7C", "#5B3758"]

    var DATA = [
        {
            id: 0,
            title: "#Clothes",
            members: 93
        },
        {
            id: 1,
            title: "#Sport",
            members: 100
        },
        {
            id: 2,
            title: "#Talk",
            members: 43
        }
    ]

    // States
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        if (search === "") {
            setSearchResults(DATA)
        } else {
            setSearchResults(searchCommunities(search, DATA))
        }
    }, [search])

    return (
        <View style={styles.root}>
            <View style={styles.search}>
                <FontAwesome style={styles.searchIcon} name="search" size={windowHeight*0.03} color="black" />
                <TextInput
                onChangeText={setSearch}
                style={styles.textinput}
                placeholder={"Search communities..."}
                value={search}
                />
            </View>
            <FlatList
            data={searchResults}
            renderItem={({ item }) => {
                return (
                    <View style={styles.list}>
                        <TouchableOpacity style={[styles.button, {backgroundColor: colors[item.id % colors.length]}]}>
                            <Text style={styles.comstext}>{item.title} - {item.members} members</Text>
                        </TouchableOpacity>
                    </View>
                )
            }}>

            </FlatList>
        </View>
        
    )
}

const styles = StyleSheet.create({
    textinput: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "black",
        width: windowWidth*0.9,
        paddingLeft: "10%",
        height: windowHeight*0.04,
    },
    root: {
        justifyContent:"center",
        alignItems:"center"
    },
    search: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: "3%"
    },
    searchIcon: {
        position: "absolute",
        paddingLeft: windowWidth*0.02,
    },
    button: {
        width: windowWidth*0.9,
        height: windowHeight*0.1,
        justifyContent: "center",
        alignItems:"center",
        borderRadius: 10

    },
    list: {
        alignItems:"center",
        marginTop:"5%"
    },
    comstext: {
        fontSize: windowHeight/40
    }
})