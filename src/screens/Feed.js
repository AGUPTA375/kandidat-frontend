import { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import LoggedInFeed from "../components/LoggedInFeed";
import NotLoggedInFeed from "../components/NotLoggedInFeed";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Feed(props) {

  const [id, setID] = useState(null)
  const [ready, setReady] = useState(false)

  const getID = async () => {
    try {
    const value = await AsyncStorage.getItem('id')
    if(value !== null) {
        setID(value)
        
    } else {
        setID(null)
    }
    setReady(true)
    } catch(e) {
    // error reading value
    }
  }

  useEffect(() => {
      getID();
  }, [])

  useFocusEffect(() => {
      getID();
  })
  
  if (ready) {
    if (id !== null) {
      return (
        <LoggedInFeed id={id} navigation={props.navigation} />
      )
    } else {
      return (
        <NotLoggedInFeed navigation={props.navigation}/>
  
      )
    }
  } else {
    return null
  }


}