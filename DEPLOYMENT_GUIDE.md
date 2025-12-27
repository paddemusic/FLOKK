# Deployment Guide - FLOKK Portfolio

**Date:** 2025-12-27
**Performance Optimizations:** ✅ Complete
**Build Status:** ✅ Passing
**Ready for Deployment:** ✅ Yes

---

## 📋 Pre-Deployment Checklist

### **1. Code Quality** ✅
- [x] All performance optimizations implemented
- [x] Build passes successfully (`npm run build`)
- [x] TypeScript compilation clean
- [x] ESLint warnings reviewed (non-critical)
- [x] No console errors in production build

### **2. Performance Optimizations** ✅
- [x] Scroll listeners throttled with RAF
- [x] React.memo added to high-traffic components
- [x] Code splitting implemented for 3D components
- [x] Images optimized with Next.js Image component
- [x] Global hooks moved to specific pages
- [x] Animation overhead reduced

### **3. Testing Requirements** ⚠️
Before deploying to production, complete these tests:

- [ ] **Desktop Testing**
  - [ ] Chrome (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)
  - [ ] Edge (latest)

- [ ] **Mobile Testing**
  - [ ] iOS Safari
  - [ ] Chrome Android
  - [ ] Test on 3G/4G connection

- [ ] **Functionality Testing**
  - [ ] Home page loads correctly
  - [ ] Scroll effects work smoothly (60 FPS)
  - [ ] Portfolio filtering works
  - [ ] Role selection works
  - [ ] 3D models load without errors
  - [ ] Spline components render
  - [ ] All internal links work
  - [ ] Contact form functions
  - [ ] Images load with proper optimization

- [ ] **Performance Testing**
  - [ ] Run Lighthouse audit (target: 90+ performance)
  - [ ] Check Core Web Vitals
  - [ ] Verify bundle sizes in production
  - [ ] Test on slow 3G connection

### **4. Environment Variables**
Ensure these are set in your deployment environment:

```bash
# Required for Spline playground (if enabled)
NEXT_PUBLIC_ENABLE_SPLINE_PLAYGROUND=true  # or false

# Next.js telemetry (optional, can disable)
NEXT_TELEMETRY_DISABLED=1  # optional
```

### **5. Build Configuration**
Verify `next.config.mjs` settings:
- [x] Image remote patterns configured
- [x] CSP headers for iframes (Spline, YouTube, Dropbox)
- [x] Turbopack rules (element-tagger conditional)

---

## 🚀 Deployment Steps

### **Option 1: Vercel (Recommended)**

**Step 1: Connect Repository**
```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

**Step 2: Configure Project**
- Framework: Next.js
- Build Command: `npm run build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm install` (default)

**Step 3: Set Environment Variables**
In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add any required variables
3. Redeploy if needed

**Step 4: Deploy to Production**
```bash
vercel --prod
```

---

### **Option 2: Manual Deployment**

**Step 1: Build for Production**
```bash
npm run build
```

**Step 2: Test Production Build Locally**
```bash
npm start
```
Visit `http://localhost:3000` to verify

**Step 3: Deploy Build Output**
Upload the following to your hosting:
- `.next/` folder
- `public/` folder
- `node_modules/` (or run `npm install` on server)
- `package.json` and `package-lock.json`
- `next.config.mjs`

**Step 4: Start Production Server**
```bash
NODE_ENV=production npm start
```

---

## 📊 Post-Deployment Validation

### **1. Lighthouse Audit**

**Run on deployed URL:**
```bash
lighthouse https://your-domain.com --view
```

**Target Scores:**
- Performance: ≥90
- Accessibility: ≥90
- Best Practices: ≥90
- SEO: ≥90

**Critical Metrics:**
- First Contentful Paint (FCP): <1.8s
- Largest Contentful Paint (LCP): <2.5s
- Total Blocking Time (TBT): <200ms
- Cumulative Layout Shift (CLS): <0.1
- Speed Index: <3.4s

---

### **2. Core Web Vitals Monitoring**

**Enable Real User Monitoring:**

Add to `_app.tsx` (already using Next.js Analytics):
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

**Monitor:**
- LCP (Largest Contentful Paint): Good <2.5s
- FID (First Input Delay): Good <100ms
- CLS (Cumulative Layout Shift): Good <0.1

---

### **3. Bundle Size Analysis**

**Analyze bundle after deployment:**
```bash
npm run build

# Check output
# ✓ Generating static pages (7/7)
# Route (pages)                    Size     First Load JS
# ┌ ○ /                          251 kB    394 kB
```

**Expected Results:**
- Main bundle: ~800 KB (down from 1.5 MB)
- Per-page bundles: <300 KB
- Shared chunks: ~150 KB

---

### **4. Image Optimization Verification**

**Check that Next.js is serving optimized images:**

1. Open DevTools → Network tab
2. Filter by "Img"
3. Verify images are:
   - Served as WebP (when browser supports)
   - Properly sized (not full resolution)
   - Lazy loaded (below fold)

**Expected:**
- Portfolio images: ~50-100 KB each (down from 2-4 MB)
- Hero images: ~200-300 KB (down from full size)
- Format: WebP with JPEG fallback

---

## 🔧 Troubleshooting

### **Build Fails**

**Issue:** `next: not found`
```bash
# Solution: Install dependencies
npm install
```

**Issue:** TypeScript errors
```bash
# Solution: Check types
npx tsc --noEmit
```

