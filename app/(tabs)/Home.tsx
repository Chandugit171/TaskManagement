import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const TaskList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const tasks = useSelector((state: { tasks: { id: string; title: string; description: string }[] }) => state.tasks);

    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {

            setRefreshing(false);
        }, 1500);
    };

    const renderItem = ({ item }: { item: { title: string; description: string } }) => (
        <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
        </View>
    );

    return (
        <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#4CAF50']}
                    tintColor="#4CAF50"
                />
            }
            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <Ionicons name="information-circle" size={40} color="#4CAF50" />
                    <Text style={styles.emptyText}>No tasks available.</Text>
                </View>
            }
        />
    );
};

export default function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>List of the Tasks</Text>
                <Ionicons name="home-sharp" color="green" size={24} />
            </View>
            <TaskList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 10 },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        alignItems: 'center'
    },
    title: { fontSize: 24, color: '#000' },
    taskItem: {
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10
    },
    taskTitle: { fontSize: 24, color: 'green' },
    taskDescription: { color: '#555' },
    emptyContainer: { alignItems: 'center', marginTop: 20 },
    emptyText: { marginTop: 10, textAlign: 'center' },
});
