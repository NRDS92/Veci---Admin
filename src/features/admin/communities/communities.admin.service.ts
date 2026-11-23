import { OwnerCommunitySchema, type OwnerCommunity } from "@ndrs92/contracts";
import api from "../../../lib/api";

export const getCommunitiesForModeration = async (): Promise<OwnerCommunity[]> => {
    const response = await api.get("/admin/communities");
    return response.data.data.map((item: unknown) => OwnerCommunitySchema.parse(item));
};

export const approveCommunity = async (id: string): Promise<OwnerCommunity> => {
    const response = await api.post(`/admin/communities/${encodeURIComponent(id)}/approve`);
    return OwnerCommunitySchema.parse(response.data.data);
};

export const rejectCommunity = async (id: string, reason: string): Promise<OwnerCommunity> => {
    const response = await api.post(`/admin/communities/${encodeURIComponent(id)}/reject`, { reason });
    return OwnerCommunitySchema.parse(response.data.data);
};

export const suspendCommunity = async (id: string): Promise<OwnerCommunity> => {
    const response = await api.post(`/admin/communities/${encodeURIComponent(id)}/suspend`);
    return OwnerCommunitySchema.parse(response.data.data);
};

export const blockCommunity = async (id: string): Promise<OwnerCommunity> => {
    const response = await api.post(`/admin/communities/${encodeURIComponent(id)}/block`);
    return OwnerCommunitySchema.parse(response.data.data);
};

export const restoreCommunity = async (id: string): Promise<OwnerCommunity> => {
    const response = await api.post(`/admin/communities/${encodeURIComponent(id)}/restore`);
    return OwnerCommunitySchema.parse(response.data.data);
};
