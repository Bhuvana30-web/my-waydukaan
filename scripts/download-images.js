const fs = require('fs');
const path = require('path');
const https = require('https');
const { subcategoryItems } = require('../src/data/subcategoryItems');

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const writeStream = fs.createWriteStream(filepath);
        response.pipe(writeStream);
        writeStream.on('finish', () => {
          writeStream.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
};

const createDirectoryIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const processImages = async () => {
  const baseDir = path.join(__dirname, '../public/images');
  createDirectoryIfNotExists(baseDir);

  // Create category directories
  const categories = Object.keys(subcategoryItems);
  for (const category of categories) {
    const categoryDir = path.join(baseDir, category);
    createDirectoryIfNotExists(categoryDir);
  }

  // Download images for each item
  for (const [category, data] of Object.entries(subcategoryItems)) {
    console.log(`Processing ${category}...`);
    for (const item of data.items) {
      if (item.image && item.image.startsWith('http')) {
        const filename = `${item.id}.jpg`;
        const filepath = path.join(baseDir, category, filename);
        
        try {
          await downloadImage(item.image, filepath);
          console.log(`Downloaded: ${filename}`);
          
          // Update the image path in the dataset
          item.image = `/images/${category}/${filename}`;
        } catch (error) {
          console.error(`Error downloading ${item.image}:`, error.message);
        }
      }
    }
  }

  // Save updated dataset
  const updatedDataset = `export const subcategoryItems = ${JSON.stringify(subcategoryItems, null, 2)};`;
  fs.writeFileSync(path.join(__dirname, '../src/data/subcategoryItems.js'), updatedDataset);
  console.log('Dataset updated with local image paths');
};

processImages().catch(console.error); 