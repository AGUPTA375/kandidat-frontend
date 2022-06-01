import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, TextInput } from 'react-native';
import CommunityHeader from './CommunityHeader';
import { useState, useEffect } from 'react'
import { joinChannelMakeBody, catchError, readMessages, stringifyBody, joinCommunityMakeBody } from '../ws';

// Icons
import { FontAwesome } from '@expo/vector-icons';

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var ws = new WebSocket('ws://13.51.193.82:5000/ws')
ws.sendmessage = async function(message) {
while (this.readyState === 0) {
    await sleep(100)
}
this.send(message)
} 

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



export default function CommunityChat(props) {



    var id = props.route.params.user_id
    var community_name = props.route.params.community.name


    const [msg, setMsg] = useState("")
    const [sending, setSending] = useState(false)
    const [messages, setMessages] = useState(null)
    
    useEffect(() => {

        ws.sendmessage(joinCommunityMakeBody(id, community_name))
        ws.sendmessage(readMessages(id, community_name))
        

        ws.onmessage = (e) => {
            var body = JSON.parse(e.data)
            var err = catchError(body)
            if (err !== null) {
                console.log("error: " + err)
            } else {
                var type = body.type
                switch (type) {
                    case 'channelJoin':
                        // console.log(body)
                        break

                    case 'channelMessages':
                    if (body.channelMessages.messages !== null) {
                        // console.log("messages")
                        // console.log(body)
                        setMessages(body.channelMessages.messages)
                    }

                    case 'sys':
                        // console.log("sys")
                        break
                    default:
                        // console.log(body)
                        break
                }
            }
        }

    }, [])

    useEffect(() => {
        if (sending) {
            ws.sendmessage(stringifyBody(msg, id, community_name))
            setSending(false)
            setMsg("")
            ws.sendmessage(readMessages(id, community_name))
        }
    }, [sending])




    return(
        <View style={styles.container}>

            <CommunityHeader title={props.route.params.community.name} nav={props.navigation} />
            
            <View style={styles.messagesView}>

                <FlatList
                data={messages}
                contentContainerStyle={styles.flatlistContainer}
                renderItem={({ item }) => {
                    console.log(item)
                    var isMyMessage = item['SenderID'] === id
                    var messageLength = item['Message'].length
                    return (
                        <>
                            <Text style={{ 
                                alignSelf: isMyMessage ? "flex-end" : "flex-start",
                                color: "gray"
                            }}>
                                {item['Sender']['Username']}
                            </Text>
                            <View style={[styles.message, { 
                                alignSelf: isMyMessage ? "flex-end" : "flex-start",
                                backgroundColor: isMyMessage ? "#0000eb" : "#d8d8d8",
                                width: windowWidth*(messageLength/30)
                                }]}
                            >
                            <Text style={[styles.messageText, { color: isMyMessage ? "white" : "black"}]}>
                                {item['Message']}
                            </Text>
                            </View>
                        </>

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

                <TouchableOpacity onPress={() => setSending(!sending)}
                disabled={msg === ""}>

                    <FontAwesome name="send" size={windowHeight*0.04} color={ msg === "" ? "#f7dd98" : "#edb219" } />

                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight*0.77,
    },
    messagesView: {
        width: windowWidth,
        height: windowHeight*0.55,
        alignItems:"center"
    },
    typingView: {
        width: windowWidth,
        height: windowHeight*0.13,
        alignItems:"center",
        flexDirection:"row",
        justifyContent: "space-evenly",
    },
    textinput: {
        width: windowWidth*0.75,
        height: windowHeight*0.06,
        backgroundColor:"white",
        borderWidth: 1,
        borderColor: "black",
        paddingLeft: "5%",
        borderRadius: 100
    },
    flatlistContainer: {
        width: windowWidth*0.95,
    },
    message: {
        maxWidth: windowWidth*0.6,
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 20,
        paddingVertical: "3%",
        marginVertical: "2%"
    },
    messageText: {
        fontWeight: "bold",
        fontSize: windowHeight*0.02
    }
})