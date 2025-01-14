import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NavParamList } from '../types/NavProps';
import Config from 'react-native-config';
import { InstalledApps } from 'react-native-launcher-kit';

type Props = NativeStackScreenProps<NavParamList, 'EmailVerificationScreen'>;

function EmailVerificationScreen({ route, navigation }: Props) : React.JSX.Element
{
    const [ vcode, setVcode ] = useState('');
    const { login, jwtKey } = route.params;
    return(
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                style={styles.textInput}
                placeholder='Код подтверждения'
                placeholderTextColor='gray'
                onChangeText={(vcode: string) => setVcode(vcode)}
                />
            </View>
            <TouchableOpacity style={styles.buttonView} onPress={() => {}}></TouchableOpacity>
        </View>
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
        textAlign: 'center',
    },
    textView: {
        width: '70%',
        backgroundColor: '#fff',
        color: 'black',
        textAlign: 'center',
        fontSize: 20
    }
});

export default EmailVerificationScreen;