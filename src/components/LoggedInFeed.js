import { useEffect, useState, useCallback } from "react"
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions, ScrollView, Image, RefreshControl } from "react-native"
import { getNotUsersProducts } from "../data"
import { useFocusEffect } from '@react-navigation/native';
var base64 = require('base-64');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LoggedInFeed(props) {

    const [products, setProducts] = useState(null)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        getNotUsersProducts(props.id, setProducts)
    }, [])

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => {
        getNotUsersProducts(props.id, setProducts)
        setRefreshing(false)
      });
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}
        refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            />
        }>
            <FlatList 
            data={products}
            contentContainerStyle={{ justifyContent:"center", alignItems:"center"}}
            horizontal={true}
            keyExtractor={item => item.product_id}
            renderItem={({ item }) => {
                var img = `data:image/png;base64,${base64.decode(item.picture)}`
                return (
                    <TouchableOpacity style={styles.product} onPress={() => props.navigation.navigate("Product", { product: item})}>

                        <Image style={styles.buttonTop} source={{ uri: img }} resizeMode="contain"/>
                            


                        <View style={styles.buttonDown}>
                            <Text style={styles.goldText}>{item.name}</Text>
                        </View>
                        
                    </TouchableOpacity>
            )
            }} />
        </ScrollView>
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
        width: windowWidth*0.43,
        height:windowHeight*0.25,
        alignItems:"center",
        backgroundColor:"#7f0001",
        marginHorizontal: windowWidth*0.05,
        borderRadius: 10
      },
    goldText: { 
    color: "#EDB219", 
    fontSize:windowHeight*0.02, 
    fontWeight:"bold"
    },
    buttonTop: {
        width: windowWidth*0.43,
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
})