# Admin release process

.github/workflows/ci.yml runs on configured branch pushes and PRs to main. It installs with npm ci, generates Next types, runs TypeScript and ESLint, and builds Next with Webpack. CI contains no deployment step.

1. Branch from current origin/main with a scoped diff.
2. Run type generation, typecheck, lint and Webpack build.
3. Require PR review and passing CI.
4. Verify the Admin preview/staging commit, API base and role behavior.
5. Obtain explicit approval before production promotion.
6. Verify the deployed commit and authenticated admin access.
7. Keep provider rollback instructions and confirm API compatibility.

Provider settings and deployed commit are not proven by this repository. Admin and Landing deployments are separate. Backend remains responsible for authorization regardless of client route guards.
