import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SellingChat from './SellingChat';
import BuyingChat from './BuyingChat';
import CommunitiesChat from './CommunitiesChat';
import CommunitiesStack from '../components/CommunitiesStack';

export default function Chat(props) {
    if(props.route.params === undefined) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    } else if (props.route.params.screen === 0) {
        return (
            <SellingChat screen={"selling"}/>
        )
    } else if (props.route.params.screen === 1) {
        return (
            <BuyingChat screen={"buying"}/>
        )
    } else {
        return (
            //<CommunitiesChat screen={"communities"} com={"my"}/>
            <CommunitiesStack />
        )
    }

}