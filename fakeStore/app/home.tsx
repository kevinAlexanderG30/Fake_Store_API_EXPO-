import React from 'react';
import { View, Text, Button } from 'react-native';
import {useAuthStore} from "@/app/stores/authStore";

export default function Home() {
    const logout = useAuthStore((state: any) => state.logout);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to the Home Screen!</Text>
            <Button title="Logout" onPress={logout} />
        </View>
    );
}
