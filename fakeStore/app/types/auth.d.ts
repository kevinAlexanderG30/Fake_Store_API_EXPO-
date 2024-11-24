interface LoginResponse {
    token: string;
}

interface LoginCredentials {
    username: string;
    password: string;
}

export type { LoginCredentials, LoginResponse}