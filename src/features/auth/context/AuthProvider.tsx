"use client";

import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import { authService } from "../services/auth.service";

import {
    AuthContextType,
    AuthUser,
} from "../types/auth.types";

export const AuthContext =
    createContext<AuthContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export function AuthProvider({
    children,
}: Props) {

    const [user, setUser] =
        useState<AuthUser | null>(null);

    const [loading, setLoading] =
        useState(true);

    const refreshSession =
        useCallback(async () => {

            try {

                if (!authService.hasSession()) {

                    setUser(null);

                    return;

                }

                const currentUser =
                    await authService.getCurrentUser();

                setUser(currentUser);

            } catch {

                authService.logout();

                setUser(null);

            } finally {

                setLoading(false);

            }

        }, []);

    useEffect(() => {

        let active = true;
        const refreshSessionId = window.setTimeout(() => {
            if (active) {
                void refreshSession();
            }
        }, 0);

        return () => {
            active = false;
            window.clearTimeout(refreshSessionId);
        };

    }, [refreshSession]);

    const login = useCallback(
        async (
            email: string,
            password: string
        ) => {

            const currentUser =
                await authService.login({
                    email,
                    password,
                });

            setUser(currentUser);

        },
        []
    );

    const logout = useCallback(() => {
        authService.logout();
        setUser(null);
    }, []);

    const value = useMemo<AuthContextType>(() => ({

        user,

        loading,

        isAuthenticated: !!user,

        login,

        logout,

        refreshSession,

    }), [
        user,
        loading,
        refreshSession,
    ]);

    return (

        <AuthContext.Provider
            value={value}
        >

            {children}

        </AuthContext.Provider>

    );

}
