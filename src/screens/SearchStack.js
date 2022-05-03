import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './Search';

const Stack = createStackNavigator()

export default function SearchStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen component={Search} name="Search"/>
        </Stack.Navigator>
    )
}