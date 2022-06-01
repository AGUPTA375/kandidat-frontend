import { Dimensions } from 'react-native'
import PrivateChatsStack from './PrivateChatsStack'
import CommunitiesStack from '../components/CommunitiesStack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Manrope_500Medium,
} from '@expo-google-fonts/manrope';

// Window dimensions
const windowHeight = Dimensions.get('window').height

const Tab = createMaterialTopTabNavigator()

export default function Chat () {

  let [fontsLoaded] = useFonts({
    Manrope_500Medium,
  });

  if (!fontsLoaded) {
  return <AppLoading />;
  }

  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: '#EDB219',
      tabBarInactiveTintColor: '#8D5B10',
      tabBarStyle: { backgroundColor: '#7f0001', height: windowHeight * 0.13, paddingTop: '13%' },
      tabBarIndicatorStyle: { backgroundColor: '#EDB219' },
      tabBarLabelStyle: {
        fontSize: windowHeight*0.02,
        fontFamily: 'Manrope_500Medium'
      }
    }}
    >
      <Tab.Screen name='Private' component={PrivateChatsStack} />
      <Tab.Screen
        name='CommunitiesStack' component={CommunitiesStack} options={{
          title: 'Communities'
        }}
      />
    </Tab.Navigator>
  )
}
