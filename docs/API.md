# Admin API integration

Canonical routes and access rules are in the [Backend API reference](https://github.com/NRDS92/VECI---Latin-Community-Hub-/blob/main/docs/API.md). Backend mounts the Admin router at /api/v1/admin and applies authentication followed by requireAdmin.

| Admin client | Backend resource |
| --- | --- |
| src/features/admin/dashboard/services/dashboard.service.ts | GET /admin/dashboard |
| src/features/admin/events/services/events.admin.service.ts | GET /admin/events, GET /admin/events/pending, PATCH approve/reject |
| src/features/admin/business/services/business.admin.service.ts | GET /admin/businesses, GET pending, PATCH approve/reject |
| src/features/admin/communities/communities.admin.service.ts | GET /admin/communities; POST approve/reject/suspend/block/restore; report/content moderation |
| src/features/admin/users modules | GET list/detail, PATCH role, DELETE user |
| src/features/auth/api/auth.api.ts | POST /auth/login, GET /auth/me |

All paths are prefixed by /api/v1. NEXT_PUBLIC_API_URL is the API base. Axios attaches a Bearer token. Community service parses OwnerCommunitySchema from @ndrs92/contracts. Event and Business response types are local, so Admin does not use shared contracts for every resource.
