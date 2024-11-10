import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

export default function API_Screen_03({ navigation }) {
    const [jobTitle, setJobTitle] = useState('');
    const url = 'https://673069af66e42ceaf1603897.mockapi.io/api/tasks';

    const handleAddTask = () => {
        const task = { name: jobTitle };
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            Alert.alert('Success', 'Task added successfully');
            navigation.navigate('API_Screen_02', { newTask: data });
        })
        .catch(error => {
            console.error('Error adding task:', error);
            Alert.alert('Error', 'Failed to add task. Please try again.');
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.avatar}
                    source={require('../assets/profile.png')}
                />
                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingText}>Hi Twinkle</Text>
                    <Text style={styles.subtitleText}>Have a great day ahead</Text>
                </View>
            </View>
            <Text style={styles.title}>ADD YOUR JOB</Text>
            <View style={styles.inputContainer}>
                <Image
                    style={styles.inputIcon}
                    source={require('../assets/input.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder="input your job"
                    value={jobTitle}
                    onChangeText={setJobTitle}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleAddTask}>
                <Text style={styles.buttonText}>FINISH →</Text>
            </TouchableOpacity>
            <Image
                style={styles.noteImage}
                source={require('../assets/notepad.png')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 40,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    greetingContainer: {
        flexDirection: 'column',
    },
    greetingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#171a1f',
        lineHeight: 30,
    },
    subtitleText: {
        fontSize: 14,
        color: '#171a1f',
        opacity: 0.75,
        lineHeight: 22,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#171a1f',
        lineHeight: 48,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#9095a0',
        borderRadius: 4,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%',
        height: 44,
    },
    inputIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 44,
        fontSize: 14,
        color: '#171a1f',
    },
    button: {
        backgroundColor: '#00bdd6',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        lineHeight: 26,
        fontWeight: 'bold',
    },
    noteImage: {
        width: 190,
        height: 170,
    },
});
