import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { joinChannelMakeBody, catchError, stringifyBody, readMessages } from '../ws'
import { useEffect, useState } from 'react'
import MyText from '../components/MyText'

// Window dimensions
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const ws = new WebSocket('ws://13.51.193.82:5000/ws')

ws.sendmessage = async function (message) {
  while (this.readyState === 0) {
    await sleep(100)
  }
  this.send(message)
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default function UserChat (props) {
  const user = props.route.params.user
  const id = props.route.params.id

  const [msg, setMsg] = useState('')
  const [sending, setSending] = useState(false)
  const [messages, setMessages] = useState(null)
  const [users, setUsers] = useState(null)
  const [readyState, setReadyState] = useState(false)

  useEffect(() => {
    ws.sendmessage(joinChannelMakeBody(id, user.user_id.toString()))
    ws.sendmessage(readMessages(id, user.user_id.toString()))

    ws.onmessage = (e) => {
      const body = JSON.parse(e.data)
      const err = catchError('body: ' + body)
      if (err !== null) {
        console.log('error:' + err)
      } else {
        const type = body.type
        switch (type) {
          case 'channelJoin':
            if (body.channelJoin.messages !== null) {
              // console.log(body)
              // setMessages(body.channelJoin.messages)
            }
            break

          case 'channelMessages':
            if (body.channelMessages.messages !== null) {
              // console.log(body)
              setMessages(body.channelMessages.messages)
            }
            break

          case 'channelMessage':
            console.log('Message received')
            break

          case 'sys':
            break
          default:
            // console.log(body)
            break
        }
      }
    }
  }, [])

  // ws.sendmessage(readMessages(id, user.user_id.toString()))

  useEffect(() => {
    if (sending) {
      ws.sendmessage(stringifyBody(msg, id, user.user_id.toString()))
      setSending(false)
      setMsg('')
      ws.sendmessage(readMessages(id, user.user_id.toString()))
    }
  }, [sending])

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <View style={styles.headerSides}>

          <TouchableOpacity onPress={() => props.navigation.goBack()}>

            <AntDesign name='left' size={windowHeight * 0.05} color='#EDB219' />

          </TouchableOpacity>

        </View>

        <View style={styles.headerMid}>

          <MyText style={styles.goldText} text={user.name} weight='light' />

        </View>

        <View style={styles.headerSides} />

      </View>

      <View style={styles.messagesView}>

        <FlatList
          data={messages}
          contentContainerStyle={styles.flatlistContainer}
          renderItem={({ item }) => {
            const isMyMessage = item.RecipientUUID === user.user_id.toString()
            const messageLength = item.Message.length
            return (
              <View style={[styles.message, {
                alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
                backgroundColor: isMyMessage ? '#0000eb' : '#d8d8d8',
                width: windowWidth * (messageLength / 30)
              }]}
              >

                <Text style={[styles.messageText, { color: isMyMessage ? 'white' : 'black' }]}>
                  {item.Message}
                </Text>

              </View>
            )
          }}
        />

      </View>

      <View style={styles.typingView}>

        <TextInput
          value={msg}
          onChangeText={setMsg}
          style={styles.textinput}
        />

        <TouchableOpacity
          onPress={() => setSending(!sending)}
          disabled={msg === ''}
        >

          <FontAwesome name='send' size={windowHeight * 0.04} color={msg === '' ? '#f7dd98' : '#edb219'} />

        </TouchableOpacity>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight * 0.9
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.15,
    backgroundColor: '#7f0001',
    flexDirection: 'row'
  },
  headerSides: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10%'
  },
  headerMid: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10%'
  },
  goldText: {
    fontSize: windowHeight * 0.04,
    color: '#EDB219'
  },
  messagesView: {
    width: windowWidth,
    height: windowHeight * 0.65,
    alignItems: 'center'
  },
  typingView: {
    width: windowWidth,
    height: windowHeight * 0.1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  textinput: {
    width: windowWidth * 0.75,
    height: windowHeight * 0.06,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    paddingLeft: '5%',
    borderRadius: 100
  },
  flatlistContainer: {
    width: windowWidth * 0.95
  },
  message: {
    maxWidth: windowWidth * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: '3%',
    marginVertical: '2%'
  },
  messageText: {
    fontSize: windowHeight * 0.02
  }

})
