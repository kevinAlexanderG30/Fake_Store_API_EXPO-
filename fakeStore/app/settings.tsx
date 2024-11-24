import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import {useAuthStore} from "@/app/stores/authStore";

export default function SettingsScreen() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const router = useRouter();
    const { logout } = useAuthStore();

    useEffect(() => {
        const loadTheme = async () => {
            const storedTheme = await AsyncStorage.getItem('@theme');
            setIsDarkMode(storedTheme === 'dark');
        };
        loadTheme();
    }, []);


    const toggleTheme = async () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode);

        await AsyncStorage.setItem('@theme', newTheme);

    };

    const handleLogout = async () => {
        Alert.alert('Cerrar Sesión', '¿Estás seguro de que deseas cerrar sesión?', [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Cerrar Sesión',
                style: 'destructive',
                onPress: async () => {
                    logout();
                    router.replace('/login');
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            {/*<View style={styles.settingItem}>*/}
            {/*    <Text style={styles.settingLabel}>Modo Oscuro</Text>*/}
            {/*    <Switch value={isDarkMode} onValueChange={toggleTheme} />*/}
            {/*</View>*/}
            <View style={styles.logoutButton}>
                <Button title="Cerrar Sesión" color="#d9534f" onPress={handleLogout} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    logoutButton: {
        marginTop: 24,
    },
});
