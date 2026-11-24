# Admin development workflow

Use Node.js 26 LTS and npm. The Admin build, typecheck, and complete lint passed locally on Node 26.13.1; confirm the actual deployment runtime setting before production release. Follow `.nvmrc` with `nvm use` or `fnm use` where available, otherwise install Node 26 and put it first on `PATH`. Create focused feature/fix branches from current `main`, preserve unrelated local work, and install with `npm ci`.

Before opening a PR, run:

```sh
npm ci
npx next typegen
npx tsc --noEmit
npm run lint
npm run build -- --webpack
```

The GitHub workflow runs these checks on PRs to `main` and pushes to `main`, `feat/**`, `feature/**`, `fix/**`, and `codex/**`. This repository currently has no configured automated test suite. Community moderation is at `/admin/moderation/communities` and must be smoke-tested against an isolated staging Backend with an authorized test admin. Verify `NEXT_PUBLIC_API_URL` points to that staging Backend before testing any moderation action.

The cross-repository staging and release checklist is maintained in the [VECI development workflow](https://github.com/NRDS92/VECI---Latin-Community-Hub-/blob/main/DEVELOPMENT_WORKFLOW.md). Production release requires separate explicit approval; deployment and branch-protection settings must be verified in their provider consoles.
