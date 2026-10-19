
"use client";

import { Settings } from "lucide-react";

import Toolbar from "../../../../components/Toolbar/Toolbar";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <Toolbar
                title="Settings"
                subtitle="Manage your administration preferences"
            />

            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <Settings
                        size={32}
                        className="text-gray-500"
                    />
                </div>

                <h2 className="text-xl font-semibold text-gray-900">
                    We're working on this
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                    The settings section is currently under
                    development. You'll be able to manage your
                    administration preferences here soon.
                </p>

                <span className="mt-6 rounded-full bg-yellow-100 px-4 py-1.5 text-xs font-medium text-yellow-800">
                    Coming soon
                </span>
            </div>
        </div>
    );
}
