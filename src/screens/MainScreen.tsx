import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { NavParamList } from '../types/NavProps';
import Config from 'react-native-config';
import { InstalledApps } from 'react-native-launcher-kit';

type Props = NativeStackScreenProps<NavParamList, 'MainScreen'>;

async function getData(setValue: React.Dispatch<React.SetStateAction<any>>, jwtKey: string)
{
    const response = await fetch(Config.API + '/app/top?amount=10',
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwtKey },
    });
    const result = (await response.json());
    console.log(result);
    setValue(result);
}

function MainScreen({ route, navigation }: Props) : React.JSX.Element
{
    const { login, password, jwtKey } = route.params;
    const [apps, setApps] = useState<any[]>([]);
    useEffect(() => {getData(setApps, jwtKey)}, []);
    return(
        <View style={styles.container}>
            <FlatList style={styles.container} data={apps} renderItem={({item}) => { console.log(Config.API + '/files/apps/' + item.packageName + '/icon.png'); return(
                <View style={styles.itemContainer}>
                <Image height={70} width={70} source={{uri: Config.API + '/files/apps/' + item.packageName + '/icon.png'}}/>
                <Text style={styles.textView}>{item.name}</Text>
            </View>)}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    itemContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    textView: {
        backgroundColor: '#fff',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        fontSize: 20,
        marginLeft: 20
    }
});

export default MainScreen;