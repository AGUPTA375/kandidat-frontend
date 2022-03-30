import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from "react"
import { GiftedChat } from 'react-native-gifted-chat'

export default function CommunityChat(props) {
    console.log(props)
    return(
        <View>
            <Text>{props.route.params.community}</Text>
        </View>
    )
}