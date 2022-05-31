import { Dimensions } from 'react-native';
import PrivateChatsStack from './PrivateChatsStack';
import CommunitiesStack from '../components/CommunitiesStack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Window dimensions
const windowHeight = Dimensions.get('window').height;

const Tab = createMaterialTopTabNavigator();


export default function Chat() {
    return (
            <Tab.Navigator screenOptions={{
                tabBarActiveTintColor: '#EDB219',
                tabBarInactiveTintColor: '#8D5B10',
                tabBarStyle:{backgroundColor:"#7f0001", height: windowHeight*0.13, paddingTop: "13%"},
                tabBarIndicatorStyle: {backgroundColor:"#EDB219"}
            }}>
                <Tab.Screen name="Private" component={PrivateChatsStack} />
                <Tab.Screen name="CommunitiesStack" component={CommunitiesStack} options={{
                    title: "Communities"
                }} />
            </Tab.Navigator>
        )

}