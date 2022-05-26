import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from "react"
import { GiftedChat } from 'react-native-gifted-chat'
import CommunityHeader from './CommunityHeader';

export default function CommunityChat(props) {

    return(
        <View>
            <CommunityHeader title={props.route.params.community} nav={props.navigation} />
            <Text>{props.route.params.community}</Text>
        </View>
    )
}