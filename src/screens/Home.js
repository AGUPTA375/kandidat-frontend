import { createStackNavigator } from '@react-navigation/stack';
import Feed from './Feed';
import Product from './Product';

const Stack = createStackNavigator()

export default function Home() {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Feed" component={Feed}/>
      <Stack.Screen name='Product' component={Product} />
    </Stack.Navigator>
  )
}