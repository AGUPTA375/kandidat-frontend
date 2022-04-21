import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from "react"
import { getNotUsersCommunities } from '../data';

// Helper functions
import { searchCommunities } from "../funcs"

// Icons
import { FontAwesome } from '@expo/vector-icons';

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function JoinCommunity(props) {

    var colors = ["#83B692", "#F9ADA0", "#F9627D", "#C65B7C", "#5B3758"]

    // States
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [communities, setCommunities] = useState([])

    useEffect(() => {
        if (search === "") {
            setSearchResults(communities)
        } else {
            setSearchResults(searchCommunities(search, communities))
        }
    }, [search])

    useEffect(() => {
        getNotUsersCommunities(props.id).then((data) => {
            if(data[0] == 200) {
                setCommunities(data[1])
                setSearchResults(data[1])
            }
        })
    }, [])

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
            keyExtractor={item => item.CommunityID}
            renderItem={({ item }) => {
                return (
                    <View style={styles.list}>
                        <TouchableOpacity style={[styles.button, {backgroundColor: colors[item.CommunityID % colors.length]}]}>
                            <Text style={styles.comstext}>{item.Name}</Text>
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