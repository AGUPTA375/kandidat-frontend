import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';

// Window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Screens
import Home from '../src/screens/Home'
import Profile from '../src/screens/Profile'
import SearchStack from './screens/SearchStack';
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
        tabBarStyle:{backgroundColor:"#7f0001", height: windowHeight*0.1},

      }}>

        {/* Home */}
        <Tab.Screen name="Home" component={Home} options={{
          tabBarIcon: ({focused, color}) => {
            var color = focused ? "#EDB219" : "#8D5B10"
            return <Entypo name="home" size={24} color={color}/>;
          },
          headerShown: false
        }} />

        {/* Search */}
        <Tab.Screen name="SearchStack" component={SearchStack} options={{
          tabBarIcon: ({focused, color}) => {
            var color = focused ? "#EDB219" : "#8D5B10"
            return <AntDesign name="search1" size={24} color={color} />;
          },
          headerShown: false,
          tabBarLabel: "Search"
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
