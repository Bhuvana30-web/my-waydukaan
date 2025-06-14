const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../waydukaan logo.png');
const outputDir = path.join(__dirname, '../public');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate favicon.ico (we'll use 32x32 for simplicity)
sharp(inputFile)
  .resize(32, 32)
  .toFile(path.join(outputDir, 'favicon.ico'))
  .catch(console.error);

// Generate 192x192 icon
sharp(inputFile)
  .resize(192, 192)
  .toFile(path.join(outputDir, 'waydukaan-logo192.png'))
  .catch(console.error);

// Generate 512x512 icon
sharp(inputFile)
  .resize(512, 512)
  .toFile(path.join(outputDir, 'waydukaan-logo512.png'))
  .catch(console.error);

console.log('Icons generated successfully!'); 