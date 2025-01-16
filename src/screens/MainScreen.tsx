import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NavParamList } from '../types/NavProps';
import Config from 'react-native-config';

type Props = NativeStackScreenProps<NavParamList, 'MainScreen'>;

async function getPopular(setValue: React.Dispatch<React.SetStateAction<any>>, jwtKey: string) {
    const response = await fetch(Config.API + '/app/top?amount=10',
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwtKey },
        });
    const result = (await response.json());
    console.log(result);
    setValue(result);
}

async function searchApps(setValue: React.Dispatch<React.SetStateAction<any>>, jwtKey: string, query: string) {
    const response = await fetch(Config.API + `/app/search?query=${query}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwtKey },
        });
    const result = (await response.json());
    console.log(result);
    setValue(result);
}

function MainScreen({ route, navigation }: Props): React.JSX.Element {
    const { login, jwtKey } = route.params;
    const [apps, setApps] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    useEffect(() => { getPopular(setApps, jwtKey); }, []);
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Имя приложения'
                        placeholderTextColor='gray'
                        onChangeText={(search: string) => setSearch(search)}
                    />
                </View>
                <TouchableOpacity style={styles.buttonView} onPress={() => { searchApps(setApps, jwtKey, search) }}>
                    <Text style={styles.buttonText}>Поиск</Text>
                </TouchableOpacity>
            </View>

            <FlatList style={styles.container} data={apps} renderItem={({ item }) => {
                return (
                    <View style={styles.itemContainer}>
                        <Image style={styles.image} height={70} width={70} source={{ uri: Config.WEB_CONTENT + '/apps/' + item.packageName + '/icon.png' }} />
                        <View>
                            <Text style={styles.textView} onPress={() => { navigation.navigate('ApplicationScreen', { login: login, jwtKey: jwtKey, application: item }) }}>{item.name}</Text>
                            <Text style={styles.secondaryTextView}>{item.category.name}</Text>
                        </View>
                    </View>)
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginBottom: 30
    },
    itemContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        flex: 1,
        margin: 5,
        alignItems: 'center'
    },
    image: {
        borderRadius: 10
    },
    textView: {
        backgroundColor: '#fff',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        fontSize: 20,
        marginLeft: 20
    },
    secondaryTextView: {
        backgroundColor: '#fff',
        color: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        fontSize: 15,
        marginLeft: 20
    },
    searchBar: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textInput: {
        height: 50,
        flex: 1,
        padding: 10,
        color: 'black',
        textAlign: 'center'
    },
    inputView: {
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 30,
        height: 45,
        margin: 5,
        alignItems: 'center',
        flex: 1
    },
    buttonView: {
        backgroundColor: '#4275f5',
        borderRadius: 30,
        width: '30%',
        height: 45,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        height: 50,
        flex: 1,
        padding: 10,
        color: 'white',
        fontSize: 18
    }
});

export default MainScreen;