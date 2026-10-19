"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {

    const router = useRouter();

    const { login } = useAuth();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            setLoading(true);

            await login(
                email,
                password
            );

            router.replace(
                "/admin/dashboard"
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="flex min-h-screen items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg space-y-6"
            >

                <h1 className="text-2xl font-bold text-center">
                    VECI Admin
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className="w-full rounded-lg border p-3"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    className="w-full rounded-lg border p-3"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-black py-3 text-white disabled:opacity-50"
                >

                    {loading
                        ? "Signing in..."
                        : "Sign in"}

                </button>

            </form>

        </div>

    );

}