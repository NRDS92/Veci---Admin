"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { OwnerCommunity } from "@ndrs92/contracts";
import { approveCommunity, blockCommunity, getCommunitiesForModeration, rejectCommunity, restoreCommunity, suspendCommunity } from "../../../../../features/admin/communities/communities.admin.service";

export default function CommunitiesModerationPage() {
    const [communities, setCommunities] = useState<OwnerCommunity[]>([]);
    const [reasons, setReasons] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [busyId, setBusyId] = useState("");

    useEffect(() => {
        getCommunitiesForModeration().then(setCommunities).catch((error: unknown) => {
            console.error(error);
            toast.error("Unable to load pending Communities.");
        }).finally(() => setLoading(false));
    }, []);

    const runAction = async (id: string, action: "approve" | "reject" | "suspend" | "block" | "restore") => {
        setBusyId(id);
        try {
            if (action === "approve") await approveCommunity(id);
            if (action === "reject") {
                const reason = reasons[id]?.trim() ?? "";
                if (reason.length < 3) { toast.error("Enter a rejection reason."); return; }
                await rejectCommunity(id, reason);
            }
            if (action === "suspend") await suspendCommunity(id);
            if (action === "block") await blockCommunity(id);
            if (action === "restore") await restoreCommunity(id);
            setCommunities(await getCommunitiesForModeration());
            toast.success(`Community ${action}d.`);
        } catch (error) {
            console.error(error);
            toast.error(`Unable to ${action} this Community.`);
        } finally {
            setBusyId("");
        }
    };

    if (loading) return <div className="p-8 text-sm text-gray-500">Loading Communities…</div>;
    return (
        <main className="space-y-6 p-8">
            <header><h1 className="text-2xl font-semibold text-gray-900">Community moderation</h1><p className="mt-1 text-sm text-gray-500">Review new Communities before public publication.</p></header>
            {communities.length === 0 ? <div className="rounded-xl border bg-white p-10 text-center text-gray-500">No Communities found.</div> : communities.map((community) => (
                <article key={community.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap justify-between gap-4">
                        <div><h2 className="text-xl font-semibold text-gray-900">{community.name}</h2><p className="mt-1 text-sm text-gray-500">{community.cityId}, {community.country} · owner {community.ownerId}</p></div>
                        <span className="h-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">{community.moderationStatus}</span>
                    </div>
                    {community.description ? <p className="mt-4 whitespace-pre-line text-sm leading-6 text-gray-700">{community.description}</p> : null}
                    <p className="mt-3 text-sm text-gray-600">Interests: {community.interests.join(", ") || "None provided"}</p>
                    <p className="mt-1 text-sm text-gray-600">Membership policy: {community.membershipPolicy} · current members: {community.memberCount}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        {community.moderationStatus === "pending" ? <><button disabled={busyId === community.id} onClick={() => void runAction(community.id, "approve")} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50">Approve & publish</button>
                        <input aria-label={`Rejection reason for ${community.name}`} value={reasons[community.id] ?? ""} onChange={(event) => setReasons((current) => ({ ...current, [community.id]: event.target.value }))} placeholder="Rejection reason" className="min-w-56 flex-1 rounded-lg border px-3 py-2 text-sm" />
                        <button disabled={busyId === community.id} onClick={() => void runAction(community.id, "reject")} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 disabled:opacity-50">Reject</button></> : null}
                        {community.moderationStatus === "approved" && community.status === "active" ? <><button disabled={busyId === community.id} onClick={() => void runAction(community.id, "suspend")} className="rounded-lg border px-4 py-2 text-sm disabled:opacity-50">Suspend</button><button disabled={busyId === community.id} onClick={() => void runAction(community.id, "block")} className="rounded-lg border px-4 py-2 text-sm text-red-700 disabled:opacity-50">Block</button></> : null}
                        {community.moderationStatus === "approved" && community.status === "suspended" ? <button disabled={busyId === community.id} onClick={() => void runAction(community.id, "restore")} className="rounded-lg border px-4 py-2 text-sm disabled:opacity-50">Restore</button> : null}
                    </div>
                </article>
            ))}
        </main>
    );
}
