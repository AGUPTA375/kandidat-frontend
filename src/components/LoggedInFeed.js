import { useEffect, useState, useCallback } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions, ScrollView, Image, RefreshControl } from 'react-native'
import { getFollowingUsersProducts, getNotUsersProducts } from '../data'
import MyText from './MyText'
import AsyncStorage from '@react-native-async-storage/async-storage'


const base64 = require('base-64')

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function LoggedInFeed (props) {
  const [products, setProducts] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [id, setID] = useState(null)
  const [allProducts, setAllProducts] = useState([])

  const getID = async () => {
    try {
      const value = await AsyncStorage.getItem('id')
      if (value !== null) {
        setID(value)
      } else {
        setID(null)
      }
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    getID()
  }, [])

  useEffect(() => {
    if (id !== null) {
      getFollowingUsersProducts(id, setProducts)
      getNotUsersProducts(id, setAllProducts)
    }
  }, [id])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => {
      getFollowingUsersProducts(props.id, setProducts)
      setRefreshing(false)
    })
  }, [])

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
        }
    >
      <View style={styles.header}>
        <Image source={require('../assets/amargboheader.png')} style={styles.logo} />
      </View>
      <View style={{ width: windowWidth, height: windowHeight * 0.35 }}>
        <MyText style={{ fontSize: windowHeight * 0.032, alignSelf: 'center', marginTop: '4%' }} weight='extralight' text="Followed users items:" />
        <FlatList
          data={products}
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          horizontal
          keyExtractor={item => item.product_id}
          renderItem={({ item }) => {
            const img = `data:image/png;base64,${base64.decode(item.picture)}`
            return (
              <TouchableOpacity style={styles.product} onPress={() => props.navigation.navigate('Product', { product: item })}>

                <Image style={styles.buttonTop} source={{ uri: img }} resizeMode='stretch' />

                <View style={styles.buttonDown}>
                  <MyText style={styles.goldText} text={item.name} weight='semibold' />
                </View>

              </TouchableOpacity>
            )
          }}
        />
      </View>
      <View style={{ width: windowWidth, height: windowHeight * 0.35 }}>
        <MyText style={{ fontSize: windowHeight * 0.032, alignSelf: 'center', marginTop: '4%' }} text="All items:" weight='extralight' />
        <FlatList
          data={allProducts}
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          horizontal
          keyExtractor={item => item.product_id}
          renderItem={({ item }) => {
            const img = `data:image/png;base64,${base64.decode(item.picture)}`
            return (
              <TouchableOpacity style={styles.product} onPress={() => props.navigation.navigate('Product', { product: item })}>

                <Image style={styles.buttonTop} source={{ uri: img }} resizeMode='stretch' />

                <View style={styles.buttonDown}>
                  <MyText style={styles.goldText} text={item.name} weight='semibold' />
                </View>

              </TouchableOpacity>
            )
          }}
        />
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight * 0.9,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  product: {
    width: windowWidth * 0.43,
    height: windowHeight * 0.25,
    alignItems: 'center',
    backgroundColor: '#7f0001',
    marginHorizontal: windowWidth * 0.05,
    borderRadius: 10
  },
  goldText: {
    color: '#EDB219',
    fontSize: windowHeight * 0.02,
  },
  buttonTop: {
    width: windowWidth * 0.43,
    height: windowHeight * 0.17,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  buttonDown: {
    width: windowWidth * 0.43,
    height: windowHeight * 0.08,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.2,
    backgroundColor: '#7f0001',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.15,
    marginTop: '10%'
  }
})
