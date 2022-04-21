import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import Home from '../src/screens/Home'
import Profile from '../src/screens/Profile'
import Search from '../src/screens/Search'
import Chat from '../src/screens/Chat'

// Icons
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

// Components
import ChatHeader from './components/ChatHeader';

const Tab = createBottomTabNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#EDB219',
        tabBarInactiveTintColor: '#8D5B10',
        tabBarStyle:{backgroundColor:"#7f0001"}
      }}>

        {/* Home */}
        <Tab.Screen name="Home" component={Home} options={{
          tabBarIcon: ({focused, color}) => {
            var color = focused ? "#EDB219" : "#8D5B10"
            return <Entypo name="home" size={24} color={color}/>;
          }
        }} />

        {/* Search */}
        <Tab.Screen name="Search" component={Search} options={{
          tabBarIcon: ({focused, color}) => {
            var color = focused ? "#EDB219" : "#8D5B10"
            return <AntDesign name="search1" size={24} color={color} />;
          }
        }}/>
        
        {/* Chat */}
        <Tab.Screen name="Chat" component={Chat} options={{
          tabBarIcon: ({focused, color}) => {
            var color = focused ? "#EDB219" : "#8D5B10"
            return <Ionicons name="chatbox-ellipses" size={24} color={color} />;
          },
          header: (props) => {
            return <ChatHeader title={"CHATROOM"} screen={0} nav={props.navigation} />;
          }
        }} />

        {/* Profile */}
        <Tab.Screen name="Profile" component={Profile} options={{
          tabBarIcon: ({focused, color}) => {
            var color = focused ? "#EDB219" : "#8D5B10"
            return <Ionicons name="person" size={24} color={color} />;
          },
          headerShown: false
        }} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}
