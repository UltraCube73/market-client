import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NavParamList } from '../types/NavProps';
import Config from 'react-native-config';
import { InstalledApps } from 'react-native-launcher-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<NavParamList, 'EmailVerificationScreen'>;

async function tryConfirm(navigation: any, login: string, code: string, password: string, setStatus: React.Dispatch<React.SetStateAction<string>>) {
    setStatus('');
    if (code.length == 6) {
        try {
            const response = await fetch(Config.API + '/user/confirm',
                {
                    method: 'POST',
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify({ login: login, code: code })
                });
            const result = (await response.json());
            if (response.ok === true) {
                await AsyncStorage.setItem('market.credentials.login', login);
                await AsyncStorage.setItem('market.credentials.password', password);
                navigation.replace('MainScreen', { login: login, jwtKey: result.access_token});
            }
            else if (response.status == 403) { setStatus('Неверный код!'); }
        }
        catch {
            navigation.navigate('ExceptionScreen')
        }
    }
    else setStatus('Длина кода - 6 символов');
}

function EmailVerificationScreen({ route, navigation }: Props): React.JSX.Element {
    const [vcode, setVcode] = useState('');
    const [status, setStatus] = useState('');
    const { login, password } = route.params;
    useEffect(() => { setStatus('Код подтверждения должен прийти на почту') }, [])
    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Код подтверждения'
                    placeholderTextColor='gray'
                    maxLength={6}
                    inputMode='numeric'
                    onChangeText={(vcode: string) => setVcode(vcode)}
                />
            </View>
            <TouchableOpacity style={styles.buttonView} onPress={() => { tryConfirm(navigation, login, vcode, password, setStatus) }}>
                <Text style={styles.buttonText}>Проверить</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonView} onPress={() => { navigation.replace('RegistrationScreen') }}>
                <Text style={styles.buttonText}>Назад</Text>
            </TouchableOpacity>
            <Text style={styles.textView}>{status}</Text>
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