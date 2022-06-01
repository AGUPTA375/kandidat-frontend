import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AntDesign } from '@expo/vector-icons'

import { getUserIsFollowing, getUserFollowers, fetchUserInfo } from '../data'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const base64 = require('base-64')

export default function FollowersAndFollowing (props) {
  const [followers, setFollowers] = useState(null)
  const [following, setFollowing] = useState(null)
  const [id, setID] = useState(null)
  const [line, setLine] = useState(false)
  const [user, setUser] = useState(null)

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
    id !== null ? getUserIsFollowing(id, setFollowing) : {}
    id !== null ? getUserFollowers(id, setFollowers) : {}
    id !== null ? fetchUserInfo(id, setUser) : {}
  }, [id])

  if (following !== null && followers !== null && user !== null) {
    if (line) {
      return (
        <View style={styles.container}>

          {/* Header */}
          <View style={styles.header}>

            <View style={styles.headerTop}>

              <TouchableOpacity style={{ width: windowWidth * 0.2 }} onPress={() => props.navigation.goBack()}>
                <AntDesign name='left' size={windowHeight * 0.045} color='#EDB219' />

              </TouchableOpacity>
              <View style={{ width: windowWidth * 0.6, alignItems: 'center' }}>
                <Text style={styles.goldText}>{user.name}</Text>

              </View>

              <View style={{ width: windowWidth * 0.2 }} />

            </View>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.headerButtons} onPress={() => setLine(!line)}>
                <Text style={styles.goldText}>{followers.length} Followers</Text>
                <View style={[styles.line, { backgroundColor: line ? '#EDB219' : 'transparent' }]} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.headerButtons} onPress={() => setLine(!line)}>
                <Text style={styles.goldText}>{following.length} Following</Text>
                <View style={[styles.line, { backgroundColor: !line ? '#EDB219' : 'transparent' }]} />
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.root}>

            <FlatList
              contentContainerStyle={{ alignItems: 'center', marginTop: '5%' }}
              data={followers}
              keyExtractor={item => item.user_id}
              renderItem={({ item }) => {
                const im = `data:image/png;base64,${base64.decode(item.picture)}`
                return (
                  <TouchableOpacity style={styles.users} onPress={() => props.navigation.navigate('OtherUser', { user: item })}>
                    <Image source={{ uri: im }} style={styles.im} />
                    <Text style={styles.nameText}>{item.name}</Text>
                    <AntDesign name='right' size={windowHeight * 0.05} color='black' style={{ marginRight: '5%' }} />
                  </TouchableOpacity>
                )
              }}
            />

          </View>

        </View>
      )
    } else {
      return (
        <View style={styles.container}>

          {/* Header */}
          <View style={styles.header}>

            <View style={styles.headerTop}>

              <TouchableOpacity style={{ width: windowWidth * 0.2 }} onPress={() => props.navigation.goBack()}>
                <AntDesign name='left' size={windowHeight * 0.045} color='#EDB219' />

              </TouchableOpacity>
              <View style={{ width: windowWidth * 0.6, alignItems: 'center' }}>
                <Text style={styles.goldText}>{user.name}</Text>

              </View>

              <View style={{ width: windowWidth * 0.2 }} />

            </View>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.headerButtons} onPress={() => setLine(!line)}>
                <Text style={styles.goldText}>{followers.length} Followers</Text>
                <View style={[styles.line, { backgroundColor: line ? '#EDB219' : 'transparent' }]} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.headerButtons} onPress={() => setLine(!line)}>
                <Text style={styles.goldText}>{following.length} Following</Text>
                <View style={[styles.line, { backgroundColor: !line ? '#EDB219' : 'transparent' }]} />
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.root}>

            <FlatList
              contentContainerStyle={{ alignItems: 'center', marginTop: '5%' }}
              data={following}
              keyExtractor={item => item.user_id}
              renderItem={({ item }) => {
                const im = `data:image/png;base64,${base64.decode(item.picture)}`
                return (
                  <TouchableOpacity style={styles.users} onPress={() => props.navigation.navigate('OtherUser', { user: item })}>
                    <Image source={{ uri: im }} style={styles.im} />
                    <Text style={styles.nameText}>{item.name}</Text>
                    <AntDesign name='right' size={windowHeight * 0.05} color='black' style={{ marginRight: '5%' }} />
                  </TouchableOpacity>
                )
              }}
            />

          </View>

        </View>
      )
    }
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight * 0.9
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.2,
    backgroundColor: '#7f0001',
    flexDirection: 'column'
  },
  root: {
    width: windowWidth,
    height: windowHeight * 0.7
  },
  headerButtons: {
    width: windowWidth / 2,
    height: windowHeight * 0.06,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '1%'

  },
  goldText: {
    color: '#EDB219',
    fontSize: windowHeight * 0.025,
    fontWeight: 'bold'
  },
  line: {
    width: windowWidth * 0.4,
    height: 3,
    marginTop: '4%'
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
  },
  headerTop: {
    height: windowHeight * 0.14,
    width: windowWidth,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '10%',
    justifyContent: 'space-evenly'
  }
})
