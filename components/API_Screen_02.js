import React, { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import {
    ScrollView,
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Button
} from "react-native";

export default function API_Screen_02({ route, navigation }) {
    const { name } = route.params;
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [taskTitle, setTaskTitle] = useState('');

    const fetchTasks = () => {
        fetch('https://dummyjson.com/todos')
            .then(response => response.json())
            .then(data => setTasks(data.todos))
            .catch(error => console.error('Error fetching data:', error));
    };

    const addTask = (newTask) => {
        fetch('https://dummyjson.com/todos/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(response => response.json())
            .then(task => setTasks([...tasks, task]))
            .catch(error => console.error('Error adding new task:', error));
    };

    const editTask = (updatedTask) => {
        fetch(`https://dummyjson.com/todos/${updatedTask.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
            .then(response => response.json())
            .then(() => {
                const updatedTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
                setTasks(updatedTasks);
                setModalVisible(false);
            })
            .catch(error => console.error('Error editing task:', error));
    };

    const deleteTask = (taskId) => {
        fetch(`https://dummyjson.com/todos/${taskId}`, {
            method: 'DELETE'
        })
            .then(() => {
                const filteredTasks = tasks.filter(task => task.id !== taskId);
                setTasks(filteredTasks);
            })
            .catch(error => console.error('Error deleting task:', error));
    };

    useEffect(() => {
        fetchTasks();
        if (route.params?.newTask) {
            addTask(route.params.newTask);
            route.params.newTask = null;
        } else if (route.params?.editedTask) {
            editTask(route.params.editedTask);
            route.params.editedTask = null;
        } else if (route.params?.deletedTaskId) {
            deleteTask(route.params.deletedTaskId);
            route.params.deletedTaskId = null;
        }
    }, [route.params]);

    const handleEdit = (task) => {
        setCurrentTask(task);
        setTaskTitle(task.todo);
        setModalVisible(true);
    };

    const handleSubmit = () => {
        const updatedTask = { ...currentTask, todo: taskTitle };
        editTask(updatedTask);
    };

    const filteredTasks = tasks.filter(task =>
        String(task.todo).toLowerCase().includes(searchQuery.toLowerCase())
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
                keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}  // Ensure key is valid
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text>{item.todo}</Text>
                        <View style={styles.icons}>
                            <TouchableOpacity
                                onPress={() => handleEdit(item)}
                            >
                                <Ionicons name="pencil" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => deleteTask(item.id)}
                            >
                                <Ionicons name="trash" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('API_Screen_03', { mode: 'add' })}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.input}
                            placeholder="Edit task"
                            value={taskTitle}
                            onChangeText={setTaskTitle}
                        />
                        <View style={styles.modalButtons}>
                            <Button
                                title="Submit"
                                onPress={handleSubmit}
                            />
                            <Button
                                title="Cancel"
                                onPress={() => setModalVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 60,
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#00CED1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: '100%',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});
