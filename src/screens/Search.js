import { View, Dimensions, StyleSheet, TextInput, Text, FlatList, TouchableOpacity, Image } from "react-native"
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { searchItems,searchWithCategory } from "../funcs";
import { fetchAllProducts, getNotUsersProducts } from "../data";
import AsyncStorage from '@react-native-async-storage/async-storage';
var base64 = require('base-64');


// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Search(props) {



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
        },
        {
            id: 9,
            name: "category"
        }
    ]

    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState(null)
    const [products, setProducts] = useState(null)
    const [id, setID] = useState(null)
    const [category, setCategory] = useState("Categories")

    const getID = async () => {
      try {
      const value = await AsyncStorage.getItem('id')
      if(value !== null) {
          setID(value)
      } else {
          setID(null)
      }
      } catch(e) {
      // error reading value
      }
    }
  
    useEffect(() => {
        getID();
    }, [])
  
    useFocusEffect(() => {
        getID();
    })

    useEffect(() => {
        if (id !== null) {
            getNotUsersProducts(id, setProducts)
        } else {
            fetchAllProducts(setProducts)
        }
    }, [id])

    useEffect(() => {
        if (search === "") {
            setSearchResults(products)
        } else {
            if (products !== null) {
                setSearchResults(searchItems(search, products))
            }
        }
    }, [search, products])

    useEffect(() => {
        if (category == "Categories") {
            setSearchResults(products)
        } else {
            setSearchResults(searchWithCategory(category, products))
        }
    }, [category])

    if (search === "") {

        if (category == "Categories") {

        
            return(
                <View style={styles.container}>

                    <View style={styles.top}>
                        <FontAwesome style={styles.searchIcon} name="search" size={windowHeight*0.025} color="#EDB219" />
                        <TextInput
                        onChangeText={setSearch}
                        style={styles.textinput}
                        placeholder={"Search..."}
                        value={search}
                        />
                    </View>
                    <Text style={{ fontSize: windowHeight*0.03, fontWeight:"bold"}}>{category}</Text>


                    <View style={styles.bottom}>
                        <View style={styles.list}>
                            <FlatList 
                            numColumns={2}
                            contentContainerStyle={styles.flatlist}
                            data={categories}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        setCategory(item.name)
                                    }} >
                                        <Text style={{ color: "#EDB219", fontSize:windowHeight*0.02, fontWeight:"bold"}}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }}/>

                        </View>

                    </View>


                </View>
            )
        } else {
            return(
                <View style={styles.container}>

                    <View style={styles.top}>
                        <FontAwesome style={styles.searchIcon} name="search" size={windowHeight*0.025} color="#EDB219" />
                        <TextInput
                        onChangeText={setSearch}
                        style={styles.textinput}
                        placeholder={"Search..."}
                        value={search}
                        />
                    </View>

                    <View style={{ width:windowWidth, height:windowHeight*0.1, justifyContent:"space-around", alignItems:"center", flexDirection:"row"}}>
                        <Text style={{ fontSize: windowHeight*0.03, fontWeight:"bold"}}>{category}</Text>
                        <TouchableOpacity onPress={() => {
                            setCategory("Categories")
                        }}>
                            
                            <Entypo name="circle-with-cross" size={windowHeight*0.04} color="black" />

                        </TouchableOpacity>
                    </View>


                    <View style={styles.bottom}>
                        <View style={styles.list}>
                            <FlatList 
                            numColumns={2}
                            contentContainerStyle={styles.flatlist}
                            data={searchResults}
                            keyExtractor={item => item.product_id}
                            renderItem={({ item }) => {
                            var img = `data:image/png;base64,${base64.decode(item.picture)}`
                            return (
                                <TouchableOpacity style={styles.product} onPress={() => props.navigation.navigate("Product", { product: item})}>
            
                                    <Image style={styles.buttonTop} source={{ uri: img }} resizeMode="stretch"/>
                                        
                                    <View style={styles.buttonDown}>
                                        <Text style={styles.goldText}>{item.name}</Text>
                                    </View>
                                    
                                </TouchableOpacity>
                        )
                        }} />

                        </View>

                    </View>


                </View>
            )
        }



    } else {
        return(
            <View style={styles.container}>

                <View style={styles.top}>
                    <FontAwesome style={styles.searchIcon} name="search" size={windowHeight*0.025} color="#EDB219" />
                    <TextInput
                    onChangeText={setSearch}
                    style={styles.textinput}
                    placeholder={"Search..."}
                    value={search}
                    />
                </View>


                <View style={[styles.bottom, { height: windowHeight*0.75 }]}>
                    <View style={styles.list}>
                        <FlatList 
                        numColumns={2}
                        contentContainerStyle={styles.flatlist}
                        data={searchResults}
                        keyExtractor={item => item.product_id}
                        renderItem={({ item }) => {
                            var img = `data:image/png;base64,${base64.decode(item.picture)}`
                            return (
                                <TouchableOpacity style={styles.product} onPress={() => props.navigation.navigate("Product", { product: item})}>
            
                                    <Image style={styles.buttonTop} source={{ uri: img }} resizeMode="stretch"/>
                                        
                                    <View style={styles.buttonDown}>
                                        <Text style={styles.goldText}>{item.name}</Text>
                                    </View>
                                    
                                </TouchableOpacity>
                        )
                        }} />

                    </View>

                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight*0.9,
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"space-between"
    },
    top: {
        width: windowWidth,
        height: windowHeight*0.15,
        flexDirection:"row",
        alignItems: "center",
        backgroundColor: "#7f0001",
    },
    bottom: {
        width: windowWidth,
        height: windowHeight*0.6,
        flexDirection:"row",
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
    },
    product: {
        width: windowWidth*0.43,
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