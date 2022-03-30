import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from "react"

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MyCommunities(props) {

    console.log(props)
    
    var colors = ["#83B692", "#F9ADA0", "#F9627D", "#C65B7C", "#5B3758"]

    var DATA = [
        {
            id: 0,
            title: "#Football"
        },
        {
            id: 1,
            title: "#Politics"
        },
        {
            id: 2,
            title: "#Random"
        },
        {
            id: 3,
            title: "#Memes"
        }
    ]

    return(
        <FlatList
            data={DATA}
            renderItem={({ item }) => {
                return(
                    <View style={styles.list}>
                        <TouchableOpacity style={[styles.button, {backgroundColor: colors[item.id % colors.length]}]}
                        onPress={() => {
                            props.nav.navigate("Community chat", { community: item.title})
                        }}>
                            <Text style={styles.comstext}>{item.title}</Text>
                        </TouchableOpacity>

                    </View>
                )
            }}>
        </FlatList>
    )
}

const styles = StyleSheet.create({
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