import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext } from "react"

import { getUsersCommunities } from '../data';

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MyCommunities(props) {

    var colors = ["#83B692", "#F9ADA0", "#F9627D", "#C65B7C", "#5B3758"]

    // States
    const [communities, setCommunities] = useState([])

    useEffect(() => {
        getUsersCommunities(props.id).then((data) =>{
            if(data[0] == 200) {
                setCommunities(data[1])
            }
        })
    }, [])

    return(
        <FlatList
            data={communities}
            keyExtractor={(item) => item.CommunityID}
            renderItem={({ item }) => {
                return(
                    <View style={styles.list}>
                        <TouchableOpacity style={[styles.button, {backgroundColor: colors[item.CommunityID % colors.length]}]}
                        onPress={() => {
                            props.nav.navigate("Community chat", { community: item.Name })
                        }}>
                            <Text style={styles.comstext}>{item.Name}</Text>
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
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,       
    },
    list: {
        alignItems:"center",
        marginTop:"5%"
    },
    comstext: {
        fontSize: windowHeight/40
    }
})