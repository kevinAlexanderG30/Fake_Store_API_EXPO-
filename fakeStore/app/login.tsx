import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuthStore } from '@/app/stores/authStore';
import {Stack, useRouter } from 'expo-router';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const login = useAuthStore((state) => state.login);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        try {
            await login({ username, password });
            router.replace('/(tabs)');
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title={loading ? 'Cargando...' : 'Iniciar Sesión'} onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
});
