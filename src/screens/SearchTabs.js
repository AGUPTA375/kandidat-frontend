import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Dimensions } from 'react-native'
import SearchStack from './SearchStack'
import SearchUserStack from './SearchUserStack'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold
} from '@expo-google-fonts/manrope'

const windowHeight = Dimensions.get('window').height

const Tab = createMaterialTopTabNavigator()

export default function SearchTabs () {
  const [fontsLoaded] = useFonts({
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: '#EDB219',
      tabBarInactiveTintColor: '#8D5B10',
      tabBarStyle: { backgroundColor: '#7f0001', height: windowHeight * 0.13, paddingTop: '13%' },
      tabBarIndicatorStyle: { backgroundColor: '#EDB219' }
    }}
    >
      <Tab.Screen
        name='SearchStack' component={SearchStack} options={{
          tabBarLabel: 'Products',
          tabBarLabelStyle: {
            fontSize: windowHeight * 0.02,
            fontFamily: 'Manrope_500Medium'
          }

        }}
      />
      <Tab.Screen
        name='SearchUserStack' component={SearchUserStack} options={{
          tabBarLabel: 'Users',
          tabBarLabelStyle: {
            fontSize: windowHeight * 0.02,
            fontFamily: 'Manrope_500Medium'
          }
        }}
      />

    </Tab.Navigator>
  )
}
