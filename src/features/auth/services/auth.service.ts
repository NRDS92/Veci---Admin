import {
    getCurrentUserRequest,
    loginRequest,
} from "../api/auth.api";

import { tokenStorage } from "../storage/token.storage";

import {
    AuthUser,
    LoginRequest,
} from "../types/auth.types";

class AuthService {

    async login(
        credentials: LoginRequest
    ): Promise<AuthUser> {

        const response =
            await loginRequest(credentials);
            
            console.log("🔑 LOGIN RESPONSE:", response);
        tokenStorage.setToken(
            response.data.token
        );

        return this.getCurrentUser();

    }

    async getCurrentUser(): Promise<AuthUser> {

        const response =
            await getCurrentUserRequest();

        return response.data;

    }

    logout(): void {

        tokenStorage.removeToken();

    }

    hasSession(): boolean {

        return tokenStorage.hasToken();

    }

    getToken(): string | null {

        return tokenStorage.getToken();

    }

}

export const authService =
    new AuthService();