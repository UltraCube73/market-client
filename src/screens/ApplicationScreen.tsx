import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { InstalledApps } from 'react-native-launcher-kit';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParamList } from '../types/NavProps';
import Config from 'react-native-config';
import RNApkInstaller from "@dominicvonk/react-native-apk-installer";
import * as RNFS from "@dr.pogodin/react-native-fs";

type Props = NativeStackScreenProps<NavParamList, 'ApplicationScreen'>;

function check(packageName: string): boolean {
    let apps: string[] = [];
    InstalledApps.getApps().forEach(element => {
        apps.push(element.packageName);
    });
    return apps.includes(packageName)
}

async function install(packageName: string, setText: React.Dispatch<React.SetStateAction<string>>, setIsInstalled: React.Dispatch<React.SetStateAction<boolean>>) {
    const filePath = RNFS.DocumentDirectoryPath + "/app.apk";
    const download = RNFS.downloadFile({
        fromUrl: Config.WEB_CONTENT + '/apps/' + packageName + '/app.bin',
        toFile: filePath,
        progress: (res) => {
            console.log((res.bytesWritten / res.contentLength).toFixed(2));
            setText(`Установка... ${((res.bytesWritten / res.contentLength) * 100).toFixed(0)}%`);
        },
        progressDivider: 1,
    });

    const result = await download.promise;
    console.log(result.statusCode);
    console.log(Config.WEB_CONTENT + '/apps/' + packageName + '/app.apk');
    if (result.statusCode == 200) {
        RNApkInstaller.install(filePath);
    }

    setIsInstalled(true);
    setText("Установлено");
}

async function getCanRate(packageName: string, login: string, jwtKey: string, setCanRate: React.Dispatch<React.SetStateAction<boolean>>) {
    const response = await fetch(Config.API + `/app/canrate?application=${packageName}&login=${login}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwtKey },
        });
    const result = (await response.json());
    setCanRate(response.ok === true);
}

async function rate(packageName: string, login: string, jwtKey: string, rate: boolean, setCanRate: React.Dispatch<React.SetStateAction<boolean>>) {
    const response = await fetch(Config.API + '/app/rate',
        {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwtKey },
            body: JSON.stringify({ login: login, packageName: packageName, rate: rate })
        });
    const result = (await response.json());
    setCanRate(false);
}

function ApplicationScreen({ route, navigation }: Props): React.JSX.Element {
    const { login, jwtKey, application } = route.params;
    const [buttonText, setButtonText] = useState('');
    const [canRate, setCanRate] = useState<boolean>(false);
    const rateText = application.rate ? "положительная" : "отрицательная";
    const [isInstalled, setIsInstalled] = useState<boolean>(false);
    useEffect(() => { console.log(isInstalled); setIsInstalled(check(application.packageName)); setButtonText(isInstalled ? "Установлено" : "Установить"); getCanRate(application.packageName, login, jwtKey, setCanRate) }, []);
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image style={styles.image} height={70} width={70} source={{ uri: Config.WEB_CONTENT + '/apps/' + application.packageName + '/icon.png' }} />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTextView}>{application.name}</Text>
                    <Text style={styles.secondaryTextView}>{application.developer}</Text>
                </View>
            </View>
            <TouchableOpacity style={isInstalled ? styles.buttonViewGrey : styles.buttonView} onPress={() => { if (!isInstalled) install(application.packageName, setButtonText, setIsInstalled) }}>
                <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>

            <View style={{ borderBottomColor: 'black', borderBottomWidth: 2, marginVertical: 2 }} />

            <Text style={styles.textView}>{application.description}</Text>

            <View style={{ flex: 1 }}></View>

            <View><Text style={{ margin: 20 }}>{`Оценка пользователей: ${rateText}`}</Text></View>

            <View style={{ borderBottomColor: 'black', borderBottomWidth: 2, marginVertical: 2 }} />

            <View style={{ margin: 10, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', display: canRate ? 'flex' : 'none' }}>
                <TouchableOpacity style={{}} onPress={() => { rate(application.packageName, login, jwtKey, true, setCanRate) }}>
                    <Image style={{ resizeMode: 'stretch', height: 50, width: 50 }} source={require('../img/thumb.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={() => { rate(application.packageName, login, jwtKey, false, setCanRate) }}>
                    <Image style={{ resizeMode: 'stretch', height: 50, width: 50, transform: [{ rotate: '180deg' }] }} source={require('../img/thumb.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    image: {
        borderRadius: 10
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
    headerContainer: {
        margin: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    headerTextContainer: {
        flex: 1
    },
    buttonView: {
        backgroundColor: '#4275f5',
        borderRadius: 30,
        height: 35,
        margin: 5,
        alignItems: 'center'
    },
    buttonViewGrey: {
        backgroundColor: '#bcbcbc',
        borderRadius: 30,
        height: 35,
        margin: 5,
        alignItems: 'center'
    },
    buttonText: {
        height: 30,
        flex: 1,
        padding: 5,
        color: 'white',
        fontSize: 18
    },
    headerTextView: {
        backgroundColor: '#fff',
        color: 'black',
        fontSize: 30,
        marginLeft: 20
    },
    textView: {
        backgroundColor: '#fff',
        color: 'black',
        fontSize: 20,
        margin: 10
    }
});

export default ApplicationScreen;