import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import CommunityHeader from './CommunityHeader';
import { useState, useEffect } from 'react'
import { joinChannel, catchError, channelJoined } from '../ws';

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Websocket

export default function CommunityChat(props) {

    var ws = new WebSocket('ws://localhost:8080/ws')

    const [SUUID, setSUUID] = useState(null)
    const [joinedChannel, setJoinedChannel] = useState(false)

    useEffect(() => {
        ws.onmessage = (e) => {
            var body = JSON.parse(e.data)
            var err = catchError(body)
            if (err !== null) {
                console.log("error: " + err)
            } else {
                if (body.type === 'ready') {
                    setSUUID(body.ready.sessionUUID)
                    console.log(body.ready)
                    joinChannel(ws, body.ready.sessionUUID, 0, "0")
                } else if (body.type === 'channelJoin') {
                    setJoinedChannel(true)
                    console.log(channelJoined(body))
                } else {
                    console.log("else:")
                    console.log(body)
                }
            }
 
        }


    }, [])

    useEffect(() => {
        if (joinedChannel) {

        } else {
            ws.onopen = () => {
                
            }
        }
    }, [joinedChannel])

    return(
        <View style={styles.container}>

            <CommunityHeader title={props.route.params.community.name} nav={props.navigation} />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight*0.77,
    }
})