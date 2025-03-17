import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import axios from 'axios';

export default function AuthScreen() {
    const [isSignUp, setIsSignUp] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const toggleAuthMode = () => setIsSignUp(!isSignUp);

    const handleAuth = async () => {
        if (isSignUp && password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            const endpoint = isSignUp 
                ? 'https://authmodule-ifyk.onrender.com/api/register'
                : 'https://authmodule-ifyk.onrender.com/api/login';

            const payload = isSignUp 
                ? { name, email, password } 
                : { email, password };
            const response = await axios.post(endpoint, payload);
            const { token } = response.data;
            await AsyncStorage.setItem('userToken', token);
            Alert.alert('Success', isSignUp ? 'Account created successfully!' : 'Logged in successfully!');
            router.replace('/(tabs)/Home');
        } catch (error) {
            console.log("error",error);
            
            Alert.alert('Error', error.response?.data?.message || 'Something went wrong!');
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Login'}</Text>

            {isSignUp && (
                <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="#888" style={styles.icon} />
                    <TextInput
                        placeholder="Name"
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                </View>
            )}

            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#888" style={styles.icon} />
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            {isSignUp && (
                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
                    <TextInput
                        placeholder="Confirm Password"
                        style={styles.input}
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>
            )}

            <TouchableOpacity style={styles.button} onPress={handleAuth}>
                <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleAuthMode}>
                <Text style={styles.switchText}>
                    {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, color: '#6200EE' },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 15, marginVertical: 8, width: '100%', elevation: 2 },
    icon: { marginRight: 10 },
    input: { flex: 1, height: 50 },
    button: { backgroundColor: '#6200EE', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 25, width: '100%', alignItems: 'center', marginTop: 20 },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
    switchText: { color: '#6200EE', marginTop: 15, fontWeight: '600' },
});
