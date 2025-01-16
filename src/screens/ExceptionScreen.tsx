import { StyleSheet, Text, View } from "react-native";

function ExceptionScreen({ navigation }: { navigation: any }): React.JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={styles.textView}>Нет соединения, проверьте работу сети или подождите некоторое время.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    textView: {
        width: '70%',
        backgroundColor: '#fff',
        color: 'black',
        textAlign: 'center',
        fontSize: 20
    }
});

export default ExceptionScreen;