#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = './public';
const OUTPUT_DIR = './public-optimized';
const QUALITY = 85;

// Statistics
let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let filesProcessed = 0;
let filesSkipped = 0;
let errors = 0;

async function optimizeImage(inputPath, outputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();

    // Skip non-image files
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
      filesSkipped++;
      return;
    }

    // Get original size
    const originalSize = fs.statSync(inputPath).size;

    // Convert to WebP
    const outputWebP = outputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const outputDir = path.dirname(outputWebP);

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputWebP);

    const optimizedSize = fs.statSync(outputWebP).size;
    const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

    totalOriginalSize += originalSize;
    totalOptimizedSize += optimizedSize;
    filesProcessed++;

    const originalMB = (originalSize / 1024 / 1024).toFixed(2);
    const optimizedMB = (optimizedSize / 1024 / 1024).toFixed(2);

    console.log(`✓ ${path.basename(inputPath)}`);
    console.log(`  ${originalMB} MB → ${optimizedMB} MB (${savings}% smaller)`);

  } catch (error) {
    errors++;
    console.error(`✗ Failed to optimize ${inputPath}:`, error.message);
  }
}

async function processDirectory(dir, baseDir = INPUT_DIR) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules and .next
      if (file === 'node_modules' || file === '.next' || file === '.git') {
        continue;
      }
      await processDirectory(fullPath, baseDir);
    } else {
      const relativePath = path.relative(baseDir, fullPath);
      const outputPath = path.join(OUTPUT_DIR, relativePath);

      await optimizeImage(fullPath, outputPath);
    }
  }
}

async function copyNonImageFiles(dir, baseDir = INPUT_DIR) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (file === 'node_modules' || file === '.next' || file === '.git') {
        continue;
      }
      await copyNonImageFiles(fullPath, baseDir);
    } else {
      const ext = path.extname(fullPath).toLowerCase();

      // Copy non-image files as-is
      if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
        const relativePath = path.relative(baseDir, fullPath);
        const outputPath = path.join(OUTPUT_DIR, relativePath);
        const outputDir = path.dirname(outputPath);

        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.copyFileSync(fullPath, outputPath);
      }
    }
  }
}

async function main() {
  console.log('🖼️  FLOKK Image Optimization\n');
  console.log('Starting image optimization...\n');
  console.log(`Input:  ${INPUT_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Quality: ${QUALITY}%\n`);

  const startTime = Date.now();

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Process all images
  await processDirectory(INPUT_DIR);

  // Copy non-image files
  console.log('\nCopying non-image files...');
  await copyNonImageFiles(INPUT_DIR);

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(1);

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Files processed: ${filesProcessed}`);
  console.log(`Files skipped:   ${filesSkipped}`);
  console.log(`Errors:          ${errors}`);
  console.log(`Time:            ${duration}s`);
  console.log('');
  console.log(`Original size:   ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized size:  ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Savings:         ${(totalOriginalSize - totalOptimizedSize) / 1024 / 1024} MB (${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}%)`);
  console.log('='.repeat(60));
  console.log('\n✅ Optimization complete!');
  console.log(`\nReview images in ${OUTPUT_DIR}/`);
  console.log('If satisfied, run: npm run apply-optimized-images');
}

main().catch(console.error);
