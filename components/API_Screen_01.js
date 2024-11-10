import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet
} from "react-native";

export default function Screen01 ({ navigation }) {
    const [name, setName] = useState('');

    return (
        <View style={styles.container}>
            <Image source={require('../assets/notepad.png')} style={styles.image} />
            <Text style={styles.title}>MANAGE YOUR TASKS</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('API_Screen_02', { name })}
            >
                <Text style={styles.buttonText}>GET STARTED →</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#8A2BE2',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#00CED1',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
