Fardin Portfolio Workspace

This repository contains the Vite app in the `fardin/` folder, with a small root wrapper so Vercel can build it from the repo root.

## Run locally

```bash
cd /Users/alif/Downloads/Fardin
npm install
npm run dev
```

## Build / Preview

```bash
npm run build
npm run preview
```

## Vercel

- Root build command: `npm run build`
- Output directory: `fardin/dist`
- The actual app lives in `fardin/`

## Notes

- `package.json` at the repo root proxies scripts to the Vite workspace.
- `vercel.json` forces Vercel to use the correct build command.
- The app source stays in `fardin/src/`.
