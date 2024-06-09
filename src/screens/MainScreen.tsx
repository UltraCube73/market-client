import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View } from "react-native";
import { NavParamList } from '../types/NavProps';

type Props = NativeStackScreenProps<NavParamList, 'MainScreen'>;

function MainScreen({ route, navigation }: Props) : React.JSX.Element
{
    const { login, password, jwtKey } = route.params;
    useEffect(() => {console.log(login); console.log(password); console.log(jwtKey);});
    return(
        <View></View>
    );
}

export default MainScreen;