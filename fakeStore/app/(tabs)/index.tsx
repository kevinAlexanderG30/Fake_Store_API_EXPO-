import React, { useState, useEffect } from 'react';
import {
    FlatList,
    StyleSheet,
    Image,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useAuthStore } from "@/app/stores/authStore";
import { useRouter } from 'expo-router';
import axiosInstance from "@/app/utils/axiosInstance";

export default function HomeScreen() {
    const { token, checkAuth } = useAuthStore();
    const [sortOrder, setSortOrder] = useState("desc");
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Función para obtener productos
    const fetchProducts = async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);

        try {
            const response = await axiosInstance.get(`/products?sort=${sortOrder}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const allProducts = response.data;
            const startIndex = (page - 1) * 15;
            const endIndex = page * 15;
            const newProducts = allProducts.slice(startIndex, endIndex);

            setProducts((prev) => [...prev, ...newProducts]);
            setFilteredProducts((prev) => [...prev, ...newProducts]);

            setHasMore(newProducts.length > 0);
            setPage((prev) => prev + 1);
        } catch (error) {
            if (error.response?.status === 401) {
                // Error 401: Token inválido o no autorizado
                Alert.alert(
                    "Sesión Expirada",
                    "Por favor, inicia sesión nuevamente.",
                    [{ text: "Aceptar", onPress: () => router.replace("/login") }]
                );
            } else {
                // Otros errores
                Alert.alert(
                    "Error",
                    "No se pudieron cargar los productos. Por favor, intenta nuevamente."
                );
            }
        } finally {
            setIsLoading(false);
        }
    };
    // Filtrar productos localmente
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    // Cargar productos al inicio
    useEffect(() => {
        checkAuth();
        fetchProducts();
    }, []);

    // Renderizar cada producto
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productContainer}
            onPress={() => router.push(`/products/${item.id}`)}
        >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.screen}>
            {/* Barra de Búsqueda */}
            <TextInput
                style={styles.searchBar}
                placeholder="Buscar productos..."
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredProducts}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                numColumns={2}
                onEndReached={fetchProducts}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isLoading && <ActivityIndicator size="large" color="#000" />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 40,
        marginBottom: 16,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
    listContent: {
        paddingHorizontal: 8,
        paddingVertical: 16,
    },
    productContainer: {
        flex: 1,
        margin: 8,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        resizeMode: 'cover',
        marginBottom: 8,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
    },
});