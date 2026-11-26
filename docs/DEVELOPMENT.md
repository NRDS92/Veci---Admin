# Admin development

## Requirements and commands

Node.js 26.x is declared in .nvmrc and package.json. Run from the repository root:

~~~sh
npm ci
npm run dev
npx next typegen
npx tsc --noEmit
npm run lint
npm run build -- --webpack
~~~

The package manifest has no test script and no dedicated test suite.

## Environment

Source references NEXT_PUBLIC_API_URL as the Axios base URL. No .env.example is present in this baseline. Configure a non-production API and verify the effective URL before moderation actions. Do not document or expose token values.

AuthProvider restores the session through Backend current-user. The token is stored in browser localStorage; Axios adds Bearer authorization. AuthGuard redirects unauthenticated or non-admin users. Backend requireAdmin middleware remains the actual security boundary.

Use an isolated Backend/database for write checks. Client build success is not an external API test.
