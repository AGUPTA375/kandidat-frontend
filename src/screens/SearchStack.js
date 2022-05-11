import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './Search';
import Product from './Product';

const Stack = createStackNavigator()

export default function SearchStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen component={Search} name="Search"/>
            <Stack.Screen component={Product} name="Product"/>
        </Stack.Navigator>
    )
}