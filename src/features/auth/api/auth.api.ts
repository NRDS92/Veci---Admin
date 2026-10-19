import api from "../../../lib/api";

import {
    LoginRequest,
    LoginResponse,
    MeResponse,
} from "../types/auth.types";

export const loginRequest = async (
    credentials: LoginRequest
): Promise<LoginResponse> => {

    const { data } = await api.post<LoginResponse>(
        "/auth/login",
        credentials
    );

    return data;

};

export const getCurrentUserRequest = async (): Promise<MeResponse> => {

    const { data } = await api.get<MeResponse>(
        "/auth/me"
    );

    return data;

};