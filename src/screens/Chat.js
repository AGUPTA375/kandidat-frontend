import { Text, View, Dimensions } from 'react-native';
import SellingChat from './SellingChat';
import BuyingChat from './BuyingChat';
import CommunitiesStack from '../components/CommunitiesStack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Tab = createMaterialTopTabNavigator();


export default function Chat(props) {
    return (
            <Tab.Navigator screenOptions={{
                tabBarActiveTintColor: '#EDB219',
                tabBarInactiveTintColor: '#8D5B10',
                tabBarStyle:{backgroundColor:"#7f0001", height: windowHeight*0.13, paddingTop: "12%"},
                tabBarIndicatorStyle: {backgroundColor:"#EDB219"}
            }}>
                <Tab.Screen name="Selling" component={SellingChat} />
                <Tab.Screen name="Buying" component={BuyingChat} />
                <Tab.Screen name="Communities" component={CommunitiesStack} />
            </Tab.Navigator>
        )

}