import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from "react-native";
import { InstalledApps } from 'react-native-launcher-kit';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParamList } from '../types/NavProps';

type Props = NativeStackScreenProps<NavParamList, 'ApplicationScreen'>;

function ApplicationScreen({ route, navigation }: Props) : React.JSX.Element
{
    const { login, jwtKey, application } = route.params;
    //useEffect(() => {setLogin(loginText)}, []);
    return(
        <View></View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputView: {
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 30,
        width: '70%',
        height: 45,
        marginBottom: 20,
        alignItems: 'center'
    },
    buttonView: {
        backgroundColor: '#4275f5',
        borderRadius: 30,
        width: '70%',
        height: 35,
        marginBottom: 20,
        alignItems: 'center'
    },
    buttonText: {
        height: 30,
        flex: 1,
        padding: 5,
        color: 'white',
        fontSize: 18
    },
    textInput: {
        height: 50,
        flex: 1,
        padding: 10,
        color: 'black',
        textAlign: 'center'
    },
    textView: {
        width: '70%',
        backgroundColor: '#fff',
        color: 'black',
        textAlign: 'center',
        fontSize: 20
    }
});

export default ApplicationScreen;