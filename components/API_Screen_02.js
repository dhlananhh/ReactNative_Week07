import React, { useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';

const UserGreeting = ({ name }) => {
    return (
        <View style={greetingStyles.container}>
            <Image
                source={require('../assets/profile.png')}
                style={greetingStyles.profileImage}
            />
            <View>
                <Text style={greetingStyles.greetingText}>Hello {name}</Text>
                <Text style={greetingStyles.subText}>Have a great day ahead</Text>
            </View>
        </View>
    );
};

const SearchBar = () => {
    return (
        <View style={searchStyles.container}>
            <FontAwesome name="search" size={24} color="gray" style={searchStyles.icon} />
            <TextInput
                placeholder="Search"
                style={searchStyles.input}
            />
        </View>
    );
};

const TodoItem = ({ item, onEdit, onDelete }) => {
    return (
        <View style={todoStyles.container}>
            <Image source={require('../assets/check.png')} style={todoStyles.checkIcon} />
            <Text style={todoStyles.text}>{item.name}</Text>
            <TouchableOpacity onPress={() => onDelete(item.id)} style={todoStyles.deleteButton}>
                <FontAwesome name="trash" size={24} color="red" style={todoStyles.buttonIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onEdit(item)} style={todoStyles.editButton}>
                <Image source={require('../assets/edit.png')} style={todoStyles.buttonIcon} />
            </TouchableOpacity>
        </View>
    );
};

const AddButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={addButtonStyles.button}
            onPress={() => navigation.navigate('API_Screen_03')}
        >
            <Text style={addButtonStyles.text}>+</Text>
        </TouchableOpacity>
    );
};

const App = () => {
    const route = useRoute();
    const { name } = route.params;
    const [data, setData] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [newTitle, setNewTitle] = useState('');

    const url = 'https://673069af66e42ceaf1603897.mockapi.io/api/tasks';

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setData(data));
    }, []);

    const fnDelete = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                Alert.alert('Success', 'Task deleted successfully');
                setData(prev => prev.filter(task => task.id !== id));
            } else {
                Alert.alert('Error', 'Failed to delete task. Please try again.');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while deleting the task.');
        }
    };

    const fnUpdate = async (task) => {
        try {
            const response = await fetch(`${url}/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newTitle }),
            });

            if (response.ok) {
                const updatedTask = await response.json();
                setData(prevTasks =>
                    prevTasks.map(t => (t.id === updatedTask.id ? updatedTask : t))
                );
                setEditingTask(null);
                setNewTitle('');
            } else {
                console.error('Update failed');
            }
        } catch (error) {
            console.error('Error during update', error);
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setNewTitle(task.name);
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
        setNewTitle('');
    };

    return (
        <View style={styles.appContainer}>
            <UserGreeting name={name} />
            <SearchBar />
            <SafeAreaView style={styles.todoContainer}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <TodoItem
                            item={item}
                            onEdit={() => handleEdit(item)}
                            onDelete={fnDelete}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
            <AddButton />
        </View>
    );
};

const greetingStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    greetingText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#171a1f'
    },
    subText: {
        fontSize: 14,
        color: '#171a1f',
        opacity: 0.75
    }
});

const searchStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#9095a0',
        borderRadius: 4,
        padding: 8,
        width: 334,
        height: 44,
        marginBottom: 20
    },
    icon: {
        marginRight: 9
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#171a1f'
    }
});

const todoStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 335,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#DEE1E6',
        padding: 12,
        marginBottom: 10
    },
    checkIcon: {
        width: 24,
        height: 24,
        marginLeft: 22
    },
    text: {
        marginLeft: 37,
        fontWeight: '700',
        fontSize: 16,
        color: '#171a1f'
    },
    deleteButton: {
        marginLeft: 'auto',
        marginRight: 12
    },
    editButton: {
        marginRight: 12
    },
    buttonIcon: {
        width: 24,
        height: 24
    }
});

const addButtonStyles = StyleSheet.create({
    button: {
        width: 69,
        height: 69,
        borderRadius: 34.5,
        backgroundColor: '#00BCD4',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    text: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold'
    }
});

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f0f2f5'
    },
    todoContainer: {
        flex: 1,
        width: '100%'
    }
});

export default App;
