import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity, FlatList, ScrollView, RefreshControl, Modal, TextInput, Alert } from 'react-native'
import { useState, useEffect, useCallback } from 'react'
import { getUsersProducts, postReview, getUsersReviews, getUserIsFollowing, createFollow, makeChatRelation, getChattingUsers } from '../data'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AirbnbRating } from 'react-native-ratings'
import { checkIsFollowing, isChattingWithUser } from '../funcs'
import MyText from '../components/MyText'

import { MaterialIcons, AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons'

const base64 = require('base-64')

// Window dimensions
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function OtherUser (props) {
  function sendRating () {
    postReview(props.route.params.user.user_id, { rating, reviewer_id: parseInt(id), content: reviewContent }).then((data) => {
      if (data[0] === 400) {
        Alert.alert('Error', `${data[1].error}`, [{
          text: 'OK'
        }])
      }
    })
    wait(200).then(() => { setModalVisible(false) })
  }

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

  const [products, setProducts] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [id, setID] = useState(null)
  const [reviewContent, setReviewContent] = useState('')
  const [rating, setRating] = useState(3)
  const [line, setLine] = useState(false)
  const [reviews, setReviews] = useState([])
  const [following, setFollowing] = useState(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [update, setUpdate] = useState(false)
  const [chattingUsers, setChattingUsers] = useState(null)
  const [hasChat, setHasChat] = useState(null)

  useEffect(() => {
    getID()
    getUsersProducts(props.route.params.user.user_id, setProducts)
    getUsersReviews(props.route.params.user.user_id, setReviews)
  }, [])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => {
      getUsersProducts(props.route.params.user.user_id, setProducts)
      setRefreshing(false)
    })
  }, [])

  useEffect(() => {
    !modalVisible ? setReviewContent('') : {}
  }, [modalVisible])

  useEffect(() => {
    if (line) {
      getUsersReviews(props.route.params.user.user_id, setReviews)
    }
  }, [line])

  useEffect(() => {
    if (id !== null) {
      getUserIsFollowing(id, setFollowing)
      getChattingUsers(id, setChattingUsers)
    }
  }, [id])

  useEffect(() => {
    if (following !== null) {
      setIsFollowing(checkIsFollowing(following, props.route.params.user.user_id))
    } else {
      setIsFollowing(false)
    }
  }, [following])

  useEffect(() => {
    if (update) {
      if (id !== null) {
        getUserIsFollowing(id, setFollowing)
        setUpdate(false)
      }
    }
  }, [update, id])

  useEffect(() => {
    if (chattingUsers !== null) {
      if (chattingUsers.length === 0) {
        setHasChat(false)
      } else {
        setHasChat(isChattingWithUser(id, chattingUsers))
      }
    }
  }, [chattingUsers])

  if (line) {
    return (
      <View style={styles.container}>

        <Modal
          animationType='slide'
          visible={modalVisible}
          transparent
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modal}>
            <View style={{ width: '100%', height: '20%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
              >
                <AntDesign name='closecircleo' size={windowHeight * 0.04} color='black' style={{ marginRight: '10%' }} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', height: '70%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>

              <View style={{ alignItems: 'center' }}>
                <AirbnbRating defaultRating={3} showRating={false} onFinishRating={(rating) => setRating(rating)} size={windowHeight * 0.045} />
                <TextInput
                  value={reviewContent}
                  onChangeText={setReviewContent}
                  style={styles.ti}
                />
                <TouchableOpacity
                  style={{
                    width: windowWidth * 0.4,
                    backgroundColor: '#7f0001',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: windowHeight * 0.05,
                    borderRadius: 20,
                    marginTop: '10%'
                  }}
                  onPress={() => sendRating()}
                >
                  <MyText style={styles.goldText} text="Post review" weight='medium' />
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>

        <View style={styles.top}>

          <View style={{ width: windowWidth * 0.2, height: windowHeight / 2.5, paddingLeft: '5%', flexDirection: 'column', marginTop: '50%' }}>
            <TouchableOpacity style={{ marginBottom: windowHeight * 0.01 }} onPress={() => props.navigation.goBack()}>
              <AntDesign name='left' size={windowHeight * 0.05} color='#EDB219' />
            </TouchableOpacity>
            <Ionicons name='business' size={windowHeight * 0.05} color={props.route.params.user.business ? '#EDB219' : 'transparent'} />
          </View>

          <View style={styles.info}>
            <Image style={styles.profilepic} source={{ uri: `data:image/png;base64,${base64.decode(props.route.params.user.picture)}` }} resizeMode='contain' />
            <View style={styles.namenbutton}>

              <View style={{ flexDirection: 'row', width: windowWidth, justifyContent: 'space-evenly', marginBottom: '1%' }}>
                <MyText style={styles.name} text={props.route.params.user.name} weight='medium' />
              </View>

              <View style={{ flexDirection: 'row', width: windowWidth, justifyContent: 'space-around', alignItems: 'center' }}>
                <AirbnbRating isDisabled showRating={false} size={windowHeight * 0.03} defaultRating={Math.round(props.route.params.user.rating)} />
              </View>

            </View>
          </View>

          <View style={{ width: windowWidth * 0.2, height: '100%', marginRight: -windowWidth * 0.2, alignItems: 'center', marginTop: windowHeight * 0.08, justifyContent: 'space-evenly' }}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <MaterialIcons name='rate-review' size={windowHeight * 0.05} color='#EDB219' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              isFollowing ? {} : createFollow(props.route.params.user.user_id, { followed_id: parseInt(id) })
              setUpdate(!update)
            }}
            >
              <SimpleLineIcons name={isFollowing ? 'user-following' : 'user-follow'} size={windowHeight * 0.05} color='#EDB219' />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (id === null) {
                  Alert.alert('Error', 'You need to be logged in to start a conversation.', [{ text: 'OK' }])
                } else {
                  if (hasChat !== null) {
                    if (!hasChat) {
                      const body = {
                        user_id: props.route.params.user.user_id
                      }
                      makeChatRelation(id, body).then((data) => {
                        if (data[0] === 201) {
                          props.navigation.navigate('UserChat', { user: props.route.params.user, id })
                        }
                      })
                    } else {
                      props.navigation.navigate('UserChat', { user: props.route.params.user, id })
                    }
                  }
                }
              }}
              style={{ marginRight: '10%', marginTop: '2%' }}
            >
              <Ionicons name='chatbox-ellipses' size={windowHeight * 0.06} color='#EDB219' />
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ width: windowWidth, height: windowHeight * 0.1, flexDirection: 'row' }}>

          <TouchableOpacity style={styles.line} onPress={() => setLine(!line)}>
            <MyText style={styles.redtext} weight='regular' text="Ads" />
            <View style={{ width: windowWidth * 0.3, height: 2, backgroundColor: line ? 'transparent' : '#7f0001', marginTop: '5%' }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.line} onPress={() => setLine(!line)}>
          <MyText style={styles.redtext} weight='regular' text="Reviews" />
            <View style={{ width: windowWidth * 0.3, height: 2, backgroundColor: !line ? 'transparent' : '#7f0001', marginTop: '5%' }} />
          </TouchableOpacity>

        </View>

        <FlatList
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          data={reviews}
          keyExtractor={item => item.review_id}
          renderItem={({ item }) => {
            return (
              <View style={styles.flitem}>
                <View style={{ width: windowWidth * 0.5, height: windowHeight * 0.04, justifyContent: 'center', alignSelf: 'center' }}>
                  <AirbnbRating isDisabled showRating={false} defaultRating={Math.round(item.rating)} size={windowHeight * 0.025} />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: windowWidth * 0.7, height: windowHeight * 0.06 }}>
                  <MyText style={styles.goldText} text={item.content} weight='light' />
                </View>
              </View>
            )
          }}
        />

      </View>
    )
  } else {
    return (
      <View style={styles.container}>

        <Modal
          animationType='slide'
          visible={modalVisible}
          transparent
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modal}>
            <View style={{ width: '100%', height: '20%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
              >
                <AntDesign name='closecircleo' size={windowHeight * 0.04} color='black' style={{ marginRight: '10%' }} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', height: '70%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>

              <View style={{ alignItems: 'center' }}>
                <AirbnbRating defaultRating={3} showRating={false} onFinishRating={(rating) => setRating(rating)} size={windowHeight * 0.045} />
                <TextInput
                  value={reviewContent}
                  onChangeText={setReviewContent}
                  style={styles.ti}
                />
                <TouchableOpacity
                  style={{
                    width: windowWidth * 0.4,
                    backgroundColor: '#7f0001',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: windowHeight * 0.05,
                    borderRadius: 20,
                    marginTop: '10%'
                  }}
                  onPress={() => sendRating()}
                >
                  <MyText text="Post review" style={styles.goldText} weight='medium' />
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>

        <View style={styles.top}>

          <View style={{ width: windowWidth * 0.2, height: windowHeight / 2.5, marginTop: '50%', paddingLeft: '5%' }}>
            <TouchableOpacity style={{ marginBottom: windowHeight * 0.01 }} onPress={() => props.navigation.goBack()}>
              <AntDesign name='left' size={windowHeight * 0.05} color='#EDB219' />
            </TouchableOpacity>
            <Ionicons name='business' size={windowHeight * 0.05} color={props.route.params.user.business ? '#EDB219' : 'transparent'} />
          </View>

          <View style={styles.info}>
            <Image style={styles.profilepic} source={{ uri: `data:image/png;base64,${base64.decode(props.route.params.user.picture)}` }} resizeMode='contain' />
            <View style={styles.namenbutton}>
              <View style={{ flexDirection: 'row', width: windowWidth, justifyContent: 'space-evenly', marginBottom: '1%' }}>
                <MyText style={styles.name} text={props.route.params.user.name} weight='medium' />
              </View>

              <View style={{ flexDirection: 'row', width: windowWidth, justifyContent: 'space-around', alignItems: 'center' }}>
                <AirbnbRating isDisabled showRating={false} size={windowHeight * 0.03} defaultRating={Math.round(props.route.params.user.rating)} />
              </View>
            </View>
          </View>

          <View style={{ width: windowWidth * 0.2, height: '100%', marginRight: -windowWidth * 0.2, alignItems: 'center', marginTop: windowHeight * 0.08, justifyContent: 'space-evenly' }}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <MaterialIcons name='rate-review' size={windowHeight * 0.05} color='#EDB219' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              isFollowing ? {} : createFollow(props.route.params.user.user_id, { followed_id: parseInt(id) })
              setUpdate(!update)
            }}
            >
              <SimpleLineIcons name={isFollowing ? 'user-following' : 'user-follow'} size={windowHeight * 0.05} color='#EDB219' />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (id === null) {
                  Alert.alert('Error', 'You need to be logged in to start a conversation.', [{ text: 'OK' }])
                } else {
                  if (hasChat !== null) {
                    if (!hasChat) {
                      const body = {
                        user_id: props.route.params.user.user_id
                      }
                      makeChatRelation(id, body).then((data) => {
                        if (data[0] === 201) {
                          props.navigation.navigate('UserChat', { user: props.route.params.user, id })
                        }
                      })
                    } else {
                      props.navigation.navigate('UserChat', { user: props.route.params.user, id })
                    }
                  }
                }
              }}
              style={{ marginRight: '10%', marginTop: '2%' }}
            >
              <Ionicons name='chatbox-ellipses' size={windowHeight * 0.06} color='#EDB219' />
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ width: windowWidth, height: windowHeight * 0.1, flexDirection: 'row' }}>

          <TouchableOpacity style={styles.line} onPress={() => setLine(!line)}>
            <MyText style={styles.redtext} weight='regular' text="Ads" />
            <View style={{ width: windowWidth * 0.3, height: 2, backgroundColor: line ? 'transparent' : '#7f0001', marginTop: '5%' }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.line} onPress={() => setLine(!line)}>
              <MyText style={styles.redtext} weight='regular' text="Reviews" />
            <View style={{ width: windowWidth * 0.3, height: 2, backgroundColor: !line ? 'transparent' : '#7f0001', marginTop: '5%' }} />
          </TouchableOpacity>

        </View>

        <ScrollView
          contentContainerStyle={styles.productsView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
                    }
        >
          <FlatList
            horizontal
            keyExtractor={item => item.product_id}
            data={products}
            renderItem={({ item }) => {
              const im = `data:image/png;base64,${base64.decode(item.picture)}`
              return (
                <TouchableOpacity style={styles.product}>

                  <Image style={styles.buttonTop} source={{ uri: im }} resizeMode='stretch' />

                  <View style={styles.buttonDown}>
                    <MyText style={styles.goldText} text={item.content} weight='light' />
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
  ti: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.05,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: '10%',
    paddingLeft: '5%'
  },
  modal: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.35,
    alignSelf: 'center',
    marginTop: '50%',
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: 'white'
  },
  namenbutton: {
    flexDirection: 'column',
    width: windowWidth,
    height: windowHeight * 0.07,
    alignItems: 'center'
  },
  productsView: {
    height: windowHeight * 0.35,
    width: windowWidth * 0.9,
    alignSelf: 'center',
    alignItems: 'center'
  },
  container: {
    width: windowWidth,
    height: windowHeight * 0.9,
    backgroundColor: 'white'
  },
  bot: {
    width: windowWidth,
    height: windowHeight * 0.5,
    backgroundColor: 'white'
  },
  top: {
    width: windowWidth,
    height: windowHeight * 0.4,
    backgroundColor: '#7f0001',
    alignItems: 'center',
    paddingBottom: '25%',
    flexDirection: 'row'
  },
  info: {
    width: windowWidth * 0.6,
    height: windowHeight / 2.5,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  profilepic: {
    width: windowWidth / 2.5,
    height: windowHeight / 5,
    borderRadius: 1000,
    marginTop: '5%',
    marginBottom: '2%'
  },
  name: {
    fontSize: windowHeight / 30,
    color: '#EDB219',
  },
  product: {
    width: windowWidth * 0.43,
    height: windowHeight * 0.25,
    alignItems: 'center',
    backgroundColor: '#7f0001',
    marginHorizontal: windowWidth * 0.05,
    borderRadius: 10,
    alignSelf: 'center'
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
  goldText: {
    color: '#EDB219',
    fontSize: windowHeight * 0.02,
  },
  line: {
    flexDirection: 'column',
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  redtext: {
    color: '#7f0001',
    fontSize: windowHeight * 0.02,
  },
  flitem: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.1,
    marginVertical: windowHeight * 0.025,
    backgroundColor: '#7f0001',
    borderRadius: 30,
    flexDirection: 'column',
    alignItems: 'center'
  }
})
