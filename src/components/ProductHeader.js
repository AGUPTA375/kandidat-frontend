import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'

// Window dimensions
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function ProductHeader (props) {
  return (
    <View style={styles.container}>

      <View style={styles.leftright}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <AntDesign name='left' size={windowHeight * 0.05} color='#EDB219' />
        </TouchableOpacity>
      </View>

      <View style={styles.mid}>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.line} />

      </View>

      <View style={styles.leftright}>
        <Image source={require('../assets/amargbologoonly.png')} style={styles.img} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight * 0.2,
    backgroundColor: '#7f0001',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '6%'
  },
  leftright: {
    height: windowHeight * 0.25,
    width: windowWidth * 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mid: {
    height: windowHeight * 0.25,
    width: windowWidth * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  img: {
    width: windowWidth * 0.15,
    height: windowHeight * 0.1
  },
  title: {
    fontSize: windowHeight * 0.04,
    color: '#EDB219',
    fontFamily: 'TharLon'
  },
  line: {
    width: windowWidth * 0.5,
    height: 1,
    backgroundColor: '#EDB219'
  }
})
