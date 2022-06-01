import { createStackNavigator } from '@react-navigation/stack'
import CommunitiesChat from '../screens/CommunitiesChat'
import CommunityChat from './CommunityChat'

const Stack = createStackNavigator()

export default function CommunitiesStack () {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Communities' component={CommunitiesChat} />
      <Stack.Screen name='Community chat' component={CommunityChat} />
    </Stack.Navigator>
  )
}
