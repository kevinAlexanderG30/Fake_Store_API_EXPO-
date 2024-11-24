import {Tabs, useRouter} from 'expo-router';
import React, {useEffect} from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {useAuthStore} from "@/app/stores/authStore";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";

export default function TabLayout() {
    const colorScheme = useColorScheme();


    const { token, checkAuth } = useAuthStore();
    const router = useRouter();


    useEffect(() => {
        const verifyAuth = async () => {
            await checkAuth();
            if (!token) {
                router.replace('/login');
            }
        };
        verifyAuth();
    }, [token]);

    if (!token) {
        return null;
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: true,
                    title: "Perfil",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="user" size={28} color={color} />                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => router.push("/settings")}
                            style={{ marginRight: 16 }}
                        >
                            <MaterialIcons name="menu" size={28} color="black" />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Tabs>
    );
}
