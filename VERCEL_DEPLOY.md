# Deploying the frontend to Vercel via GitHub Actions

I added a GitHub Actions workflow that builds the `frontend` folder and deploys it to Vercel on every push to `main` that touches `frontend/**`.

Required repository secrets (set these in GitHub → Settings → Secrets → Actions):

- `VERCEL_TOKEN` (required): create a personal token at https://vercel.com/account/tokens and paste it here.
- `VERCEL_ORG_ID` (optional): the Vercel organization id if you want to target an existing project.
- `VERCEL_PROJECT_ID` (optional): the Vercel project id if you want to target an existing project.
- `VITE_API_BASE` (optional): the backend URL (for example `https://your-backend.onrender.com`) that the frontend should call. The workflow passes this as a build env var.

How it works

1. Push to `main` on GitHub (or open a PR merged to `main`) with changes under `frontend/`.
2. The workflow `.github/workflows/deploy-to-vercel.yml` installs dependencies, builds the Vite app, and runs the Vercel CLI (`npx vercel`) to deploy to your Vercel account using `VERCEL_TOKEN`.
3. The deploy is performed from the `frontend` directory. If a Vercel project already exists and `VERCEL_PROJECT_ID` is provided, the action will attach/deploy to that project.

Add secrets example (local commands to show how to create a secret is not possible from CLI - use GitHub UI):

1. Go to your repo on GitHub → Settings → Secrets and variables → Actions → New repository secret.
2. Add `VERCEL_TOKEN` with the token you generated on Vercel.
3. (Optional) Add `VITE_API_BASE` with your backend URL.

After adding the secrets, push a commit that touches `frontend/` and check the Actions tab for the deploy logs.

Triggering Render deploys from GitHub Actions (backend)

I also added `.github/workflows/deploy-backend-render.yml` which triggers a Render redeploy whenever files under `backend/` change on `main`.

Before this workflow can run successfully you must add two repository secrets in GitHub (Settings → Secrets → Actions):

- `RENDER_API_KEY` — your Render API key. Create one at https://dashboard.render.com/account/api-keys (copy the key).
- `RENDER_SERVICE_ID` — the service id of your backend service on Render. You can find the service id in the Render dashboard URL or in the service settings (it looks like `srv-xxxxxxxxxxxx`).

When both secrets are set, pushing changes to `backend/` will trigger the workflow which calls the Render API to start a deploy for the configured service.