**Issue:** Out of memory during build
```bash
# Solution: Increase Node memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

---

### **Images Not Loading**

**Issue:** 404 on optimized images
- Check `next.config.mjs` image patterns
- Verify images exist in `/public`
- Check file permissions

**Issue:** Images too large
- Run image optimization script (see IMAGE_OPTIMIZATION.md)
- Verify Next.js Image component usage

---

### **3D Models Not Rendering**

**Issue:** Spline/Three.js errors
- Check CSP headers in `next.config.mjs`
- Verify model files exist in `/public/models`
- Check browser console for WebGL errors

**Solution:** Add CSP headers:
```javascript
headers: [
  {
    key: 'Content-Security-Policy',
    value: "frame-src 'self' https://my.spline.design; script-src 'self' 'unsafe-eval';"
  }
]
```

---

### **Slow Performance**

**Issue:** FPS drops during scroll
- Verify RAF throttling is active (check browser profiler)
- Check for console errors blocking main thread
- Disable browser extensions for testing

**Issue:** Large bundle size
- Run `npm run build` and check output
- Verify code splitting worked (check route sizes)
- Consider removing unused dependencies

---

## 🎯 Performance Targets

### **Desktop (Desktop Lighthouse)**
| Metric | Target | Acceptable | Critical |
|--------|--------|------------|----------|
| Performance Score | 95+ | 90+ | <85 |
| FCP | <1.2s | <1.8s | >2.5s |
| LCP | <1.8s | <2.5s | >4.0s |
| TBT | <100ms | <200ms | >600ms |
| CLS | <0.05 | <0.1 | >0.25 |
| Speed Index | <2.5s | <3.4s | >5.8s |

### **Mobile (Mobile Lighthouse)**
| Metric | Target | Acceptable | Critical |
|--------|--------|------------|----------|
| Performance Score | 85+ | 75+ | <70 |
| FCP | <1.8s | <2.5s | >3.5s |
| LCP | <2.5s | <3.5s | >5.0s |
| TBT | <200ms | <300ms | >800ms |
| CLS | <0.05 | <0.1 | >0.25 |

### **Bundle Sizes**
| Route | Current | Target | Max |
|-------|---------|--------|-----|
| Home (/) | 394 KB | <400 KB | 500 KB |
| Other pages | 143-145 KB | <150 KB | 200 KB |
| Shared bundle | 158 KB | <160 KB | 200 KB |

---

## 📈 Monitoring & Alerts

### **Setup Monitoring**

**1. Vercel Analytics (Recommended)**
- Automatic with Vercel deployment
- Real user metrics
- Core Web Vitals tracking

**2. Google Analytics 4**
- User behavior tracking
- Conversion tracking
- Custom events

**3. Sentry (Error Tracking)**
```bash
npm install @sentry/nextjs
```

**4. LogRocket (Session Replay)**
- Debug production issues
- Performance insights
- User session replay

---

### **Set Up Alerts**

**Performance Degradation:**
- Alert if LCP > 3.0s for >10% of users
- Alert if CLS > 0.15 for >5% of users
- Alert if bundle size increases >20%

**Error Tracking:**
- Alert on any production errors
- Alert on >1% error rate
- Alert on build failures

---

## 🔐 Security Checklist

- [x] CSP headers configured
- [x] No secrets in environment variables (client-side)
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] No exposed API keys
- [ ] Rate limiting on API routes (if applicable)

---

## 📝 Deployment Log Template

Use this template for each deployment:

```markdown
## Deployment - [Date]

**Version:** [Git commit hash]
**Deployed by:** [Name]
**Environment:** Production

### Changes:
- Performance optimizations implemented
- Code splitting for 3D components
- Image optimization with Next.js

### Pre-Deployment:
- [x] Build passed
- [x] Lighthouse score: 92 (Desktop), 78 (Mobile)
- [x] Manual testing completed
- [x] No console errors

### Post-Deployment:
- [x] Verified production build
- [x] Lighthouse score: 94 (Desktop), 82 (Mobile)
- [x] Core Web Vitals: Good
- [ ] Monitoring alerts configured

### Issues:
- None

### Rollback Plan:
- Previous deployment: [commit hash]
- Rollback command: `vercel rollback [deployment-url]`
```

---

## 🎉 Success Criteria

**Deployment is successful when:**
1. ✅ Build completes without errors
2. ✅ All pages load correctly
3. ✅ Lighthouse Performance ≥90 (Desktop)
4. ✅ Lighthouse Performance ≥75 (Mobile)
5. ✅ Core Web Vitals in "Good" range
6. ✅ No console errors in production
7. ✅ All functionality works as expected
8. ✅ Images load optimized
9. ✅ Scroll performance smooth (60 FPS)
10. ✅ 3D components render without errors

---

## 📞 Support

**Issues during deployment?**
- Check build logs: `npm run build --verbose`
- Check runtime logs: Vercel dashboard → Deployments → [deployment] → Logs
- Review error stack traces in browser console

**Performance issues after deployment?**
- Run Lighthouse audit and compare to targets
- Check network tab for large resources
- Review bundle analysis
- Check Core Web Vitals in Vercel Analytics

---

## 🔄 Next Steps After Deployment

1. **Week 1:**
   - Monitor Core Web Vitals daily
   - Review error logs
   - Collect user feedback

2. **Week 2:**
   - Analyze performance trends
   - Optimize based on real-world data
   - Convert remaining images to WebP (see IMAGE_OPTIMIZATION.md)

3. **Monthly:**
   - Review bundle sizes
   - Update dependencies
   - Re-run Lighthouse audits
   - Check for new performance opportunities

---

**Last Updated:** 2025-12-27
**Maintained By:** Performance Optimization Team
**Next Review:** 2025-01-27

---

## Quick Links

- [Performance Analysis](./PERFORMANCE_ANALYSIS.md)
- [Performance Improvements](./PERFORMANCE_IMPROVEMENTS.md)
- [Image Optimization Guide](./IMAGE_OPTIMIZATION.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
