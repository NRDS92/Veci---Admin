import { ReactNode } from "react";

import { Toaster } from "sonner";

import AdminLayout from "../../../components/AdminLayout/AdminLayout";

import { AuthProvider } from "../../../features/auth/context/AuthProvider";
import AuthGuard from "../../../features/auth/guards/AuthGuard";

interface Props {
    children: ReactNode;
}

export default function ProtectedLayout({
    children,
}: Props) {

    return (

        <AuthProvider>

            <AuthGuard>

                <Toaster
                    position="top-right"
                    richColors
                    closeButton
                />

                <AdminLayout>

                    {children}

                </AdminLayout>

            </AuthGuard>

        </AuthProvider>

    );

}