const fs = require('fs');
const path = require('path');
const https = require('https');

const images = {
  'hero-bg.jpg': 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop',
  'kerala-bg.jpg': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop',
  'cta-bg.jpg': 'https://images.unsplash.com/photo-1530103862676-de8892ebe6bd?q=80&w=2000&auto=format&fit=crop',
  'service-1.jpg': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',
  'service-2.jpg': 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop',
  'service-3.jpg': 'https://images.unsplash.com/photo-1470229722913-7c092db62220?q=80&w=800&auto=format&fit=crop',
  'service-4.jpg': 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=800&auto=format&fit=crop',
  'service-5.jpg': 'https://images.unsplash.com/photo-1514315609403-6f917dfa732d?q=80&w=800&auto=format&fit=crop',
  'gallery-1.jpg': 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
  'gallery-2.jpg': 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop',
  'gallery-3.jpg': 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000&auto=format&fit=crop',
  'gallery-4.jpg': 'https://images.unsplash.com/photo-1505236858219-8359eb29e325?q=80&w=1000&auto=format&fit=crop',
  'gallery-5.jpg': 'https://images.unsplash.com/photo-1583939000240-69649751e360?q=80&w=1000&auto=format&fit=crop',
  'gallery-6.jpg': 'https://images.unsplash.com/photo-1530103862676-de8892ebe6bd?q=80&w=1000&auto=format&fit=crop',
};

const imgDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

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
  for (const [filename, url] of Object.entries(images)) {
    console.log(`Downloading ${filename}...`);
    try {
      await download(url, filename);
    } catch (e) {
      console.error(`Failed to download ${filename}:`, e);
    }
  }
  console.log('Done!');
}

main();
