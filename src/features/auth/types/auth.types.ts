export interface AuthUser {
    _id: string;

    name: string;

    email: string;

    role: string;

    provider: string;

    subscription: {
        plan: string;
    };

    cityId?: string | null;

    originCountry?: string | null;

    profileImage?: string | null;

    bio?: string | null;

    onboardingCompleted: boolean;

    isVerified: boolean;

    createdAt: string;

    updatedAt: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    data: {
        user: AuthUser;
        token: string;
    };
}

export interface MeResponse {
    success: boolean;
    data: AuthUser;
}

export interface AuthContextType {
    user: AuthUser | null;

    loading: boolean;

    isAuthenticated: boolean;

    login: (
        email: string,
        password: string
    ) => Promise<void>;

    logout: () => void;

    refreshSession: () => Promise<void>;
}