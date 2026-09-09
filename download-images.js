const fs = require('fs');
const path = require('path');
const https = require('https');

const imagesToFix = {
  'service-3.jpg': 'https://picsum.photos/seed/media/800/600',
  'service-5.jpg': 'https://picsum.photos/seed/transport/800/600',
  'cta-bg.jpg': 'https://picsum.photos/seed/cta/2000/1000',
  'gallery-4.jpg': 'https://picsum.photos/seed/events/1000/1500',
  'gallery-5.jpg': 'https://picsum.photos/seed/weddings/1000/1000',
  'gallery-6.jpg': 'https://picsum.photos/seed/celebrations/2000/1000',
};

const imgDir = path.join(__dirname, 'public', 'images');

function download(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, filename).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(path.join(imgDir, filename));
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {});
      reject(err);
    });
  });
}

async function main() {
  for (const [filename, url] of Object.entries(imagesToFix)) {
    console.log(`Fixing ${filename}...`);
    try {
      await download(url, filename);
    } catch (e) {
      console.error(`Failed to download ${filename}:`, e);
    }
  }
  console.log('Done!');
}

main();
