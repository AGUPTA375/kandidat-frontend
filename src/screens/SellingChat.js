import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
// Window dimensions
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function SellingChat (props) {
  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      // clear error
    }
  }

  const DATA = [
    {
      id: 0,
      title: 'Chair',
      no_convs: 3
    },
    {
      id: 1,
      title: 'Couch',
      no_convs: 3
    },
    {
      id: 2,
      title: 'Bike',
      no_convs: 1
    }
  ]

  return (
    <View style={styles.root}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => {
          return (
            <View style={styles.list}>
              <TouchableOpacity style={styles.button}>
                <Text>{item.title}</Text>
                <Text>Conversations: {item.no_convs}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => clearAll()} style={{ width: windowWidth, height: windowHeight * 0.1, backgroundColor: 'black' }} />

            </View>

          )
        }}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'white'
  },
  list: {
    borderColor: 'black',
    borderWidth: 1
  },
  button: {
    width: windowWidth,
    height: windowHeight / 10

  }
})
