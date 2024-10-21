// screens/Screen03.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function API_Screen_03 ({ route, navigation }) {
    const { mode, task } = route.params;
    const [jobTitle, setJobTitle] = useState(mode === 'edit' ? task.title : '');

    const handleFinish = () => {
        if (mode === 'add') {
            const newTask = { title: jobTitle, completed: false };
            navigation.navigate('API_Screen_02', { newTask });
        } else {
            const editedTask = { ...task, title: jobTitle };
            navigation.navigate('API_Screen_02', { editedTask });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{mode === 'add' ? 'ADD YOUR JOB' : 'EDIT YOUR JOB'}</Text>
            <TextInput
                style={styles.input}
                placeholder="input your job"
                value={jobTitle}
                onChangeText={setJobTitle}
            />
            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.buttonText}>FINISH →</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
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
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
