"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../hooks/useAuth";
import { USER_ROLES } from "../types/user-roles";

interface Props {
    children: React.ReactNode;
}

export default function AuthGuard({
    children,
}: Props) {

    const router = useRouter();

    const {
        user,
        loading,
        isAuthenticated,
    } = useAuth();

    useEffect(() => {

        if (loading) {
            return;
        }

        if (!isAuthenticated) {

            router.replace("/admin/login");

            return;
        }

        if (user?.role !== USER_ROLES.ADMIN) {
            router.replace("/admin/login");
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

    if (!isAuthenticated) {
        return null;
    }

    if (user?.role !== "admin") {
        return null;
    }

    return children;

}