import { View, Dimensions, StyleSheet, TextInput, Text, FlatList, TouchableOpacity } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { useState } from "react";

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Search() {



    var categories = [
        {
            id: 0,
            name: "Art"
        },
        {
            id: 1,
            name: "Books"
        },
        {
            id: 2,
            name: "Chairs"
        },
        {
            id: 3,
            name: "Electronics"
        },
        {
            id: 4,
            name: "Hair products"
        },
        {
            id: 5,
            name: "Furniture"
        },
        {
            id: 6,
            name: "Kitchen"
        },
        {
            id: 7,
            name: "Bathroom"
        },
        {
            id: 8,
            name: "Winter"
        }
    ]

    const [search, setSearch] = useState(null)

    return(
        <View style={styles.container}>

            <View style={styles.top}>
                <FontAwesome style={styles.searchIcon} name="search" size={windowHeight*0.025} color="black" />
                <TextInput
                onChangeText={setSearch}
                style={styles.textinput}
                placeholder={"Search..."}
                value={search}
                />
            </View>
            <Text style={{ fontSize: windowHeight*0.03, fontWeight:"bold"}}>Categories</Text>


            <View style={styles.bottom}>
                <View style={styles.list}>
                    <FlatList 
                    numColumns={2}
                    contentContainerStyle={styles.flatlist}
                    data={categories}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                            style={styles.button}>
                                <Text style={{ color: "#EDB219", fontSize:windowHeight*0.02, fontWeight:"bold"}}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }}/>

                </View>

            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight*0.9,
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"space-evenly"
    },
    top: {
        width: windowWidth*0.8,
        height: windowHeight*0.1,
        flexDirection:"row",
        alignItems: "center",
        marginTop: "15%"
    },
    bottom: {
        width: windowWidth,
        height: windowHeight*0.6,
        flexDirection:"row"
    },
    searchIcon: {
        position: "absolute",
        marginLeft:"2%"
    },
    textinput: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "black",
        width: windowWidth*0.8,
        paddingLeft: "12%",
        height: windowHeight*0.06,
    },
    list: {
        width: "100%",
        height: "100%",
    },
    button: {
        width: windowWidth*0.43,
        height: windowHeight*0.1,
        backgroundColor:"#7f0001",
        justifyContent:"center",
        alignItems:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        borderRadius: 10,
        marginVertical: "5%",
        marginHorizontal:"3%"
    },
    flatlist: {
        flexDirection:"column",
        width:"100%",
        alignItems:"center",
    }
})