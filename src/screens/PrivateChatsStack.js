import { createStackNavigator } from '@react-navigation/stack';
import PrivateChats from './PrivateChats';
import UserChat from './UserChat';

const Stack = createStackNavigator()

export default function PrivateChatsStack() {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PrivateChats" component={PrivateChats}/>
            <Stack.Screen name ="UsrChat" component={UserChat} />
        </Stack.Navigator>
    )
}