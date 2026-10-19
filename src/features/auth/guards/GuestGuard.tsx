"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../hooks/useAuth";

interface Props {
    children: React.ReactNode;
}

export default function GuestGuard({
    children,
}: Props) {

    const router = useRouter();

    const {
        loading,
        isAuthenticated,
        user,
    } = useAuth();

    useEffect(() => {

        if (loading) {
            return;
        }

        if (
            isAuthenticated &&
            user?.role === "admin"
        ) {
            router.replace("/admin/dashboard");
        }

    }, [
        loading,
        isAuthenticated,
        user,
        router,
    ]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    if (
        isAuthenticated &&
        user?.role === "admin"
    ) {
        return null;
    }

    return children;
}