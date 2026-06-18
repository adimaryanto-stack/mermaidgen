# 🚀 Vercel Deployment Guide

## Quick Deploy

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"New Project"**
4. Select `adimaryanto-stack/mermaidgen` repository
5. Framework Preset: **Next.js** (will auto-detect)
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Click **Deploy**

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel --prod
```

### Option 3: Deploy via GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel automatically configures based on `vercel.json`
5. Click **Deploy**

---

## Configuration Files

| File | Purpose |
|------|---------|
| `vercel.json` | Build and output configuration |
| `.npmrc` | NPM optimization for Vercel builds |
| `vite.config.ts` | Build optimization with code splitting |
| `package.json` | Scripts and dependencies |

---

## Build Process

```bash
# Local build test (same as Vercel)
npm install
npm run build

# Output in dist/ folder ready for production
```

---

## Environment Variables (if needed)

In Vercel Dashboard:
1. Go to Project Settings
2. Click **Environment Variables**
3. Add any needed variables (currently none required)

---

## Troubleshooting

### Build fails with "module not found"
- Check `.npmrc` has `legacy-peer-deps=true`
- Ensure all dependencies are in `package.json`

### Diagram not rendering
- Check browser console for errors
- Verify Mermaid syntax is correct
- Clear browser cache

### Size too large
- Vite automatically optimizes with:
  - Code splitting (React, Mermaid separate chunks)
  - Minification with Terser
  - Tree-shaking unused code

---

## Performance Tips

✅ **Already configured:**
- Code splitting enabled
- Minification enabled
- Sourcemaps disabled for production
- Terser optimization

---

## After Deployment

Your app will be available at:
```
https://<your-project-name>.vercel.app
```

---

**Need help?** Visit [vercel.com/docs](https://vercel.com/docs)
