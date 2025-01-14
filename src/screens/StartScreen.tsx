import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import * as EmailValidator from 'email-validator';

async function tryLogin(navigation: any)
{
    const login = await AsyncStorage.getItem('market.credentials.login');
    const password = await AsyncStorage.getItem('market.credentials.password');
    if(login != null && password != null && EmailValidator.validate(login))
    {
        try
        {
            const response = await fetch(Config.API + '/user/login',
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ login: login, password: password })
            });
            const result = (await response.json());
            if(response.ok === true) navigation.navigate('MainScreen', {login: login, jwtKey: result.access_token});
            else navigation.replace('LoginScreen', {loginText: ''});
        }
        catch
        {
            navigation.replace('LoginScreen', {loginText: ''});
        }
        
    }
    else
    {
        navigation.replace('LoginScreen', {loginText: ''});
    }
}

function StartScreen({navigation}: {navigation: any}) : React.JSX.Element
{
    useEffect(() => {tryLogin(navigation)}, []);
    return (
        <View style={styles.container}>
            <Image source={require('../img/icon.png')}/>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default StartScreen;