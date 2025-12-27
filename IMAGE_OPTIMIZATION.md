# Image Optimization Guide

**Current State:** 141 MB in `/public` directory
**Target State:** 15-20 MB after optimization
**Expected Reduction:** ~86% file size reduction

---

## 📊 Current Image Analysis

### **Largest Images (Top 10):**
```
4.8 MB - Broslo_story_ep1.png
3.7 MB - Screenshot_2024-09-27_at_18.10.39.png
3.1 MB - Artboard_176.png
2.9 MB - Artboard_9.png
2.9 MB - Artboard_40.png
2.5 MB - Screen_Shot_2017-10-11_at_4.16.35_PM.png
2.5 MB - Cover_01.png
2.1 MB - Screenshot_2024-09-27_at_18.25.44.png
2.0 MB - Youtube_thumbnail_podcast_01_v2.png
1.8 MB - Artboard_3.png
```

**Total:** ~26.3 MB in just the top 10 images

---

## 🎯 Optimization Strategy

### **Phase 1: Automated Conversion (Quick Wins)**
Convert all PNG/JPG to WebP with quality optimization

### **Phase 2: Manual Review**
Review and optimize specific images that need special attention

### **Phase 3: Responsive Images**
Create multiple sizes for responsive loading

---

## 🛠️ Tools Required

### **Option 1: Command Line (Sharp - Recommended)**

**Install Sharp CLI:**
```bash
npm install -g sharp-cli
```

**Install ImageMagick (Alternative):**
```bash
# macOS
brew install imagemagick

# Ubuntu/Debian
sudo apt-get install imagemagick

# Windows
choco install imagemagick
```

### **Option 2: Online Tools**
- [Squoosh](https://squoosh.app/) - Google's image optimizer
- [TinyPNG](https://tinypng.com/) - PNG/JPG compression
- [CloudConvert](https://cloudconvert.com/) - Batch conversion

### **Option 3: GUI Tools**
- **macOS:** ImageOptim
- **Windows:** FileOptimizer
- **Cross-platform:** GIMP, Photoshop

---

## 🚀 Quick Start: Automated Conversion

### **Method 1: Using Sharp (Node.js)**

**Create optimization script:**

```javascript
// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = './public';
const OUTPUT_DIR = './public-optimized';
const QUALITY = 85;

async function optimizeImage(inputPath, outputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();

    if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
      console.log(`Skipping ${inputPath} - unsupported format`);
      return;
    }

    const outputWebP = outputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputWebP);

    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputWebP).size;
    const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

    console.log(`✓ ${path.basename(inputPath)}`);
    console.log(`  ${(originalSize / 1024 / 1024).toFixed(2)} MB → ${(optimizedSize / 1024 / 1024).toFixed(2)} MB (${savings}% smaller)`);

  } catch (error) {
    console.error(`✗ Failed to optimize ${inputPath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const relativePath = path.relative(INPUT_DIR, fullPath);
      const outputPath = path.join(OUTPUT_DIR, relativePath);
      const outputDir = path.dirname(outputPath);

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      await optimizeImage(fullPath, outputPath);
    }
  }
}

console.log('Starting image optimization...\n');
processDirectory(INPUT_DIR).then(() => {
  console.log('\n✓ Optimization complete!');
  console.log('Review images in ./public-optimized/');
  console.log('If satisfied, replace ./public/ with ./public-optimized/');
});
```

**Run the script:**
```bash
# Install Sharp
npm install sharp

# Run optimization
node scripts/optimize-images.js
```

---

### **Method 2: Using ImageMagick (Bash)**

**Create conversion script:**

```bash
#!/bin/bash
# scripts/convert-to-webp.sh

INPUT_DIR="./public"
OUTPUT_DIR="./public-optimized"
QUALITY=85

echo "Converting images to WebP..."

mkdir -p "$OUTPUT_DIR"

find "$INPUT_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | while read file; do
  relative_path="${file#$INPUT_DIR/}"
  output_file="$OUTPUT_DIR/${relative_path%.*}.webp"
  output_dir=$(dirname "$output_file")

  mkdir -p "$output_dir"

  echo "Converting $file..."
  magick "$file" -quality $QUALITY "$output_file"

  original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
  new_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file" 2>/dev/null)

  original_mb=$(echo "scale=2; $original_size/1024/1024" | bc)
  new_mb=$(echo "scale=2; $new_size/1024/1024" | bc)
  savings=$(echo "scale=1; (1-$new_size/$original_size)*100" | bc)

  echo "  $original_mb MB → $new_mb MB ($savings% smaller)"
done

echo "✓ Conversion complete!"
echo "Review images in $OUTPUT_DIR"
```

**Run the script:**
```bash
chmod +x scripts/convert-to-webp.sh
./scripts/convert-to-webp.sh
```

---

## 📐 Responsive Image Sizes

### **Create Multiple Sizes for Responsive Loading**

```javascript
// scripts/create-responsive-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SIZES = [
  { width: 640, suffix: '-sm' },   // Mobile
  { width: 768, suffix: '-md' },   // Tablet
  { width: 1024, suffix: '-lg' },  // Desktop
  { width: 1920, suffix: '-xl' },  // Large desktop
];

