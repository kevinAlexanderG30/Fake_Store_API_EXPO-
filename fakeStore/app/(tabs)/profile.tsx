import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axiosInstance from "@/app/utils/axiosInstance";
import { TouchableOpacity } from "react-native";

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get("/users/1");
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!user) {
        return (
            <View style={styles.centered}>
                <Text>No se pudo cargar el perfil del usuario.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.avatarContainer}>
                <Image
                    source={{
                        uri: `https://i.pravatar.cc/150?img=${user.id}`,
                    }}
                    style={styles.avatar}
                />
            </View>
            <Text style={styles.name}>
                {user.name.firstname} {user.name.lastname}
            </Text>
            <Text style={styles.username}>@{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.phone}>{user.phone}</Text>
            <View style={styles.addressContainer}>
                <Text style={styles.addressTitle}>Dirección:</Text>
                <Text style={styles.address}>
                    {user.address.street} #{user.address.number}, {user.address.city}, {user.address.zipcode}
                </Text>
                <Text style={styles.coordinates}>
                    (Lat: {user.address.geolocation.lat}, Long: {user.address.geolocation.long})
                </Text>
            </View>
        </ScrollView>
    );
}

// Configuración de estilos
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 20,
        height: '100%',
        backgroundColor: "#f9f9f9",
    },
    avatarContainer: {
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: "#ccc",
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    username: {
        fontSize: 16,
        color: "#888",
        marginBottom: 20,
    },
    email: {
        fontSize: 16,
        color: "#555",
        marginBottom: 10,
    },
    phone: {
        fontSize: 16,
        color: "#555",
        marginBottom: 20,
    },
    addressContainer: {
        alignItems: "center",
        marginTop: 20,
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    addressTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#333",
    },
    address: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginBottom: 10,
    },
    coordinates: {
        fontSize: 14,
        color: "#888",
        textAlign: "center",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
    },
});

