import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, TextInput, FlatList, RefreshControl, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Settings from './Settings';
import { AirbnbRating } from 'react-native-ratings';

// Icons
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { getUserInfo, getUsersProducts, getPinnedProducts } from '../data';
import CreateProduct from './CreateProduct';

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
    const [settingsVisible, setSettingsVisible] = useState(false)
    const [addVisible, setAddVisible] = useState(false)
    const [userProducts, setUserProducts] = useState(null)
    const [refreshing, setRefreshing] = useState(false);
    const [line, setLine] = useState(false)
    const [pinnedProducts, setPinnedProducts] = useState(null)
    const [rating, setRating] = useState(0)
    const [user, setUser] = useState(null)

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => {
        getUsersProducts(props.id, setUserProducts)
        setRefreshing(false)
      });
    }, []);

    const onRefresh2 = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            getPinnedProducts(props.id, setPinnedProducts)
            setRefreshing(false)
        });
      }, []);

    useEffect(() => {
        getUserInfo(props.id).then((data) => {
            if(data[0] === 200) {
                var user = data[1]
                setImg(`data:image/png;base64,${base64.decode(user.picture)}`)
                setName(user.name)
                setUser(user)
                if (user.rating !==  null) {
                    setRating(user.rating)
                }
            }
        });
        getUsersProducts(props.id, setUserProducts)
        getPinnedProducts(props.id, setPinnedProducts)
    }, [])

    if (!line) {
        if (user !== null) {
            return (
                <View >
                    <Settings modal={settingsVisible} setModal={setSettingsVisible} clear={clearAll} navigation={props.nav}/>
                    <CreateProduct modal={addVisible} setModal={setAddVisible} id={props.id}/>
                    <View style={styles.profile}>
                        <View style={{ width: windowWidth*0.2, height: windowHeight/2.5, marginTop:"45%", paddingLeft:"5%"}}>
                            <Ionicons name="business" size={windowHeight*0.05} color={user.business ? "#EDB219" : "transparent"}/>
                        </View>
                        <View style={styles.info}>
                            <Image style={styles.profilepic} source={{ uri: img}} resizeMode="contain" />
                            <AirbnbRating isDisabled={true} showRating={false} size={windowHeight*0.03} defaultRating={Math.round(rating)} />
                            <View style={{ flexDirection:"row", justifyContent:"space-evenly", width: windowWidth }}>
                                <Text style={styles.name}>{name}</Text>
                                
                            </View>
                        </View>
                        <View style={{ width: windowWidth*0.2, height: windowHeight/2.5, marginTop: "45%"}}>
                            <TouchableOpacity
                            onPress={() => setSettingsVisible(!settingsVisible)}>
                                <Ionicons name="settings-sharp" size={windowHeight*0.05} color="#EDB219" />
                            </TouchableOpacity>
    
                            <TouchableOpacity onPress={() => props.nav.navigate("FollowersAndFollowing", { id: props.id })}>
    
                                    <Ionicons name="people" size={windowHeight*0.05} color="#EDB219" style={{ marginTop:"5%"}}/>
    
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
                        <TouchableOpacity
                        onPress={() => setAddVisible(!addVisible)}>
                            <Ionicons name="add-circle-outline" size={windowHeight/30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.adsbanner}>
    
                        <View style={styles.myorpinned}>
                            <TouchableOpacity style={styles.mopTO} onPress={() => setLine(false)}>
    
                                <Text style={styles.mopText}>My uploaded ads</Text>
                                <View style={[styles.line, {
                                    backgroundColor: line ? "transparent" : "#7f0001"
                                }]}></View>
    
                            </TouchableOpacity>
    
                            <TouchableOpacity style={styles.mopTO} onPress={() => setLine(true)}>
    
                                <Text style={styles.mopText}>Pinned ads</Text>
                                <View style={[styles.line, {
                                    backgroundColor: !line ? "transparent" : "#7f0001",
                                    width: windowWidth*0.3
                                }]}></View>
    
                            </TouchableOpacity>
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
                        data={userProducts}
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
        } else {
            return null
        }
        
    } else {
        return(
            <View >
                <Settings modal={settingsVisible} setModal={setSettingsVisible} clear={clearAll} navigation={props.nav}/>
                <CreateProduct modal={addVisible} setModal={setAddVisible} id={props.id}/>
                <View style={styles.profile}>
                    <View style={{ width: windowWidth*0.2, height: windowHeight/2.5, marginTop:"45%", paddingLeft:"5%"}}>
                        <Ionicons name="business" size={windowHeight*0.05} color={user.business ? "#EDB219" : "transparent"}/>
                    </View>
                    <View style={styles.info}>
                        <Image style={styles.profilepic} source={{ uri: img}} resizeMode="contain" />
                        <AirbnbRating isDisabled={true} showRating={false} size={windowHeight*0.03} defaultRating={Math.round(rating)} />
                        <View style={{ flexDirection:"row", justifyContent:"space-evenly", width: windowWidth }}>
                            <Text style={styles.name}>{name}</Text>
                        </View>
                    </View>
                    <View style={{ width: windowWidth*0.2, height: windowHeight/2.5, marginTop: "45%"}}>
                        <TouchableOpacity
                        onPress={() => setSettingsVisible(!settingsVisible)}>
                            <Ionicons name="settings-sharp" size={windowHeight*0.05} color="#EDB219" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.nav.navigate("FollowersAndFollowing", { id: props.id })}>

                                <Ionicons name="people" size={windowHeight*0.05} color="#EDB219" style={{ marginTop:"5%"}}/>

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
                    <TouchableOpacity
                    onPress={() => setAddVisible(!addVisible)}>
                        <Ionicons name="add-circle-outline" size={windowHeight/30} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.adsbanner}>

                    <View style={styles.myorpinned}>
                        <TouchableOpacity style={styles.mopTO} onPress={() => setLine(false)}>

                            <Text style={styles.mopText}>My uploaded ads</Text>
                            <View style={[styles.line, {
                                backgroundColor: line ? "transparent" : "#7f0001"
                            }]}></View>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.mopTO} onPress={() => setLine(true)}>

                            <Text style={styles.mopText}>Pinned ads</Text>
                            <View style={[styles.line, {
                                backgroundColor: !line ? "transparent" : "#7f0001",
                                width: windowWidth*0.3
                            }]}></View>

                        </TouchableOpacity>
                    </View>

                </View>

                <ScrollView contentContainerStyle={styles.productsView}
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh2}
                    />
                } > 
                    <FlatList 
                    horizontal={true}
                    keyExtractor={item => item.product_id}
                    data={pinnedProducts}
                    renderItem={({ item }) => {
                        var im = `data:image/png;base64,${base64.decode(item.picture)}`
                        return (
                                <TouchableOpacity style={styles.product}
                                onPress={() => props.nav.navigate("Product", { product: item })} >

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
        fontSize: windowHeight/30,
        color: "#EDB219",
        fontWeight:"bold"
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
        marginTop: "5%",
    },
    searchIcon: {
        position: "absolute",
        paddingLeft: windowWidth*0.02,
    },
    info: {
        width: windowWidth*0.6,
        height: windowHeight/2.5,
        alignItems:"center",
        justifyContent:"flex-end"
    },
    productsView: {
        height: windowHeight*0.35,
        width: windowWidth*0.9,
        alignSelf:"center",
        alignItems:"center",
    },
    button: {
        width: windowWidth*0.43,
        height: windowHeight*0.25,
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
        marginHorizontal:"3%",
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
    product: {
        width: windowWidth*0.43,
        height:windowHeight*0.25,
        alignItems:"center",
        backgroundColor:"#7f0001",
        marginHorizontal: windowWidth*0.05,
        borderRadius: 10
      },
    adsbanner: {
        height: windowHeight*0.1,
        width: windowWidth,
        justifyContent:"center",
        alignItems:"center"

    },
    myorpinned: {
        width: windowWidth*0.9,
        height: "60%",
        flexDirection:"row"
    },
    mopTO: {
        width: windowWidth*0.45,
        height: "100%",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
    },
    mopText: {
        fontSize: windowHeight*0.02,
        color: "#7f0001",
        fontWeight:"bold",
        marginBottom: "5%"
    },
    line: {
        width: windowWidth*0.4,
        height: 1,
        backgroundColor:"black"
    }
})