# Veci Admin

Veci Admin is the internal web client for moderation and administration of the Veci platform. It is maintained separately from the [Backend/Mobile monorepo](https://github.com/NRDS92/VECI---Latin-Community-Hub-) and [public Landing](https://github.com/NRDS92/Veci-web-app).

## Implemented areas

- Admin login and authenticated session lookup.
- Protected dashboard with aggregate analytics.
- Event moderation: list/pending views and approve/reject actions.
- Business moderation: list/pending views and approve/reject actions.
- Community moderation: list and approve/reject/suspend/block/restore actions; report and content moderation calls.
- User management: list/detail, role changes and deletion.
- Shared layout/sidebar, status components, loading/empty states and confirmation/dialog UI.

Pages live in src/app/admin. The protected route group is wrapped with AuthProvider, AuthGuard and AdminLayout. The client stores the auth token in browser localStorage and Axios adds it as a Bearer token. Backend remains the authority for admin authorization.

## API and data handling

The Axios client in src/lib/api.ts uses NEXT_PUBLIC_API_URL and attaches the stored token. Domain API modules are under src/features/admin. Community moderation parses Community values with OwnerCommunitySchema from @ndrs92/contracts; Event and Business clients currently use local Admin types.

## Technology

Manifest declarations: Node.js 26.x, Next.js 16.3.0, React/React DOM 19.2.8, TypeScript ^5, ESLint ^9, Tailwind CSS ^4, Axios ^1.19.0, and @ndrs92/contracts 0.5.0. Landing and Backend currently declare Contracts 0.6.0; this version difference is a compatibility consideration. Do not upgrade dependencies as part of a documentation-only change.

## Development and checks

~~~sh
npm ci
npm run dev
npx next typegen
npx tsc --noEmit
npm run lint
npm run build -- --webpack
~~~

The package manifest has no test script or dedicated test suite. CI runs type generation, TypeScript, full ESLint and a Webpack production build. See [Development](docs/DEVELOPMENT.md).

## Deployment boundary

The repository has a GitHub Actions CI workflow. CI is not a deployment. Provider settings, deployed commit and production promotion policy are not established by this repository alone. See [Release](docs/RELEASE.md).

## Documentation

- [API integration](docs/API.md)
- [Development](docs/DEVELOPMENT.md)
- [Release](docs/RELEASE.md)
