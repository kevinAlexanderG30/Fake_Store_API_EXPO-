import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import {Stack, useLocalSearchParams} from 'expo-router';
import axiosInstance from '@/app/utils/axiosInstance';

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

export default function ProductDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axiosInstance.get<Product>(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product detail:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductDetail();
        }
    }, [id]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.centered}>
                <Text>No se pudo cargar el detalle del producto.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: true, title: "Detalles del Producto" }} />
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.category}>Categoría: {product.category}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        marginBottom: 16,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    price: {
        fontSize: 20,
        color: '#888',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 16,
    },
    category: {
        fontSize: 14,
        color: '#666',
    },
});
