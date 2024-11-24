import '@testing-library/jest-native/extend-expect';
import { NativeModules } from 'react-native';

// Mock para AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
}));

// Mock para Appearance (useColorScheme)
NativeModules.RNC_Appearance = {
    initialPreferences: {
        colorScheme: 'light',
    },
};
