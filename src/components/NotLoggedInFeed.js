import { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions, Image } from "react-native"
import { fetchAllProducts } from "../data"

var base64 = require('base-64');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function NotLoggedInFeed(props) {

    const [products, setProducts] = useState(null)

    useEffect(() => {
        fetchAllProducts(setProducts)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <Image source={require('../assets/amargboheader.png')} style={{ width: windowWidth*0.75, height: windowHeight*0.1, marginTop: "5%"}} />

            </View>
            <FlatList 
            data={products}
            numColumns={2}
            contentContainerStyle={{ justifyContent:"center", alignItems:"center"}}
            keyExtractor={item => item.product_id}
            renderItem={({ item }) => {
                let img
                if (item.picture === null) {
                    img = "f"
                } else {
                    img = `data:image/png;base64,${base64.decode(item.picture)}`
                }
                return (
                    <TouchableOpacity style={styles.product} onPress={() => props.navigation.navigate("Product", { product: item, loggedIn: false })}>

                        <Image style={styles.buttonTop} source={{ uri: img }} resizeMode="stretch" />
                            


                        <View style={styles.buttonDown}>
                            <Text style={styles.goldText}>{item.name}</Text>
                        </View>
                        
                    </TouchableOpacity>
            )
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight*0.9,
        justifyContent:"center",
        alignItems:"center"
    },
    product: {
        width: windowWidth*0.4,
        height:windowHeight*0.25,
        alignItems:"center",
        backgroundColor:"#7f0001",
        marginHorizontal: windowWidth*0.05,
        borderRadius: 10,
        marginVertical: windowHeight*0.05
      },
    goldText: { 
        color: "#EDB219", 
        fontSize:windowHeight*0.02, 
        fontWeight:"bold"
    },
    buttonTop: {
        width: windowWidth*0.4,
        height: windowHeight*0.17,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    buttonDown: {
        width: windowWidth*0.43,
        height: windowHeight*0.08,
        justifyContent:"center",
        alignItems:"center"
    },
    header: {
        width: windowWidth,
        height: windowHeight*0.2,
        backgroundColor: "#7f0001",
        justifyContent:"center",
        alignItems:"center"
    }
})