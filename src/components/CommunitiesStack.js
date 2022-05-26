import { createStackNavigator } from '@react-navigation/stack';
import { View,Text } from 'react-native';
import CommunitiesChat from '../screens/CommunitiesChat';
import CommunityChat from './CommunityChat';
import CommunityHeader from './CommunityHeader';

const Stack = createStackNavigator()


export default function CommunitiesStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Communities" component={CommunitiesChat} />
            <Stack.Screen name="Community chat" component={CommunityChat} />
        </Stack.Navigator>
    )
}