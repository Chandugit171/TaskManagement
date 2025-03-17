import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setTask } from '@/redux/tasksSlice';

const API_URL = 'https://authmodule-ifyk.onrender.com/tasks';

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

export default function CreateTask() {
    const dispatch =useDispatch()
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);

    useEffect(() => {
        fetchAllTasks();
    }, []);

    const fetchAllTasks = async () => {
        const storedToken = await AsyncStorage.getItem('userToken');

        if (!storedToken) return;

        try {
            const response = await axios.get(`${API_URL}/get_all_tasks`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error.response ? error.response.data : error.message);
            Alert.alert('Error', 'Failed to fetch tasks.');
        }
    };

    const fetchTaskById = async (id) => {
        const storedToken = await AsyncStorage.getItem('userToken');

        if(!id) return;
        if(!storedToken) return;
        try {
            const response = await axios.get(`${API_URL}/${id}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching task by ID:', error.response ? error.response.data : error.message);
            Alert.alert('Error', 'Failed to fetch task.');
        }
    };

    const handleAddTask = async () => {
        const storedToken = await AsyncStorage.getItem('userToken');

        if (!title || !description) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        const payload = { title, description, completed: false };
if(!storedToken) return;
        try {
            const response = await axios.post(`${API_URL}/add_task`, payload, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setTasks([...tasks, response.data]);
            dispatch(setTask(response?.data))
            Alert.alert("Task Added Successfully..")
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding task:', error.response ? error.response.data : error.message);
            Alert.alert('Error', 'Failed to add task.');
        }
    };

    const handleUpdateTask = async (id, updatedTask) => {
        const storedToken = await AsyncStorage.getItem('userToken');

        if(!id) return;
        if(!storedToken) return;
        try {
            await axios.put(`${API_URL}/${id}`, updatedTask, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setTasks(tasks.map(task => task?._id === id ? updatedTask : task));
            setTitle('');
            setDescription('');
            setEditingTaskId(null);
        } catch (error) {
            console.error('Error updating task:', error.response ? error.response.data : error.message);
            Alert.alert('Error', 'Failed to update task.');
        }
    };

    const handleDeleteTask = async (id) => {
        const storedToken = await AsyncStorage.getItem('userToken');

        if(!id) return;
        if(!storedToken) return;
        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setTasks(tasks.filter(task => task?._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error.response ? error.response.data : error.message);
            Alert.alert('Error', 'Failed to delete task.');
        }
    };

    const handleEditTask = async (task) => {
        if(!task?._id) return;
        const fetchedTask = await fetchTaskById(task?._id);
        setTitle(fetchedTask?.title);
        setDescription(fetchedTask?.description);
        setEditingTaskId(task?._id);
    };

    const handleSaveTask = () => {
        if (editingTaskId) {
            const updatedTask = { title, description, completed: false };
            handleUpdateTask(editingTaskId, updatedTask);
        } else {
            handleAddTask();
        }
    };

    const renderItem = ({ item }) => (
        <Animated.View entering={FadeInDown.duration(600)} style={styles.taskCard}>
            <View style={styles.taskDetails}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskDescription}>{item.description}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleEditTask(item)}>
                    <Ionicons name="create-outline" size={24} color="#4CAF50" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTask(item._id)}>
                    <Ionicons name="trash-outline" size={24} color="#F44336" />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );

    // useEffect(() => {
    //     // console.log('Tasks:', tasks);
    // }, [tasks]);

    return (
        <View style={styles.container}>
            <Animated.View entering={FadeInUp.duration(700)} style={styles.inputContainer}>
                <TextInput
                    placeholder="Task Title"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Task Description"
                    value={description}
                    onChangeText={setDescription}
                    style={[styles.input, styles.descriptionInput]}
                    multiline
                />
                <TouchableOpacity style={styles.button} onPress={handleSaveTask}>
                    <Text style={styles.buttonText}>
                        {editingTaskId ? 'Update Task' : 'Add Task'}
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item._id || `fallback-${item.title}`}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text style={styles.noTaskText}>No tasks available. Add some!</Text>
                }
            />
        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        padding: 20,
    },
    inputContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 5,
    },
    input: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 50,
        marginBottom: 10,
    },
    descriptionInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#6200EE',
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    taskCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    taskDetails: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    taskDescription: {
        color: '#666',
        marginTop: 2,
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
    },
    noTaskText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 20,
    },
    checkboxContainer:{
        backgroundColor:"red"
    }
});