import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { getDashboard } from "../services/dashboard.service";
import { DashboardAnalytics } from "../types/dashboard";

export const useDashboard = () => {

    const [dashboard, setDashboard] =
        useState<DashboardAnalytics | null>(null);

    const [loading, setLoading] =
        useState(true);

    const loadDashboard = useCallback(async () => {

        try {

            setLoading(true);

            const data =
                await getDashboard();

            setDashboard(data);

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to load dashboard."
            );

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {
        const initialLoadId = window.setTimeout(() => {
            void loadDashboard();
        }, 0);
        const intervalId = window.setInterval(() => {
            void loadDashboard();
        }, 150_000);
        return () => {
            window.clearTimeout(initialLoadId);
            window.clearInterval(intervalId);
        };
    }, [loadDashboard]);

    return {

        dashboard,

        loading,

        reload: loadDashboard,

    };

};
