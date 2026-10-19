import { ReactNode } from "react";

import { AuthProvider } from "../../../features/auth/context/AuthProvider";
import GuestGuard from "../../../features/auth/guards/GuestGuard";

interface Props {
    children: ReactNode;
}

export default function LoginLayout({
    children,
}: Props) {
    return (
        <AuthProvider>
            <GuestGuard>
                {children}
            </GuestGuard>
        </AuthProvider>
    );
}