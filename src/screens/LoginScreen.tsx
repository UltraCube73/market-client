import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Config from "react-native-config";
import { NavParamList } from "../types/NavProps";

type Props = NativeStackScreenProps<NavParamList, 'LoginScreen'>;

async function tryLogin(navigation: any, login: string, password: string, setStatus: React.Dispatch<React.SetStateAction<string>>)
{
    if(login != '' && password != '')
    {
        setStatus('');
        try
        {
            await AsyncStorage.setItem('market.credentials.login', login);
            await AsyncStorage.setItem('market.credentials.password', password);
            const response = await fetch(Config.API + '/user/login',
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ login: login, password: password })
            });
            const result = (await response.json());
            if(response.ok === true) {navigation.replace('MainScreen', {login: login, password: password, jwtKey: result.access_token});}
            else if(response.status == 403) {setStatus('Неверные данные!');}
            else {navigation.navigate('ExceptionScreen');}
        }
        catch
        {
            navigation.navigate('ExceptionScreen')
        }
    }
    else setStatus('Введите почту и пароль!')
}

function LoginScreen({ route, navigation }: Props) : React.JSX.Element
{
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const {loginText} = route.params;
    useEffect(() => {setLogin(loginText)}, []);
    return(
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                style={styles.textInput}
                placeholder='E-mail'
                placeholderTextColor='gray'
                onChangeText={(login: string) => setLogin(login)}
                value={login}
                /> 
            </View>
            <View style={styles.inputView}>
                <TextInput
                style={styles.textInput}
                placeholder='Пароль'
                placeholderTextColor='gray'
                secureTextEntry={true}
                onChangeText={(password: string) => setPassword(password)}
                /> 
            </View>
            <TouchableOpacity style={styles.buttonView} onPress={() => {tryLogin(navigation, login, password, setStatus)}}>
                <Text style={styles.buttonText}>Вход</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonView} onPress={() => {navigation.replace('RegistrationScreen')}}>
                <Text style={styles.buttonText}>Регистрация</Text>
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

export default LoginScreen;