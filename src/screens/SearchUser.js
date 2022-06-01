import { View, StyleSheet, Dimensions, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native'
import { useState, useEffect } from 'react'
import { getAllUsers } from '../data'
import { searchItems } from '../funcs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import MyText from '../components/MyText'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const base64 = require('base-64')

export default function SearchUser (props) {
  const getID = async () => {
    try {
      const value = await AsyncStorage.getItem('id')
      if (value !== null) {
        setID(value)
      } else {
        setID(null)
      }
      setReady(true)
    } catch (e) {
      // error reading value
    }
  }

  const [search, setSearch] = useState('')
  const [users, setUsers] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
  const [id, setID] = useState(null)

  useEffect(() => {
    getID()
  }, [])

  useEffect(() => {
    if (id !== null) {
      getAllUsers(setUsers)
    }
  }, [id])

  useEffect(() => {
    if (users !== null) {
      if (search === '') {
        setSearchResults(users)
      } else {
        setSearchResults(searchItems(search, users))
      }
    }
  }, [users, search])

  if (id !== null) {
    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <FontAwesome style={styles.searchIcon} name='search' size={windowHeight * 0.025} color='#EDB219' />
          <TextInput
            onChangeText={setSearch}
            style={styles.textinput}
            placeholder='Search...'
            value={search}
          />
        </View>

        <View style={styles.usersView}>

          <FlatList
            data={searchResults}
            keyExtractor={item => item.user_id}
            contentContainerStyle={{ alignItems: 'center' }}
            renderItem={({ item }) => {
              const im = `data:image/png;base64,${base64.decode(item.picture)}`
              if (item.user_id === parseInt(id)) {
                return null
              } else {
                return (
                  <TouchableOpacity style={styles.users} onPress={() => props.navigation.navigate('OtherUser', { user: item })}>
                    <Image source={{ uri: im }} style={styles.im} />
                    <MyText style={styles.nameText} text={item.name} weight='light' />
                    <AntDesign name='right' size={windowHeight * 0.05} color='black' style={{ marginRight: '5%' }} />
                  </TouchableOpacity>
                )
              }
            }}
          />

        </View>

      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight * 0.77
  },
  topView: {
    width: windowWidth,
    height: windowHeight * 0.15,
    backgroundColor: '#7f0001',
    justifyContent: 'center'
  },
  searchIcon: {
    position: 'absolute',
    marginLeft: '13%'
  },
  textinput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    width: windowWidth * 0.8,
    paddingLeft: '12%',
    height: windowHeight * 0.06,
    marginLeft: ' 10%',
    color: '#EDB219',
    fontWeight: 'bold'
  },
  usersView: {
    width: windowWidth,
    height: windowHeight * 0.62
  },
  users: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.1,
    backgroundColor: '#d8d8d8',
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '3%'
  },
  im: {
    width: windowWidth * 0.15,
    height: windowHeight * 0.075,
    marginLeft: '5%',
    borderRadius: 1000
  },
  nameText: {
    fontSize: windowHeight * 0.03
  }
})
