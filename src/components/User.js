import { createStackNavigator } from '@react-navigation/stack';

import Product from '../screens/Product';
import Profile from '../screens/Profile';
import FollowersAndFollowing from '../screens/FollowersAndFollowing';

const Stack = createStackNavigator()

export default function User() {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen name ="FollowersAndFollowing" component={FollowersAndFollowing} />
        </Stack.Navigator>
    )
}