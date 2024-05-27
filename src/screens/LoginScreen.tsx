import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Config from "react-native-config";

async function tryLogin(navigation: any, login: string, password: string)
{
    console.log(login, password);
    console.log(Config.API + '/user/login');
    if(login != '' && password != '')
    {
        await AsyncStorage.setItem('market.credentials.login', login);
        await AsyncStorage.setItem('market.credentials.password', password);
        const result = await fetch(Config.API + '/user/login',
        {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ login: login, password: password })
        });
        console.log(await result.json());
        if(result.ok === true) navigation.navigate('MainScreen', {login: login, password: password, jwt: (await result.json()).key});
        //else navigation.navigate('LoginScreen');
    }
}

function LoginScreen({navigation}: {navigation: any}) : React.JSX.Element
{
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    return(
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                style={styles.textInput}
                placeholder='Логин'
                placeholderTextColor='gray'
                onChangeText={(login: string) => setLogin(login)}
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
            <TouchableOpacity style={styles.buttonView} onPress={() => {tryLogin(navigation, login, password)}}>
                <Text style={styles.buttonText}>Вход</Text>
            </TouchableOpacity>
            <View style={styles.buttonView}>
                <Text style={styles.buttonText}>Регистрация</Text>
            </View>
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
    }
});

export default LoginScreen;