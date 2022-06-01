import { createStackNavigator } from '@react-navigation/stack';
import SearchUser from './SearchUser';
import OtherUser from './OtherUser';

const Stack = createStackNavigator()


export default function SearchUserStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="SearchUser" component={SearchUser} />
            <Stack.Screen name="OtherUser" component={OtherUser} />

        </Stack.Navigator>
    )
}