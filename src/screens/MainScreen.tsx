import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from "react-native";
import { NavParamList } from '../types/NavProps';
import Config from 'react-native-config';

type Props = NativeStackScreenProps<NavParamList, 'MainScreen'>;

async function getData(setValue: React.Dispatch<React.SetStateAction<string>>, jwtKey: string)
{
    const response = await fetch(Config.API + '/app/top?amount=10',
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwtKey },
    });
    const result = (await response.json());
    console.log(result);
}

function MainScreen({ route, navigation }: Props) : React.JSX.Element
{
    const { login, password, jwtKey } = route.params;
    const [apps, setApps] = useState('');
    useEffect(() => {getData(setApps, jwtKey)});
    return(
        <View>
            <FlatList data={apps} renderItem={({item}) => {}}/>
        </View>
    );
}

export default MainScreen;