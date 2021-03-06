import { createStackNavigator } from '@react-navigation/stack'
import Feed from './Feed'
import OtherUser from './OtherUser'
import Product from './Product'
import UserChat from './UserChat'

const Stack = createStackNavigator()

export default function Home () {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Feed' component={Feed} />
      <Stack.Screen name='Product' component={Product} />
      <Stack.Screen name='OtherUser' component={OtherUser} />
      <Stack.Screen name='UserChat' component={UserChat} />
    </Stack.Navigator>
  )
}
