import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, ScrollView, RefreshControl, Image } from "react-native"
import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { fetchAllProducts, getNotUsersProducts } from "../data";
import LoggedInFeed from "../components/LoggedInFeed";
import NotLoggedInFeed from "../components/NotLoggedInFeed";
import AsyncStorage from '@react-native-async-storage/async-storage';

var base64 = require('base-64');

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Feed(props) {

  const [id, setID] = useState(null)

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

  if (id === null) {
    return (
      <NotLoggedInFeed />
    )
  } else {
    return (
      <LoggedInFeed id={id} />
    )
  }

}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight*0.9,
    alignItems: "center",
  },
  product: {
    width: windowWidth*0.4,
    height:windowHeight*0.25,
    alignItems:"center"
  },
  products: {
    width: windowWidth*0.9,
    height: windowHeight*0.25,
    marginTop: "20%"
  },
  productimage: {
    width: windowWidth*0.35,
    height: windowHeight*0.15,
  },
  productinfo: {
    width: windowWidth*0.35,
    height: windowHeight*0.1,
    backgroundColor:"green"
  },
})