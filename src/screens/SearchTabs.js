import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Dimensions } from 'react-native';
import SearchStack from './SearchStack';
import SearchUserStack from './SearchUserStack';

const windowHeight = Dimensions.get('window').height;

const Tab = createMaterialTopTabNavigator();

export default function SearchTabs() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: '#EDB219',
            tabBarInactiveTintColor: '#8D5B10',
            tabBarStyle:{backgroundColor:"#7f0001", height: windowHeight*0.13, paddingTop: "13%"},
            tabBarIndicatorStyle: {backgroundColor:"#EDB219"}
        }}>
            <Tab.Screen name="SearchStack" component={SearchStack} options={{
                tabBarLabel: "Products"
            }}/>
            <Tab.Screen name="SearchUserStack" component={SearchUserStack} options={{
                tabBarLabel: "Users"
            }} />

        </Tab.Navigator>
    )
}