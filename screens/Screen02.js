import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet
} from "react-native";
import { Ionicons } from '@expo/vector-icons';


export default function Screen02 ({ route, navigation }) {
    const { name } = route.params;
    const [ tasks, setTasks ] = useState([]);
    const [ searchQuery, setSearchQuery ] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(data => setTasks(data.slice(0, 20)))  // Limiting to first 20 tasks for simplicity
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Hi {name}</Text>
            <TextInput 
                style={styles.searchInput}
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList 
                data={filteredTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({  item }) => (
                    <View style={styles.taskItem}>
                        <Text>{item.title}</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Screen03', { task: item, mode: 'edit' })}
                        >
                            <Ionicons name="pencil" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('Screen03', { mode: 'add' })}
            >
                <Text style={styles.addButtonTexts}>+</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({

});