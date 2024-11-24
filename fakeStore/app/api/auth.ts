import axiosInstance from '../utils/axiosInstance';
import {LoginCredentials, LoginResponse} from "@/app/types/auth";


export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
        console.log("==> credentials", credentials);
        const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error en la autenticación');
    }
};
