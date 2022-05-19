import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity, FlatList, ScrollView, RefreshControl, Modal } from "react-native";
import { useState, useEffect, useCallback } from "react"
import { getUsersProducts, postReview } from "../data";
import AsyncStorage from '@react-native-async-storage/async-storage';

var base64 = require('base-64');

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';

export default function OtherUser(props) {

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

    const [products, setProducts] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [star1, setStar1] = useState(false)
    const [star2, setStar2] = useState(false)
    const [star3, setStar3] = useState(false)
    const [star4, setStar4] = useState(false)
    const [star5, setStar5] = useState(false)
    const [id, setID] = useState(null)

    useEffect(() => {
        if (star1) {
            postReview(props.route.params.user.user_id, { rating: 1, reviewer_id: parseInt(id)})
            setModalVisible(false)
        }
    }, [star1])

    useEffect(() => {
        if (star2) {
            postReview(props.route.params.user.user_id, { rating: 2, reviewer_id: parseInt(id)})
            setModalVisible(false)
        }
    }, [star2])

    useEffect(() => {
        if (star3) {
            postReview(props.route.params.user.user_id, { rating: 3, reviewer_id: parseInt(id)})
            setModalVisible(false)
        }
    }, [star3])

    useEffect(() => {
        if (star4) {
            postReview(props.route.params.user.user_id, { rating: 4, reviewer_id: parseInt(id)})
            setModalVisible(false)
        }
    }, [star4])

    useEffect(() => {
        if (star5) {
            postReview(props.route.params.user.user_id, { rating: 5, reviewer_id: parseInt(id)})
            setModalVisible(false)
        }
    }, [star5])

    useEffect(() => {
        getID()
        getUsersProducts(props.route.params.user.user_id, setProducts)
    }, [])

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            getUsersProducts(props.route.params.user.user_id, setProducts)
            setRefreshing(false)
        });
      }, []);
    
    return(
        <View style={styles.container}>

            <Modal
            animationType="slide"
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => setModalVisible(!modalVisible)} >
                <View style={styles.modal}>
                    <View style={{ width: "100%", height: "30%", justifyContent:"flex-end", alignItems:"flex-end"}}>
                        <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}>
                            <AntDesign name="closecircleo" size={windowHeight*0.04} color="black" style={{ marginRight: "10%" }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection:"row", height: "70%", width:"100%", justifyContent:"center", alignItems:"center"}}>

                        <TouchableOpacity onPress={() => setStar1(!star1)}>
                            <Entypo name="star-outlined" size={windowHeight*0.04} color="#EDB219" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setStar2(!star2)}>
                            <Entypo name="star-outlined" size={windowHeight*0.04} color="#EDB219" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setStar3(!star3)}>
                            <Entypo name="star-outlined" size={windowHeight*0.04} color="#EDB219" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setStar4(!star4)}>
                            <Entypo name="star-outlined" size={windowHeight*0.04} color="#EDB219" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setStar5(!star5)}>
                            <Entypo name="star-outlined" size={windowHeight*0.04} color="#EDB219" />
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            <View style={styles.top}>

                <View style={styles.info}>
                    <Image style={styles.profilepic} source={{ uri: `data:image/png;base64,${base64.decode(props.route.params.user.picture)}`}} resizeMode="contain" />
                    <View style={styles.namenbutton}>
                        <Text style={styles.name}>{props.route.params.user.name}</Text>
                        <Text style={styles.name}>Rating: {props.route.params.user.rating}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                            <MaterialIcons name="rate-review" size={24} color="#EDB219" />   
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

            <ScrollView contentContainerStyle={styles.productsView}
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    />
                } > 
                    <FlatList 
                    horizontal={true}
                    keyExtractor={item => item.product_id}
                    data={products}
                    renderItem={({ item }) => {
                        var im = `data:image/png;base64,${base64.decode(item.picture)}`
                        return (
                                <TouchableOpacity style={styles.product}>

                                    <Image style={styles.buttonTop} source={{ uri: im }} resizeMode="contain"/>
                                        


                                    <View style={styles.buttonDown}>
                                        <Text style={styles.goldText}>{item.name}</Text>
                                    </View>
                                    
                                </TouchableOpacity>
                        )
                    }}
                    />
                </ScrollView>

        </View>
    )

}

const styles = StyleSheet.create({
    modal: { 
        width: windowWidth*0.8, 
        height: windowHeight*0.2, 
        alignSelf:"center",
        marginTop: "50%",
        borderRadius: 50,
        borderWidth: 1,
        backgroundColor:"white"
    },
    namenbutton: {
        flexDirection:"row",
        width: windowWidth,
        height: windowHeight*0.07,
        alignItems:"center",
        justifyContent:"space-evenly"
    },
    productsView: {
        height: windowHeight*0.35,
        width: windowWidth*0.9,
        alignSelf:"center",
        alignItems:"center",
    },
    container: {
        width: windowWidth,
        height: windowHeight*0.9,
        backgroundColor: "white"
    },
    bot: {
        width: windowWidth,
        height:windowHeight*0.5,
        backgroundColor:"white"
    },
    top: {
        width: windowWidth,
        height: windowHeight*0.4,
        backgroundColor:"#7f0001",
        alignItems:"center",
        paddingBottom: "10%",
        flexDirection:"row",
        justifyContent:"center"
    },
    info: {
        width: windowWidth*0.6,
        height: windowHeight/2.5,
        alignItems:"center",
        justifyContent:"flex-end"
    },
    profilepic: {
        width: windowWidth/2.5,
        height: windowHeight/5,
        borderRadius: 1000,
        marginTop: "5%",
        marginBottom: "2%"
    },
    name: {
        fontSize: windowHeight/30,
        color: "#EDB219",
        fontWeight:"bold"
    },
    product: {
        width: windowWidth*0.43,
        height:windowHeight*0.25,
        alignItems:"center",
        backgroundColor:"#7f0001",
        marginHorizontal: windowWidth*0.05,
        borderRadius: 10,
        alignSelf:"center"
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
    goldText: { 
        color: "#EDB219", 
        fontSize:windowHeight*0.02, 
        fontWeight:"bold"
    },
})