async function createResponsiveImages(inputPath) {
  const ext = path.extname(inputPath);
  const basename = path.basename(inputPath, ext);
  const dir = path.dirname(inputPath);

  for (const size of SIZES) {
    const outputPath = path.join(dir, `${basename}${size.suffix}.webp`);

    await sharp(inputPath)
      .resize(size.width, null, { withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(outputPath);

    console.log(`✓ Created ${basename}${size.suffix}.webp`);
  }
}

// Usage:
// createResponsiveImages('./public/hero-image.png');
```

---

## 🎨 Optimization Settings by Image Type

### **Portfolio Images (Project Thumbnails)**
- **Format:** WebP
- **Quality:** 85
- **Max Width:** 800px
- **Expected Size:** 50-100 KB each

```bash
sharp input.png -o output.webp --webp-quality 85 --resize 800
```

### **Hero Images (Large Background)**
- **Format:** WebP
- **Quality:** 80
- **Max Width:** 1920px
- **Expected Size:** 200-300 KB each

```bash
sharp hero.png -o hero.webp --webp-quality 80 --resize 1920
```

### **Screenshots**
- **Format:** WebP
- **Quality:** 85
- **Max Width:** 1200px
- **Expected Size:** 100-200 KB each

```bash
sharp screenshot.png -o screenshot.webp --webp-quality 85 --resize 1200
```

### **Logos & Icons**
- **Format:** PNG (keep transparency) or SVG
- **Quality:** Lossless
- **Size:** Keep small (<50 KB)

---

## 🔄 Migration Steps

### **Step 1: Backup Original Images**
```bash
cp -r public public-backup
```

### **Step 2: Run Optimization**
```bash
node scripts/optimize-images.js
```

### **Step 3: Review Output**
```bash
# Check total size
du -sh public-optimized

# Expected: 15-20 MB (down from 141 MB)
```

### **Step 4: Update Image References**

**Before:**
```typescript
<img src="/Broslo_story_ep1.png" alt="..." />
```

**After:**
```typescript
<Image
  src="/Broslo_story_ep1.webp"
  alt="..."
  width={800}
  height={600}
  quality={85}
/>
```

### **Step 5: Test Locally**
```bash
npm run dev
# Visit http://localhost:3000
# Check all images load correctly
```

### **Step 6: Replace Public Directory**
```bash
rm -rf public
mv public-optimized public
```

### **Step 7: Commit Changes**
```bash
git add public
git commit -m "Optimize images: Convert to WebP, reduce size by 86%"
```

---

## 📊 Expected Results

### **Before Optimization:**
```
public/
├── Broslo_story_ep1.png (4.8 MB)
├── Screenshot_2024-09-27_at_18.10.39.png (3.7 MB)
├── Artboard_176.png (3.1 MB)
└── ... (141 MB total)
```

### **After Optimization:**
```
public/
├── Broslo_story_ep1.webp (480 KB - 90% smaller)
├── Screenshot_2024-09-27_at_18.10.39.webp (370 KB - 90% smaller)
├── Artboard_176.webp (310 KB - 90% smaller)
└── ... (15-20 MB total - 86% smaller)
```

---

## ✅ Verification Checklist

After optimization, verify:

- [ ] Total `/public` size: <20 MB
- [ ] All images converted to WebP
- [ ] Images display correctly in browser
- [ ] WebP fallback works (Next.js handles this)
- [ ] No broken image links
- [ ] Lighthouse score improved
- [ ] LCP metric improved

---

## 🎯 Quality Guidelines

### **Quality Settings:**
- **85:** Portfolio images, screenshots (balanced)
- **80:** Large hero images (more compression)
- **90:** Important branding images (less compression)
- **Lossless:** Logos with transparency

### **When to Use PNG vs WebP:**

**Use PNG when:**
- Transparency required AND WebP not supported
- Logos/icons need pixel-perfect rendering
- File size already small (<50 KB)

**Use WebP when:**
- Photography or complex images
- File size >100 KB
- Modern browsers (all supported now)

**Use SVG when:**
- Vector graphics (logos, icons)
- Need to scale without quality loss
- Simple shapes and text

---

## 🔧 Troubleshooting

### **WebP Not Supported?**
Next.js automatically provides JPEG/PNG fallback for older browsers. No action needed.

### **Images Look Blurry?**
Increase quality setting:
```bash
sharp input.png -o output.webp --webp-quality 90
```

### **File Size Still Large?**
1. Check original dimensions (may be unnecessarily large)
2. Resize before converting
3. Lower quality slightly (80 instead of 85)

### **Conversion Fails?**
- Check Sharp installation: `npm list sharp`
- Try ImageMagick as fallback
- Use online tools for problematic images

---

## 📈 Performance Impact

### **Before Optimization:**
- Total Images: 141 MB
- LCP (Largest Contentful Paint): ~4.5s
- Page Load Time: ~6s

### **After Optimization:**
- Total Images: 15-20 MB (~86% reduction)
- LCP (Largest Contentful Paint): ~2.0s (-56%)
- Page Load Time: ~2.5s (-58%)

---

## 🚀 Advanced Optimization

### **AVIF Format (Future)**
AVIF offers even better compression than WebP:

```javascript
await sharp(inputPath)
  .avif({ quality: 80 })
  .toFile(outputPath);
```

**Note:** Browser support still limited (2024). Use WebP for now.

---

### **Lazy Loading (Already Implemented)**
Portfolio cards already use `loading="lazy"`:
```typescript
<Image
  src={project.thumbnail}
  loading="lazy"  // ✓ Already implemented
/>
```

---

### **Priority Loading for Above-Fold**
For hero images:
```typescript
<Image
  src="/hero.webp"
  priority  // Load immediately
  loading="eager"
/>
```

---

## 📝 Maintenance

### **Monthly Review:**
1. Check for new unoptimized images
2. Run optimization script on new uploads
3. Monitor bundle size trends
4. Review Lighthouse image recommendations

### **Automation:**
Add to CI/CD pipeline:
```yaml
# .github/workflows/optimize-images.yml
name: Optimize Images
on:
  push:
    paths:
      - 'public/**/*.png'
      - 'public/**/*.jpg'

jobs:
  optimize:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install sharp
      - run: node scripts/optimize-images.js
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "Automatically optimize images"
```

---

## 🎉 Success Metrics

**Optimization is successful when:**
1. ✅ Total image size <20 MB
2. ✅ Average image size <200 KB
3. ✅ Portfolio images <100 KB each
4. ✅ WebP format used throughout
5. ✅ No visual quality degradation
6. ✅ LCP improved by >50%
7. ✅ Lighthouse Performance >90

---

## 📞 Support Resources

- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [WebP Documentation](https://developers.google.com/speed/webp)
- [Next.js Image Optimization](https://nextjs.org/docs/pages/building-your-application/optimizing/images)
- [Squoosh App](https://squoosh.app/)

---

**Last Updated:** 2025-12-27
**Next Review:** After first image optimization run
