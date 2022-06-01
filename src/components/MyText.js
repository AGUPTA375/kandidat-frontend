import { Text } from "react-native";

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

export default function MyText(props) {

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

    function getWeight() {
        switch (props.weight) {
            case 'extralight':
                return 'Manrope_200ExtraLight'

            case 'light':
                return 'Manrope_300Light'
            
            case 'regular':
                return 'Manrope_400Regular'

            case 'medium':
                return 'Manrope_500Medium'

            case 'semibold':
                return 'Manrope_600SemiBold'

            case 'bold':
                return 'Manrope_700Bold'

            case 'extrabold':
                return 'Manrope_800ExtraBold'

            default:
                return 'Manrope_200ExtraLight'
            
        }
    }

    const weight = getWeight()


    return (
        <Text style={
            [props.style, { fontFamily: weight }]
        }>{props.text}</Text>
    )
}