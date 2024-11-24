import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginService } from '../api/auth';
import { LoginCredentials } from '@/app/types/auth';

interface AuthState {
    token: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    login: async (credentials) => {
        try {
            const { token } = await loginService(credentials);
            await AsyncStorage.setItem('token', token);
            set({ token });
        } catch (error) {
            console.error('Login error:', error.message);
            throw error;
        }
    },
    logout: async () => {
        await AsyncStorage.removeItem('token');
        set({ token: null });
    },
    checkAuth: async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) set({ token });
    },
}));
