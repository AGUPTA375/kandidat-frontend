import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Dimensions, LogBox } from 'react-native'
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';

// Screens
import Home from '../src/screens/Home'
import SearchTabs from './screens/SearchTabs'
import Chat from '../src/screens/Chat'
import User from './components/User'

// Icons
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications



// Window dimensions
const windowHeight = Dimensions.get('window').height

const Tab = createBottomTabNavigator()

export default function App () {

  let [fontsLoaded] = useFonts({
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  if (!fontsLoaded) {
  return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#EDB219',
          tabBarInactiveTintColor: '#8D5B10',
          tabBarStyle: { backgroundColor: '#7f0001', height: windowHeight * 0.1 },
          tabBarLabelStyle: { fontFamily: 'Manrope_500Medium', fontSize: windowHeight*0.017 }
        }}
      >

        {/* Home */}
        <Tab.Screen
          name='Home' component={Home} options={{
            tabBarIcon: ({ focused, color }) => {
              var color = focused ? '#EDB219' : '#8D5B10'
              return <Entypo name='home' size={24} color={color} />
            },
            headerShown: false
          }}
        />

        {/* Search */}
        <Tab.Screen
          name='SearchTabs' component={SearchTabs} options={{
            tabBarIcon: ({ focused, color }) => {
              var color = focused ? '#EDB219' : '#8D5B10'
              return <AntDesign name='search1' size={24} color={color} />
            },
            headerShown: false,
            tabBarLabel: 'Search'
          }}
        />

        {/* Chat */}
        <Tab.Screen
          name='Chat' component={Chat} options={{
            tabBarIcon: ({ focused, color }) => {
              var color = focused ? '#EDB219' : '#8D5B10'
              return <Ionicons name='chatbox-ellipses' size={24} color={color} />
            },
            headerShown: false
          }}
        />

        {/* Profile */}
        <Tab.Screen
          name='User' component={User} options={{
            tabBarIcon: ({ focused, color }) => {
              var color = focused ? '#EDB219' : '#8D5B10'
              return <Ionicons name='person' size={24} color={color} />
            },
            headerShown: false
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  )
}
