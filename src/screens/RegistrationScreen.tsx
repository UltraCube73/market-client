import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Config from "react-native-config";

async function tryRegister(navigation: any, login: string, password: string, setStatus: React.Dispatch<React.SetStateAction<string>>)
{
    if(login != '' && password != '')
    {
        setStatus('');
        try
        {
            const response = await fetch(Config.API + '/user/register',
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ login: login, password: password })
            });
            if(response.ok === true) {navigation.replace('LoginScreen', {loginText: login});}
        }
        catch
        {
            navigation.navigate('ExceptionScreen')
        }
    }
}

function RegistrationScreen ({navigation}: {navigation: any}) : React.JSX.Element
{
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
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
            <TouchableOpacity style={styles.buttonView} onPress={() => {tryRegister(navigation, login, password, setStatus)}}>
                <Text style={styles.buttonText}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonView} onPress={() => {navigation.replace('LoginScreen', {loginText: ''})}}>
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

export default RegistrationScreen;